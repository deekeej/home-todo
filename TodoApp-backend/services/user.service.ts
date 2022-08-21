import { Request, Response } from "express";
import { con } from "../database/database";
import bcrypt from "bcryptjs";

export const getUsers = async (req: Request, res: Response) => {
  try {
    con.query("SELECT * FROM users", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows.username);
    });
    // con.end((err) => {
    //   // The connection is terminated gracefully
    //   // Ensures all remaining queries are executed
    //   // Then sends a quit packet to the MySQL server.
    // });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.Password);
    res
      .writeHead(301, {
        Location: `http://localhost:4200/login`,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
