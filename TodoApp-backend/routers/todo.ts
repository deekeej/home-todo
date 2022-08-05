import { Router } from "express";
import * as userController from "../controllers/todo.controller";

export const router: Router = Router();

router.get("/todos", userController.getTodos);

router.post("/todos", userController.addTodo);
