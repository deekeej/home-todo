import { Router } from "express";
import * as todoService from "../services/todo.service";

export const router: Router = Router();

router.get("/todos/:id", todoService.getTodos);
router.post("/todos", todoService.addTodo);
router.delete("/todos/:id", todoService.deleteTodo);
router.delete("/todos", todoService.deleteCompletedAllTodos);
router.put("/todos/:id", todoService.updateTodo);
router.put("/todos", todoService.completeAllTodos);
