import { Router } from "express";
import usersModel from "../models/users.model.js";
import { isValidPassword, createHash, generateToken } from "../utils/bcrypt.js";
import passport from "passport";


const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await usersModel.find();

        // validar si hay usuarios

        res.status(200).json({ status: "Ok", payload: users });
    } catch (error) {
        res.status(500).json({ status: "Error ", error: error.message });
    }
});

router.post("/register", async (req, res) => {
    const { first_name, last_name, email,age, password, role } = req.body;
    try {
        // Verificar si el email ya está en uso
        const userExists = await usersModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ status: "Error", message: "El email ya está en uso" });
        }

        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
        };

        if (role) newUser.role = role;

        await usersModel.create(newUser);

        res.redirect("/login"); // Redirigir al login después del registro exitoso
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await usersModel.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ status: "Error", message: "Usuario no encontrado" });
        }

        const isValid = isValidPassword(password, userFound.password);
        if (!isValid) {
            return res.status(400).json({ status: "Error", message: "Contraseña incorrecta" });
        }

        const user = userFound._doc;
        delete user.password;
        
        const token = generateToken(user);

        res.cookie("tokenCookie", token, { signed: true });
        res.redirect("/current"); // Redirige a /current después del login exitoso
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

// Ruta para obtener los datos del usuario logueado
router.get("/api/sessions/current", passport.authenticate("current", { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ status: "Error", message: "No estás logueado" });
    }
    res.json({ status: "Ok", payload: req.user });
});


export default router;
