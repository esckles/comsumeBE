import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
import env from "dotenv";
env.config();

const app: Application = express();
app.use(express.json());
mainApp(app);
app.use(
  cors({
    origin: "https://e-samstore.onrender.com",
    methods: ["GET", "PATCH", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("App initilized");
console.log("Enviromnet", process.env.NODE_ENV);
console.log("Port", process.env.PORT);

app.listen(parseInt(process.env.PORT as string), () => {
  dbConfig();
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
