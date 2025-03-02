import { hashSync, compareSync, genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";
const CLAVE_JWT = "uruguayuruguay"; // O puedes usar process.env.SECRET_KEY

export const createHash = (password) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
};

export const isValidPassword = (password, passwordHash) => {
    return compareSync(password, passwordHash);
};

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role }, 
        CLAVE_JWT,
        { expiresIn: "1h" }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, CLAVE_JWT);
    } catch (error) {
        return null;
    }
};
