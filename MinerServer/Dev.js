import Block from "./Block.js";

const block = new Block('foo', 'bar', ';ef0' , 'wef')
console.log(block.toString());
console.log(Block.genesis().toString());


const fooblock = Block.MineBlock(Block.genesis(), "thisisankit")
console.log(fooblock.toString());
