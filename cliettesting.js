import WebSocket from 'ws';
import { createInterface } from 'readline';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected to the server');
});

ws.on('message', (message) => {
    console.log('Received:', message.toString());
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    ws.send(input);
});