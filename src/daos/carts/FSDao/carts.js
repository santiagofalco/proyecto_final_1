import FSContainer from './FSContainer.js';


const fileName = "carts.json"

export default class Carts extends FSContainer {
    constructor(){
        super(fileName)
    }
    
}