import config from "../../config/config.js";

const persistance = config.persistance.PERSISTANCE

const factoryCarts = {
    'MEMORY': async () => {
        const {default: CartService} = await import('./MemoryDao/carts.js')
        return CartService
    },
    'FS': async () => {
        const {default: CartService} = await import('./FSDao/carts.js')
        return CartService
    },
    'MONGO': async () => {
        const {default: CartService} = await import('./MongoDao/carts.js')
        return CartService
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


export const getCartPersistance = async () => {
    if (engine){
        return engine
    }
    const CartService = await factoryCarts[persistance]()
    engine = new CartService()
    return engine
}
