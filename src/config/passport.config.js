import passport from "passport";
import local from 'passport-local'
import userService from "../daos/users/MongoDao/users.js";
import { createHash, isValidPassword } from "../utils/password.js";
import UserDTO from '../daos/users/UserDTO.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            try {
                const { name, adress, age, number, avatar } = req.body
                if (!name || !email || !password) return done(null, false, { message: 'Valores incompletos' })
                const exists = await userService.findOne({ name: name })
                if (exists) return done(null, false, { message: 'Usuario ya existe' })
                const newUser = {adress, age, number, avatar, name, email, password: createHash(password)}
                let result = await userService.create(newUser)
                return done(null, result)
            } catch (error) {
                done(error)
            }
        }))



    passport.use('login', new LocalStrategy({ usernameField: 'email' },
        async (email, password, done) => {
            try {
                if (!email || !password) return done(null, false, { message: 'Valores incompletos' })
                let result = await userService.findOne({ email: email })
                const user = new UserDTO(result)
                if (!user) return done(null, false, { message: 'credenciales incorrectas' })
                if (!isValidPassword(user, password)) return done(null, false, { message: 'contraseña incorrecta' })
                return done(null, user)
            } catch (error) {
                done(error)
            }
        }))


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await userService.findOne({ id: id })
        return done(null, result)
    })

}

export default initializePassport