import { Hono } from "hono";
// Import routes
import { Routes } from "./routes/index";
// Initialization of Hono app using route /api
const app = new Hono();

app.route("/api", Routes);

export default app;
