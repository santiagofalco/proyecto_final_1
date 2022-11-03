import { Router } from 'express'
import passport from 'passport'
import { logger } from '../utils/logger.js'


const router = Router()

router.get('/', async (req, res) => {
    res.render('signup.pug', {
        message: 'Registro de Usuario'
    })
})

router.post('/', passport.authenticate('register', {
    failureRedirect: '/registerfail/error'
}), async (req, res) => {
    try {
        res.send({ status: 'success', payload: req.user._id })
    } catch (error) {
        logger.error(error)
    }
})

export default router