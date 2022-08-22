import { Router } from "express";
import * as userController from "../services/user.service";

export const router: Router = Router();

router.post("/users/login", userController.logIn);
router.post("/users", userController.signUp);
