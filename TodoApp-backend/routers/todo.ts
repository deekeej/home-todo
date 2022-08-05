import { Router } from "express";
import * as todoController from "../controllers/todo.controller";

export const router: Router = Router();

router.get("/todos", todoController.getTodos);
router.post("/todos", todoController.addTodo);
router.delete("/todos/:id", todoController.deleteTodo);
router.delete("/todos", todoController.deleteCompletedAllTodos);
router.put("/todos/:id", todoController.updateTodo);
router.put("/todos", todoController.completeAllTodos);
