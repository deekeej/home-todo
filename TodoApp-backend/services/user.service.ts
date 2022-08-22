import { Request, Response } from "express";
import { con } from "../database/database";
import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const logIn = async (req: Request, res: Response) => {
  try {
    if (
      validationOfEmail(req.body.Email) &&
      validationOfPassword(req.body.Password)
    ) {
      con.query(
        "SELECT *,COUNT(*) AS cnt FROM users WHERE Email = ? ",
        req.body.Email,
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            if (data[0].cnt > 0) {
              // Already exist
              (async () => {
                if (
                  !(await bcrypt.compare(req.body.Password, data[0].Password))
                ) {
                  res.status(200).send({ message: "Wrong password!" });
                }
                const accessToken = sign(
                  {
                    id: data[0].id,
                  },
                  "access_secret",
                  { expiresIn: "30s" }
                );

                const refreshToken = sign(
                  {
                    id: data[0].id,
                  },
                  "refresh_secret",
                  { expiresIn: "1w" }
                );

                res.cookie("accessToken", accessToken, {
                  httpOnly: true, // fronted can not access this cookie
                  maxAge: 24 * 60 * 60 * 1000, // 1 day
                });

                res.cookie("refreshToken", refreshToken, {
                  httpOnly: true,
                  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });
                res.status(200).send({ message: "success" });
              })();
            } else {
              res.status(200).send({ message: "User doesn`t exist!" });
            }
          }
        }
      );
    } else {
      //when somebody is trying to evade our validation on frontend with postman etc.
      res.status(200).send({ message: "Something went wrong!" });
    }
  } catch (error) {
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
                    // return success, user will insert
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

export const authenticate = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies["accessToken"];
    const payload: any = verify(accessToken, "access_secret");
    if (!payload) {
      res.status(200).send({ message: "unauthenticated" });
    }
    con.query(
      "SELECT *,COUNT(*) AS cnt FROM users WHERE id = ? ",
      payload.id,
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          if (data[0].cnt > 0) {
            // Already exist
            const { Password, cnt, ...auth } = data[0];
            res.send(auth);
          } else {
            res.status(200).send({ message: "unauthenticated" });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    const payload: any = verify(refreshToken, "refresh_secret");
    if (!payload) {
      res.status(200).send({ message: "unauthenticated" });
    }

    const accessToken = sign(
      {
        id: payload.id,
      },
      "access_secret",
      { expiresIn: "30s" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // fronted can not access this cookie
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("accessToken", "", { maxAge: 0 });
  res.cookie("refreshToken", "", { maxAge: 0 });
  res.status(200).send({ message: "success" });
};
