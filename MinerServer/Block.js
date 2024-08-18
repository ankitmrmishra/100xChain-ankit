import sha256 from "crypto-js/sha256.js";
class Block{
    // special function
    constructor(timeStamp, lastHash, ownHAsh, data){
       this.timeStamp = timeStamp;
       this.lastHash = lastHash;
       this.ownHAsh= ownHAsh;
       this.data =data; 

    }

    toString(){
        return `Block
        TimeStamp: ${this.timeStamp}
        LastHash : ${this.lastHash.substring(0,10)}
        ownhash  : ${this.ownHAsh.substring(0,10)}
        Data     : ${this.data}
        `
    }
    static genesis(){
        return new this('genesis time' , '------' , "fir57-h45h" , [])
    }
    static MineBlock(lastBloc, data){
      const timeStamp = Date.now(); // since jan 1970 millisecond passed
      const lastHash = lastBloc.ownHAsh;
      const hashofown = Block.hashfun(timeStamp,lastHash,data)

      return new this(timeStamp, lastHash, hashofown, data)

    }

    // generating a unique hash value 
    // we will algo SHA-256: this produces a unique 32 bit hash valu for unique data inputs
                        // : Own way hash
                        // " useful for validation"
     
                        
     // this is hashb function
     
     static hashfun(timeStamp, lasthash, data){
        return sha256(`${timeStamp}${lasthash}${data}`).toString()
     }

     static Blockhash(block){
        const {timeStamp, lastHash, data} = block;
        return Block.hashfun(timeStamp, lastHash,data)
     }
}

export default Block