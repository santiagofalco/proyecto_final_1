import { logger } from '../utils/logger.js'


class UserService {

    constructor(persistance) {
        this.persistance = persistance
    }

    getById = async (id) => {
        try {
            let user = await this.persistance.findById(id)
            return user
        } catch (error) {
            logger.error('error en UserService', error)
        }
    }

    updateCurrentCartUser = async (id, currentCartId) => {
        try {
            await this.persistance.findByIdAndUpdate(
                id,
                {
                    $set: {
                        currentCartId: currentCartId
                    },
                }
            )
        } catch (error) {
            logger.error('error en UpdateCurrentCartUser UserService', error)
        }
    }

}

export default UserService