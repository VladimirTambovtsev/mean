import { Strategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'


const User = mongoose.model('users')
require('dotenv').config()

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.SECRET_KEY


export default passport => {
    passport.use(new Strategy(options, (jwtPayload, done) => {
        User.findById(jwtPayload.id)
            .then(user => {
                if (user) return done(null, user)
                return done(null, false)
            })
            .catch(err => console.log('err: ', err))
    }))
}