import { Request, Response } from "express";
import { con } from "../database/database";
import { TodoModel } from "../types/todoModel";

export const getTodos = async (req: Request, res: Response) => {
  try {
    let results: TodoModel[] = [];
    con.query("SELECT id,title,completed FROM todos", (err, rows) => {
      if (err) throw err;
      let todos = JSON.parse(JSON.stringify(rows));
      console.log(rows);
      res.status(200).send(todos);
    });
    // con.end((err) => {
    //   // The connection is terminated gracefully
    //   // Ensures all remaining queries are executed
    //   // Then sends a quit packet to the MySQL server.
    // });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
