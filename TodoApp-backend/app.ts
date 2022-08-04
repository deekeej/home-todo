import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { router as userRouter } from "./routers/user";
import { router as todoRouter } from "./routers/todo";

//dotenv set up
dotenv.config();

// express setup
export const app: Express = express();
app.use(express.json());

app.use(cors());

// public folder
app.use(express.static(path.join(__dirname, "public")));

//database connection
// select all authors

// routes
app.use("/user", userRouter);
app.use("/api", todoRouter);

// server setup
const PORT: number =
  process.env.NODE_ENV === "test" ? 3300 : Number(process.env.PORT) || 3000;
app.listen(PORT, (): void => console.log(`server running on port: ${PORT}`));
