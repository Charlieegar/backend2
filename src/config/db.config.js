import { connect, Types } from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export const connectDB = async () => {
    const URL = process.env.DB_URL;  // Leer la URL desde el archivo .env

    if (!URL) {
        console.log("Error: La URL de la base de datos no está definida en el archivo .env");
        return;
    }

    try {
        await connect(URL);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log("Error al conectarse con MongoDB", error.message);
    }
};

export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};

export default connectDB;
