import { AUTH_TOKEN } from '../app.js'

const authMiddleware = (req, res, next) => {
    try {
        if (req.headers.authorization != AUTH_TOKEN) {
            return res.status(401).send({ status: 'error', error: 'No autorizado para realizar esta accion' })
        } else {
            next();
        }
    } catch (error) {
        console.error('Error' + err)
    }
}
export default authMiddleware