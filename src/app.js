import express from 'express'
import Products from './routes/products.router.js'
import Carts from './routes/carts.router.js'


export const AUTH_TOKEN = '123456'

const app = express()

app.use(express.json())

const server = app.listen(8080, () => {
    console.log('Listening on 8080')
})

app.use('/api/products', Products)
app.use('/api/carts', Carts)
