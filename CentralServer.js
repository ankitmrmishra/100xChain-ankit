import WebSocket, { WebSocketServer } from 'ws';


const wss = new WebSocketServer({ port: 8080 });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected');
   

    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        
        broadcastMessage(message, ws);
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

function broadcastMessage(message, sender) {
    clients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
            
            
        }
    });
}

console.log('WebSocket server is running on ws://localhost:8080');