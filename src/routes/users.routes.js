import { Router } from "express";
import passport from "passport";
import { 
    getUsers, 
    registerUser, 
    loginUser, 
    getCurrentUser 
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/api/sessions/current", passport.authenticate("current", { session: false }), getCurrentUser);



export default router;
