import FSContainer from './FSContainer.js';

const fileName = 'products.json'

export default class Products extends FSContainer {
    constructor() {
        super(fileName)
    }
    
}