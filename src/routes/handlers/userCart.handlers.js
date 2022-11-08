export class UserCartHandler {
    constructor(cartService, productService, userService) {
        this.cartService = cartService,
        this.productService = productService
        this.userService = userService
    }

    getViewUserCart = async (req, res) => {
        let user = req.session.user
        let currentCartId = user.currentCartId
        let cart = await this.cartService.getById(currentCartId)
        if (cart === null) {
            currentCartId = await this.cartService.create()
            this.userService.updateCurrentCartUser(user.id, currentCartId)
            cart = await this.cartService.getById(currentCartId)
            req.session.user.currentCartId = currentCartId
        }
        const cartToRender = []
        for (const element of cart.products) {
            const product = await this.productService.getById(element.product)
            cartToRender.push({ id: product.id, name: product.name, price: product.price, thumbnail: product.thumbnail, quantity: element.quantity })
        }
        res.render('cart.pug', {
            message: 'Carrito',
            cart: cartToRender,
            currentCartId,
            userId: user.id
        })
    }
}