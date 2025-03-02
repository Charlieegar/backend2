import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.config.js";
import userRoutes from './routes/users.routes.js'
import viewRoutes from './routes/views.routes.js'
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import dotenv from "dotenv";
import ticketRoutes from './routes/tickets.routes.js';
import cartRoutes from './routes/carts.routes.js'; 
import productRoutes from "./routes/products.routes.js"

//settings
const app = express();
app.set("PORT", 3000);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const FIRMA = "firma-cookie";

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(FIRMA));

app.use(express.static("src/public"));

dotenv.config();

//passport
initializePassport();
app.use(passport.initialize());

// rutas
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/carts', cartRoutes); 
app.use('/api/products', productRoutes);
app.use('/', viewRoutes);

//listeners
const URL = process.env.DB_URL;
connectDb(URL);

app.listen(app.get("PORT"), () => {
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
