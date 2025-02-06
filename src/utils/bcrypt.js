import { hashSync, compareSync, genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";
const CLAVE_JWT = "uruguayuruguay";

export const createHash = (password) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
};

export const isValidPassword = (password, passwordHash) => {
    return compareSync(password, passwordHash);
};

export const generateToken = (user) => {
    return jwt.sign({ user }, CLAVE_JWT, { expiresIn: "5m" });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, CLAVE_JWT)
    } catch (error) {
        return null
    }
};