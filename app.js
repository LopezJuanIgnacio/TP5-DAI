import express from "express"
import Routes from "./src/routes/routes.js"
import morgan from "morgan"
import cors from "cors"
const app = express();

// settings
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/pizzas/", Routes);

export default app;
