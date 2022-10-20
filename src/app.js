import express from 'express'
import Products from './routes/products.router.js'
import Carts from './routes/carts.router.js'
import PORT from '../src/port.js'
import { logger } from '../src/utils/logger.js'
import morganMiddleware from './middlewares/morganMiddleware.js'


export const AUTH_TOKEN = '123456'

const app = express()

app.use(express.json())

app.use(morganMiddleware)

const server = app.listen(PORT().port, () => {
    logger.info(PORT().message)
})

app.use('/api/products', Products)
app.use('/api/carts', Carts)
app.use((req, res)=> {
    logger.warn('not found')
    res.status(404).send()
})