// Import Context for handling HTTP response and requests
import { Context } from "hono";

import prisma from "../../prisma/client/index";

// GET all places
export const getAllPlaces = async (c: Context) => {
  try {
    const places = await prisma.place.findMany({ orderBy: { id: "desc" } });

    return c.json(
      {
        success: true,
        messages: "List Taiwan Tourism Places!",
        data: places,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting places: ${error}`);
  }
};
