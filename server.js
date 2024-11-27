const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const PORT = process.env.PORT || 8000;

// Create the server
const server = http.createServer((req, res) => {
    // Define the base folder for static files
    const baseDir = path.join(__dirname, 'public');
    const filePath = req.url === '/' ? 'login.html' : req.url;
    const fullPath = path.join(baseDir, filePath);

    // Serve the requested file
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            // Handle file not found or other errors
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('404: File Not Found');
            } else {
                res.statusCode = 500;
                res.end('500: Internal Server Error');
            }
        } else {
            // Determine the content type
            const ext = path.extname(fullPath).toLowerCase();
            const contentType = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.ico': 'image/x-icon'
            }[ext] || 'text/plain';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// WebSocket Server

const wss = new WebSocket.Server({ port: 8080 });
let clients = {};

wss.on('connection', (ws) => {
    let currentUsername = null;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (!currentUsername && data.username) {
                currentUsername = data.username;
                clients[ws] = currentUsername;

                // Notify all users that someone has entered
                const enterMessage = {
                    username: currentUsername,
                    message: `${currentUsername} entered the chat.`,
                    time: new Date().toISOString(),
                    type: 'enter'
                };
                broadcastMessage(enterMessage);
            }

            if (data.type === 'message') {
                const messageWithTimestamp = {
                    username: currentUsername,
                    message: data.message,
                    time: new Date().toISOString(),
                    type: 'message'
                };
                broadcastMessage(messageWithTimestamp);
            }

            if (data.type === 'leave') {
                const leaveMessage = {
                    username: currentUsername,
                    message: `${currentUsername} left the chat.`,
                    time: new Date().toISOString(),
                    type: 'leave'
                };
                broadcastMessage(leaveMessage);
                delete clients[ws];
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        if (currentUsername) {
            // Broadcast leave message when a user disconnects
            const leaveMessage = {
                username: currentUsername,
                message: `${currentUsername} left the chat.`,
                time: new Date().toISOString(),
                type: 'leave'
            };
            broadcastMessage(leaveMessage);
            delete clients[ws];
        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
