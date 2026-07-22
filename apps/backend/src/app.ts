import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";  
import articleRoutes from "./routes/article.routes.js"; 

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use(healthRoutes);

export default app;