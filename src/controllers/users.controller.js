import UserRepository from "../dao/repositories/UserRepository.js";
import { isValidPassword, createHash, generateToken } from "../utils/bcrypt.js";

// Creamos una instancia del repositorio
const usersRepository = new UserRepository();

export const getUsers = async (req, res) => {
    try {
        const users = await usersRepository.getAllUsers(); 
        res.status(200).json({ status: "Ok", payload: users });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};

export const registerUser = async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
    try {
        console.log("Contraseña original: ", password);  

        const userExists = await usersRepository.getUserByEmail(email);

        if (userExists) {
            return res.status(400).json({ status: "Error", message: "El email ya está en uso" });
        }

        const hashedPassword = createHash(password);
        console.log("Contraseña encriptada: ", hashedPassword); 

        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: hashedPassword, 
            role
        };

        await usersRepository.createUser(newUser);
        res.status(201).json({ status: "Ok", message: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await usersRepository.getUserByEmail(email);

        if (!userFound) {
            return res.status(400).json({ status: "Error", message: "Usuario no encontrado" });
        }

        console.log("Contraseña proporcionada:", password);
        console.log("Contraseña almacenada en la base de datos:", userFound.password);

        if (!password || !userFound.password) {
            return res.status(400).json({ status: "Error", message: "Contraseña no válida o incorrecta" });
        }

        
        const isValid = isValidPassword(password, userFound.password);

        console.log("¿Contraseña válida?", isValid);

        if (!isValid) {
            return res.status(400).json({ status: "Error", message: "Contraseña incorrecta" });
        }

        const token = generateToken(userFound);

        res.cookie("tokenCookie", token, { signed: true });
        res.json({ status: "Ok", message: "Login exitoso", token });

    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};



export const getCurrentUser = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ status: "Error", message: "No estás logueado" });
    }

    const userDTO = new UserDTO(req.user); 

    res.json({ status: "Ok", payload: userDTO });
};

