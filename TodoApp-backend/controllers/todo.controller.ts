import { Request, Response } from "express";
import { con } from "../database/database";
import { TodoModel } from "../types/todoModel";

export const getTodos = async (req: Request, res: Response) => {
  try {
    con.query("SELECT id,title,completed FROM todos", (err, rows) => {
      if (err) throw err;
      let todos: TodoModel[] = JSON.parse(JSON.stringify(rows));
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
export const addTodo = async (req: Request, res: Response) => {
  try {
    con.query(
      `INSERT INTO todos (id_user,title,completed) VALUES 
    (1,"${req.body.title}",${req.body.completed})`,
      (err) => {
        if (err) throw err;
        res.status(200);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    con.query(`DELETE from todos where id=${req.params.id}`, (err) => {
      if (err) throw err;
      res.status(200);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    con.query(
      `UPDATE todos set title="${req.body.title}",completed=${req.body.completed} where id=${req.params.id}`,
      (err) => {
        if (err) throw err;
        res.status(200);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const completeAllTodos = async (req: Request, res: Response) => {
  try {
    console.log("HI!");
    console.log(req.body);
    req.body.Ids.forEach((id: number) => {
      con.query(`UPDATE todos set completed=1 where id=${id}`, (err) => {
        if (err) throw err;
        res.status(200);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
