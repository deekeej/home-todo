import { Router } from "express";
import * as userController from "../controllers/user.controller";

export const router: Router = Router();

router.get("/users", userController.getUsers);
