const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const PORT = 8000; // HTTP Server Port
const WS_PORT = 8080; // WebSocket Port

// HTTP Server to Serve Static Files
const server = http.createServer((req, res) => {
    const baseDir = path.join(__dirname, 'public'); // Public folder for files
    const filePath = req.url === '/' ? 'login.html' : req.url; // Default to login.html
    const fullPath = path.join(baseDir, filePath);

    // Serve Files or Handle Errors
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.statusCode = err.code === 'ENOENT' ? 404 : 500;
            res.end(`${res.statusCode}: ${err.code === 'ENOENT' ? 'File Not Found' : 'Internal Server Error'}`);
        } else {
            const ext = path.extname(fullPath);
            const contentType = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript'
            }[ext] || 'text/plain';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Start HTTP Server
server.listen(PORT, () => {
    console.log(`HTTP Server running at http://localhost:${PORT}`);
});

// WebSocket Server for Real-Time Communication
const wss = new WebSocket.Server({ port: WS_PORT });
const clients = new Map(); // Store WebSocket clients and their usernames

wss.on('connection', (ws) => {
    let username = null;

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Handle New User or Broadcast Messages
        if (!username && data.username) {
            username = data.username;
            clients.set(ws, username);

            broadcast({
                type: 'enter',
                message: `${username} entered the chat.`,
                time: new Date().toISOString()
            });
        } else if (data.type === 'message') {
            broadcast({
                type: 'message',
                username: data.username,
                message: data.message,
                time: new Date().toISOString()
            });
        }
    });

    ws.on('close', () => {
        if (username) {
            clients.delete(ws);
            broadcast({
                type: 'leave',
                message: `${username} left the chat.`,
                time: new Date().toISOString()
            });
        }
    });
});

// Broadcast Messages to All Connected Clients
function broadcast(message) {
    clients.forEach((_, client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
