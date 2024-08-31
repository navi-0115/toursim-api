import { Hono } from "hono";
// Import routes
import { Routes } from "./routes/index";
// Initialization of Hono app using route /api
const app = new Hono().basePath("/api");

// Places routes
app.route("/places", Routes);

export default app;
