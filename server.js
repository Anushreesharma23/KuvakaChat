// const http = require('http');
// const fs = require('fs');
// const WebSocket = require('ws');

// const server = http.createServer((req, res) => {
//     fs.readFile('index.html', (err, data) => {
//         if (err) {
//             res.statusCode = 500;
//             res.end(`Error getting the file: ${err}.`);
//         } else {
//             res.statusCode = 200;
//             res.setHeader('Content-type', 'text/html');
//             res.end(data);
//         }
//     });
// });

// server.listen(8000);
// console.log('Chat app address: http://localhost:8000');

// const wss = new WebSocket.Server({ port: 8080 });
// let clients = {};

// wss.on('connection', (ws) => {
//     let currentUsername = null;

//     // When a user sends a message, forward it to all clients
//     ws.on('message', (message) => {
//         try {
//             const data = JSON.parse(message);

//             // If the username isn't set, assign it
//             if (!currentUsername) {
//                 currentUsername = data.username;
//                 clients[ws] = currentUsername; // Store username for this connection
//             }

//             // Prepare message with timestamp and send it to all clients
//             const messageWithTimestamp = {
//                 username: currentUsername,
//                 message: data.message,
//                 time: new Date().toISOString(),
//             };

//             // Broadcast the message to all connected clients
//             wss.clients.forEach((client) => {
//                 if (client.readyState === WebSocket.OPEN) {
//                     client.send(JSON.stringify(messageWithTimestamp));
//                 }
//             });
//         } catch (error) {
//             console.error('Error parsing message:', error);
//         }
//     });

//     // When a user disconnects, remove them from the clients map
//     ws.on('close', () => {
//         delete clients[ws];
//     });
// });

// working code----------------------------------------

// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const WebSocket = require('ws');

// const server = http.createServer((req, res) => {
//     const filePath = req.url === '/' ? 'login.html' : req.url.substring(1);
//     const fullPath = path.join(__dirname, filePath);  // Ensure full path resolution

//     fs.readFile(fullPath, (err, data) => {
//         if (err) {
//             res.statusCode = 500;
//             res.end(`Error getting the file: ${err}.`);
//         } else {
//             res.statusCode = 200;
//             res.setHeader('Content-type', 'text/html');
//             res.end(data);
//         }
//     });
// });

// server.listen(8000, () => {
//     console.log('Server running on http://localhost:8000');
// });

// const wss = new WebSocket.Server({ port: 8080 });
// let clients = {};

// wss.on('connection', (ws) => {
//     let currentUsername = null;

//     ws.on('message', (message) => {
//         try {
//             const data = JSON.parse(message);
//             if (!currentUsername) {
//                 currentUsername = data.username;
//                 clients[ws] = currentUsername;
//             }

//             const messageWithTimestamp = {
//                 username: currentUsername,
//                 message: data.message,
//                 time: new Date().toISOString(),
//             };

//             wss.clients.forEach((client) => {
//                 if (client.readyState === WebSocket.OPEN) {
//                     client.send(JSON.stringify(messageWithTimestamp));
//                 }
//             });
//         } catch (error) {
//             console.error('Error parsing message:', error);
//         }
//     });

//     ws.on('close', () => {
//         delete clients[ws];
//     });
// });

/// making the ui better------------------------------

// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const WebSocket = require('ws');

// const server = http.createServer((req, res) => {
//     const filePath = req.url === '/' ? 'login.html' : req.url.substring(1);
//     const fullPath = path.join(__dirname, filePath);  // Ensure full path resolution

//     fs.readFile(fullPath, (err, data) => {
//         if (err) {
//             res.statusCode = 500;
//             res.end(`Error getting the file: ${err}.`);
//         } else {
//             res.statusCode = 200;
//             res.setHeader('Content-type', 'text/html');
//             res.end(data);
//         }
//     });
// });

// server.listen(8000, () => {
//     console.log('Server running on http://localhost:8000');
// });

// const wss = new WebSocket.Server({ port: 8080 });
// let clients = {};

// wss.on('connection', (ws) => {
//     let currentUsername = null;

//     ws.on('message', (message) => {
//         try {
//             const data = JSON.parse(message);
//             if (data.type === 'join') {
//                 currentUsername = data.username;
//                 clients[ws] = currentUsername;
//                 broadcastNotification(`${currentUsername} entered the chat`);
//             } else if (data.type === 'chat') {
//                 const messageWithTimestamp = {
//                     type: 'chat',
//                     username: currentUsername,
//                     message: data.message,
//                     time: new Date().toISOString(),
//                 };
//                 broadcastMessage(messageWithTimestamp);
//             } else if (data.type === 'leave') {
//                 broadcastNotification(`${currentUsername} left the chat`);
//                 delete clients[ws];
//             }
//         } catch (error) {
//             console.error('Error parsing message:', error);
//         }
//     });

//     ws.on('close', () => {
//         if (currentUsername) {
//             broadcastNotification(`${currentUsername} left the chat`);
//             delete clients[ws];
//         }
//     });
// });

// function broadcastMessage(message) {
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(message));
//         }
//     });
// }

// function broadcastNotification(message) {
//     const notification = {
//         type: 'notification',
//         message: message,
//         time: new Date().toISOString(),
//     };
//     broadcastMessage(notification);
// }



const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? 'login.html' : req.url.substring(1);
    const fullPath = path.join(__dirname, filePath);  // Ensure full path resolution

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');
            res.end(data);
        }
    });
});

server.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});

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
