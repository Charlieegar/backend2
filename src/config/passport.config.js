import passport from "passport";
import jwt from "passport-jwt";

// Usamos JWTStrategy y ExtractJwt para manejar la autenticación
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// Función para inicializar Passport
const initializePassport = () => {
    passport.use(
        "current", 
        new JWTStrategy(
            {
                
                jwtFromRequest: ExtractJWT.fromExtractors([
                    ExtractJWT.fromAuthHeaderAsBearerToken(), 
                    cookieExtractor, 
                ]),
                secretOrKey: process.env.SECRET_KEY, // Usa la clave secreta que tienes en tu .env
            },
            async (jwt_payload, done) => {
                try {
                    // Retorna el payload del JWT, que en este caso contiene los datos del usuario
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

// Función para extraer el token de las cookies
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["tokenCookie"]; 
    }
    return token;
};

export default initializePassport;
