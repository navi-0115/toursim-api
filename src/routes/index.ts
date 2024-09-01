import { Hono } from "hono";
// Import GET all places controller
import {
  getAllLocations,
  getLocationById,
  deleteLocationById,
} from "../controllers/LocationController";

import { createCategory } from "../controllers/CategoryController";

// Initialize router
const router = new Hono();

// Routes to get all locations
router.get("/locations", getAllLocations);
// Routes to get place by id
router.get("/locations/:id", getLocationById);
// Routes to create single Location
// router.post("/locations", ...createLocation);
// Routes to delete single Location
router.delete("/locations/:id", deleteLocationById);
// Routes to update single Location
// router.patch("/locations/:id", updateLocationById);

// Routes to post a new category
router.post("/category", createCategory);
export const Routes = router;
