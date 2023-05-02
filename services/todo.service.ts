import { Request, Response } from "express";
import { con } from "../database/database";
import { TodoModel } from "../types/todoModel";

export const getTodos = async (req: Request, res: Response) => {
  console.log("this is params:");
  console.log(req.params.id);
  console.log("this is a body:");
  console.log(req.body);
  try {
    con.query(
      `SELECT id,id_user,title,completed FROM todos where id_user= ?`,
      req.params.id,
      (err, rows) => {
        if (err) throw err;
        let todos: TodoModel[] = JSON.parse(JSON.stringify(rows));
        console.log(rows);
        res.status(200).send(todos);
      }
    );
    //con.end((err) => {
    //   // The connection is terminated gracefully
    //   // Ensures all remaining queries are executed
    //   // Then sends a quit packet to the MySQL server.
    //});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const addTodo = async (req: Request, res: Response) => {
  console.log("this is params:");
  console.log(req.params.id);
  console.log("this is a body:");
  console.log(req.body);
  console.log(req.body.length);
  try {
    con.query(
      `INSERT INTO todos (id_user,title,completed) VALUES (?,?,?)`,
      [req.body.id, req.body.title, req.body.completed],
      (err) => {
        console.log("This is error from AddTodo:");
        if (err) throw err;
        console.log(err);
        res.json({ something: "something" });
      }
    );
    //con.end((err) => {
    //   // The connection is terminated gracefully
    //   // Ensures all remaining queries are executed
    //Then sends a quit packet to the MySQL server.
    //});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    console.log("this is params:");
    console.log(req.params.id);
    console.log("this is a body:");
    console.log(req.body);
    con.query(`DELETE from todos where id=?`, req.params.id, (err) => {
      if (err) throw err;
      res.status(200).send({ message: "ima trying" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  console.log("this is params:");
  console.log(req.params.id);
  console.log("this is  body:");
  console.log(req.body);
  try {
    con.query(
      `UPDATE todos set title=?,completed=? where id=?`,
      [req.body.title, req.body.completed, req.params.id],
      (err) => {
        if (err) throw err;
        res.status(200).send({ message: "ima trying" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const completeAllTodos = async (req: Request, res: Response) => {
  console.log("this is params:");
  console.log(req.params.id);
  console.log("this is a body:");
  console.log(req.body);
  try {
    req.body.forEach((id: number) => {
      console.log("THIS IS ID IN LOOP:" + id);
      con.query(`UPDATE todos set completed=1 where id=?`, id, (err) => {
        if (err) throw err;
      });
    });
    res.status(200).send({ message: "ima trying" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteCompletedAllTodos = async (req: Request, res: Response) => {
  console.log("this is params:");
  console.log(req.params.id);
  console.log("this is a body:");
  console.log(req.body);
  try {
    String(req.query.Ids)
      .split(",")
      .map((id) => parseInt(id, 10))
      .forEach((id: number) => {
        con.query(`DELETE from todos where id=?`, id, (err) => {
          if (err) throw err;
        });
      });
    res.status(200).send({ message: "ima trying" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
