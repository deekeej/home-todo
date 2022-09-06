import mysql from "mysql";

export const con = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "123456",
  database: "todoapp",
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});
