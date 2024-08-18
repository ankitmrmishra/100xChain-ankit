import express from "express";
import bodyParser from "body-parser";
import blockchain from "./MinerServer/BlockChain.js";
import P2pServer from "./MinerServer/minerServer.js";
const PORT = process.env.PORT || 3000;

const app = express();

const blockchainInstance = new blockchain();

const p2pServerinsatnce = new P2pServer(blockchainInstance)

app.use(bodyParser.json())

app.get('/blocks' , (req, res)=>{
    res.json(blockchainInstance.chain);


})

app.post('/mine', (req,res) =>{
    const block = blockchainInstance.addBlock(req.body.data);
    console.log("block was added");

    res.redirect('/blocks')
    
})

app.listen(PORT, ()=>{
    console.log("Listeign");
    
})

p2pServerinsatnce.listen();