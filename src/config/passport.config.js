import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

    passport.use(
        "current",
        new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey:"uruguayuruguay"
        },
    async ( jwt_payload, done) => {
        try {
            return done(null,jwt_payload )
        } catch (error) {
            return done(error)
        }
    })
    )

};

const cookieExtractor = req => {
    let token = null
    if ( req && req.cookies) {
        token = req.cookies["tokenCookie"]
    }
    return token;
}

export default initializePassport;