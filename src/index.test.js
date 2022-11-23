import Supertest from "supertest";
import Chai from "chai";

const expect = Chai.expect
const requester = Supertest('http://localhost:8080')

describe('User testing', () => {
    describe('GETS', () => {
        it('La petición a login debe retornar 200', async () => {
            let response = await requester.get('/login')
            expect(response.status).to.be.equal(200)
        })
    })
    describe('POSTS', () => {
        it('El carrito vacio debe ser creado con un id', async () => {
            let response = await requester.post('/api/carts')
            let {_body} = response
            console.log(_body)
            expect(_body).to.include.keys('id')

        })
    })
})

describe('Product testing', () => {
    describe('GETS', () => {
        it('La petición debe traer los productos de la base de datos como array', async () => {
            let response = await requester.get('/api/products')
            const {_body} = response;
            console.log(_body)
            expect(_body).to.be.an('array')
        })
        it('El producto debe contener un code', async () => {
            let response = await requester.get('/api/products/630e98ccc8b772dccce82ec0')
            const {_body} = response;
            console.log('code',_body.code)
            expect(_body).to.include.keys('code')
        })

    })
    describe('POSTS', () => {
        it('El producto añadido a la base de datos debe contener un timestamp y un id', async () => {
            let response = await requester.post('/api/products')
            const {_body} = response;
            console.log(_body)
            expect(_body).to.include.keys('timestamp', '_id')
        })
        it('El producto añadido a la base de datos debe contener stock 100', async () => {
            let item = {
                name: "mochila",
                description: "mochila de colores",
                code: "cq6",
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-256.png",
                price: 200,
                stock: 100,
                timestamp: 4905864345,
            }
            let response = await requester.post('/api/products').send(item)
            const { _body } = response;
            console.log(_body)
            expect(_body.stock).to.be.equal(100)
        })
    })
})

describe('Cart testing', () => {
    describe('GETS', () => {
        it('Carrito inical debe devolver un array de productos vacio', async () => {
            let response = await requester.get('/api/carts/637d282d4ae50c5709bc57f6/products')
            const {_body} = response;
            console.log(_body)
            expect(_body).to.include([])
        })
    })
    describe('POST', () => {
        it('Creacion de carrito con array products vacio', async () => {
            let response = await requester.post('/api/carts/')
            const {_body} = response;
            console.log(_body)
            expect(_body).to.include([])
        })
        it('Producto en carrito debe incluir quantity y product (id)', async () => {
            let item = {
                quantity: '5',
                product: '630e98ccc8b772dccce82ec0' 
            }
            let response = await requester.post('/api/carts/637d2652c02a25990d47b95a/products').send(item)
            const {_body} = response;
            console.log(_body)
            expect(_body).to.include.keys('quantity','product')
        })
    })

})