import { Router } from "express";
import * as userController from "../services/user.service";

export const router: Router = Router();

router.get("/users", userController.getUsers);
router.post("/users", userController.addUser);
