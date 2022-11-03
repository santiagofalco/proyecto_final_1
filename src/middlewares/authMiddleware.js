import { AUTH_TOKEN } from '../app.js'
import { logger } from '../utils/logger.js';

const authMiddleware = (req, res, next) => {
    try {
        if (req.headers.authorization != AUTH_TOKEN) {
            return res.status(401).send({ status: 'error', error: 'No autorizado para realizar esta accion' })
        } else {
            next();
        }
    } catch (error) {
        logger.error('Error' + err)
    }
}
export default authMiddleware