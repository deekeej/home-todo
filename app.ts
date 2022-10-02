import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { router as userRouter } from "./controllers/user";
import { router as todoRouter } from "./controllers/todo";
import cookieParser from "cookie-parser";

//dotenv set up
dotenv.config();

// express setup
export const app: Express = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4200",
      "http://localhost:8080",
      "https://todo-front.fly.dev",
      "*",
    ],
    credentials: true,
  })
);

// public folder
app.use(express.static(path.join(__dirname, "public")));
//cookie parser
app.use(cookieParser());

// routes
app.use("/authenticate", userRouter);
app.use("/api", todoRouter);

// server setup
const PORT: number =
  process.env.NODE_ENV === "test" ? 3300 : Number(process.env.PORT) || 3000;
app.listen(process.env.PORT || PORT, (): void =>
  console.log(`server running on port: ${PORT}`)
);
