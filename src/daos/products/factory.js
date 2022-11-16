import config from '../../config/config.js'

const persistance = config.persistance.PERSISTANCE

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

/*
Para poder implementar la persistencia, sobre todo en memoria, 
los servicios de persistencia que debo devolver, deben ser de tipo singleton.
De esta forma, la persistencia de productos esta siempre manejada por la misma instancia
y es compartida entre el servicio de productos y el servicio de carritos.
Además es mejor mantener un única conexión con mongo y no multiples para la misma colección

*/


let engine = undefined


export const getProductPersistance = async( ) => {
    if (engine) {
        return engine
    }
    const ProductService = await factoryProducts[persistance]()
    engine = new ProductService()
    return engine
}
