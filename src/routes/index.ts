import { Hono } from "hono";
// Import GET all places controller
import { getAllPlaces } from "../controllers/PlaceController";

// Initialize router
const router = new Hono();

// Routes places index
router.get("/", (c) => getAllPlaces(c));

export const Router = router;
