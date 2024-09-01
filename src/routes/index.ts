import { Hono } from "hono";
// Import GET all places controller
import {
  getAllPlaces,
  createPlace,
  getPlaceById,
  deletePlaceById,
  updatePlaceById,
} from "../controllers/PlaceController";

// Initialize router
const router = new Hono();

// Routes to get all places
router.get("/places", getAllPlaces);
// Routes to get place by id
router.get("/places/:id", getPlaceById);
// Routes to create single place
router.post("/places", ...createPlace);
// Routes to delete single place
router.delete("/places/:id", deletePlaceById);
// Routes to update single place
router.patch("/places/:id", updatePlaceById);

export const Routes = router;
