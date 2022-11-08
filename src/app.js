import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import __dirname from './dirname.js'
import Products from './routes/products.router.js'
import Carts from './routes/carts.router.js'
import Home from './routes/users.router.js'
import userCart from './routes/userCart.router.js'
import Edit from './routes/editView.router.js'
import login from './routes/login.js'
import logout from './routes/logout.js'
import signup from './routes/signup.js'
import loginfail from './routes/loginfail.js'
import registerfail from './routes/registerfail.js'
import { logger } from '../src/utils/logger.js'
import morganMiddleware from './middlewares/morganMiddleware.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import config from './config/config.js'


export const AUTH_TOKEN = '123456'

const app = express()

app.use(express.json())

app.use(morganMiddleware)

const connect = mongoose.connect(config.mongo.MONGO_URL)

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.MONGO_URL,
        ttl: 600,
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')


const server = app.listen(config.app.PORT || 8000, () => {
    logger.info(`Listening on port: ${config.app.PORT}`)
})

app.use("/public", express.static(__dirname + '/public'));
app.use('/', Home)
app.use('/login', login)
app.use('/logout', logout)
app.use('/signup', signup)
app.use('/loginfail', loginfail)
app.use('/registerfail', registerfail)
app.use('/cart', userCart)
app.use('/api/products', Products)
app.use('/api/carts', Carts)
app.use('/edit', Edit)
app.use((req, res) => {
    logger.warn('not found')
    res.status(404).send()
})