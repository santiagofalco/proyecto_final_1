import { Router } from 'express'
import passport from 'passport'
import { logger } from '../utils/logger.js'

const router = Router()

router.get('/', async (req, res) => {
    res.render('login.pug', {
        message: 'Login de Usuario'
    })
})

router.post('/', passport.authenticate('login', {
    failureRedirect: '/loginfail/error'
}), async (req, res) => {
    try {
        req.session.user = {
            name: req.user.name,
            email: req.user.email,
            id: req.user._id,
            avatar: req.user.avatar,
            currentCartId: req.user.currentCartId,
            role: req.user.role
        }
        res.send({ status: 'success', payload: req.session.user })
    } catch (error) {
        logger.error(error)
    }
})
export default router
