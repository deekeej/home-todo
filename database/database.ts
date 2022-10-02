import mysql from "mysql";

// connect to localhost
// export const con = mysql.createConnection({
//   host: "localhost",
//   user: "newuser",
//   password: "123456",
//   database: "todoapp",
// });

// connect to aws RDS server
export const con = mysql.createConnection({
  host: "dbtodos.cimmks5yeesx.eu-central-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "a1234567",
  database: "todoapp",
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});
