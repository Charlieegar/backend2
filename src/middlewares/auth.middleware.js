import passport from "passport";

export const authorizeAdmin = (req, res, next) => {
    passport.authenticate('current', { session: false }, (err, user) => {
        console.log("Usuario autenticado (admin):", user); 

        if (err || !user) {
            return res.status(401).json({ status: "Error", message: "No estás autorizado, por favor inicie sesión." });
        }

        if (user.role === 'admin') {
            req.user = user;
            return next();
        }

        return res.status(403).json({ status: "Error", message: "Acceso denegado, solo administradores pueden realizar esta acción." });
    })(req, res, next);
};

export const authorizeUser = (req, res, next) => {
    console.log("Cookies recibidas:", req.cookies); 

    passport.authenticate('current', { session: false }, (err, user) => {
        console.log("Usuario autenticado:", user);

        if (err || !user) {
            return res.status(401).json({ status: "Error", message: "No estás autorizado, por favor inicie sesión." });
        }

        req.user = user;
        return next();
    })(req, res, next);
};
