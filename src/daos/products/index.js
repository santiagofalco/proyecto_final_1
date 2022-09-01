const persistence = process.env.PERSISTANCE

const factoryProducts = {
    'MEMORY': async () => {
        const {default: ProductsService} = await import('./MemoryDao/products.js')
        return ProductsService
    },
    'FS': async () => {
        const {default: ProductsService} = await import('./FSDao/products.js') 
        return ProductsService
    },
    'MONGO': async () => {
        const {default: ProductService} = await import('./MongoDao/products.js')
        return ProductService

    }
}

let engine = undefined


export const getProductPersistance = async( ) => {
    if (engine) {
        return engine
    }
    const ProductService = await factoryProducts[persistence]()
    engine = new ProductService()
    return engine
}
