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

export const signUp = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    con.query(
      "SELECT COUNT(*) AS cnt FROM users WHERE Email = ? ",
      req.body.Email,
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          if (data[0].cnt > 0) {
            // Already exist
            res.status(200).send({ message: "exists" });
          } else {
            if (
              validationOfEmail(req.body.Email) &&
              validationOfName(req.body.Name) &&
              validationOfPassword(req.body.Password)
            ) {
              con.query(
                `INSERT INTO users (Username,Email,Password) VALUES 
           ("${req.body.Name}","${req.body.Email}","${hashedPassword}")`,
                function (err) {
                  if (err) {
                    throw err;
                    // return error
                  } else {
                    res.status(200).send({ message: "success" });
                    // return success , user will insert
                  }
                }
              );
            } else {
              res.status(200).send({ message: "exists" });
            }
          }
        }
      }
    );
  } catch (error) {
    res.status(400).send(error);
  }
};

function validationOfEmail(email: string): boolean {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validationOfName(name: string): boolean {
  return /^[a-zA-Z]{3,}$/.test(name);
}

function validationOfPassword(password: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  );
}
