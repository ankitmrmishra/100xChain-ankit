
import WebSocket, { WebSocketServer } from 'ws';
import Block from "./Block.js";
import Blockchain from "./BlockChain.js";

const P2P_PORT = process.env.P2P_PORT || 5000;

const peers = process.env.PEERS ? process.env.PEERS.split(','): [];

class P2pServer{
  constructor(blockchain){
     this.blockchain = blockchain;
     this.sockets= []
  }

  listen(){
    const server = new WebSocketServer({
      port: P2P_PORT
    })
    server.on('connection', socket => this.connectSocket(socket))
    this.connectTOpeers();
    console.log("Listening for peer-to-peer connection");
    
  }
  connectSocket(socket){
    this.sockets.push(socket)
    console.log("Socket connected ");
    
  }
  connectTOpeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.connectSocket(socket));
      socket.on('error', (error) => {
        console.log(`Failed to connect to peer ${peer}:`, error.message);
      });
    });
  }

}

export default P2pServer
// }
// class MinerServer {
//     constructor(blockchain) {
//         this.blockchain = new Blockchain();
//         this.ws = new WebSocket(centralServerUrl);
//         this.pendingTransactions = [];

//         this.setupWebSocket();
//     }

//     setupWebSocket() {
//         this.ws.on('open', () => {
//             console.log('Connected to central server');
//             this.syncBlockchain();
//         });

//         this.ws.on('message', (message) => {
//             const data = JSON.parse(message);
//             this.handleMessage(data);
//         });
//     }

//     syncBlockchain() {
//         this.broadcast({ type: 'GET_BLOCKCHAIN' });
//     }

//     handleMessage(data) {
//         switch (data.type) {
//             case 'NEW_BLOCK':
//                 this.validateAndAddBlock(data.block);
//                 break;
//             case 'NEW_TRANSACTION':
//                 this.addTransaction(data.transaction);
//                 break;
//             case 'GET_BLOCKCHAIN':
//                 this.sendBlockchain();
//                 break;
//             case 'BLOCKCHAIN':
//                 this.receiveBlockchain(data.chain);
//                 break;
//         }
//     }

//     validateAndAddBlock(block) {
//         const newChain = [...this.blockchain.chain, block];
//         if (this.blockchain.isValidChain(newChain)) {
//             this.blockchain.addBlock(block.data);
//             console.log('New block added to the chain');
//         } else {
//             console.log('Invalid block received');
//         }
//     }

//     addTransaction(transaction) {
//         // TODO: Implement transaction validation logic
//         this.pendingTransactions.push(transaction);
//     }

//     mineBlock() {
//         const newBlock = this.blockchain.addBlock(this.pendingTransactions);
//         this.broadcast({ type: 'NEW_BLOCK', block: newBlock });
//         this.pendingTransactions = [];
//     }

//     sendBlockchain() {
//         this.broadcast({ type: 'BLOCKCHAIN', chain: this.blockchain.chain });
//     }

//     receiveBlockchain(chain) {
//         this.blockchain.replacechainFun(chain);
//     }

//     broadcast(message) {
//         this.ws.send(JSON.stringify(message));
//     }
// }

// // Usage
// const miner = new MinerServer('ws://localhost:8080');

// // Start mining periodically
// setInterval(() => {
//     miner.mineBlock();
// }, 10000); // Mine a block every 10 seconds

// export default MinerServer;