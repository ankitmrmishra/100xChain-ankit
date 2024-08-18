import Block from "./Block.js";

class blockchain{
    constructor(){
     this.chain = [Block.genesis()]   
    }

    addBlock(data){
        const lastblock = this.chain[this.chain.length -1];
        const block = Block.MineBlock(lastblock, data);
        this.chain.push(block);
        return block;
    }
    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for(let i =1 ; i < chain.length;i++){
            const block = chain[i];
            const lastblock = chain[i-1];

            if(block.lastHash !== lastblock.ownHAsh || block.ownHAsh !== Block.Blockhash(block)) return false;
        }
    }

    replacechainFun(newChain){
        if(newChain.length <= this.chain.length){
            console.log("Not longer chain than the current chain");
            return;
            
        } else if(!this.isValidChain(newChain)){
            console.log("Not a valid chain");
            return;
        }

        console.log("New chain replaces the prevoius chain");
        

        this.chain = newChain;
    }
}

export default blockchain;