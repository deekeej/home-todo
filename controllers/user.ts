import { Router } from "express";
import * as userController from "../services/user.service";

export const router: Router = Router();

router.post("/users/login", userController.logIn);
router.post("/users/register", userController.signUp);
router.get("/users/user", userController.authenticate);
router.post("/users/refresh", userController.refresh);
router.post("/users/logout", userController.logout);
