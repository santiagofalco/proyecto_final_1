import express from 'express'
import Products from './routes/products.router.js'
import Carts from './routes/carts.router.js'
import PORT from '../src/port.js'


export const AUTH_TOKEN = '123456'

const app = express()

app.use(express.json())

const server = app.listen(PORT().port, () => {
    console.log(PORT().message)
})

app.use('/api/products', Products)
app.use('/api/carts', Carts)