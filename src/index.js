import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.config.js";
import userRoutes from './routes/users.routes.js'
import viewRoutes from './routes/views.routes.js'
import initializePassport from "./config/passport.config.js";
import passport from "passport";
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



//passport
initializePassport();
app.use(passport.initialize());


//routes
app.use('/api/users', userRoutes)
app.use('/', viewRoutes)


//listeners
connectDb(URL);

app.listen(app.get("PORT"), () => {
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
