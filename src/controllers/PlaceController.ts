// Import Context for handling HTTP response and requests
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prisma from "../../prisma/client/index";

// Zod Schema
const locationSchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number().int(),
});

// GET all locations
export const getAllLocations = async (c: Context) => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { id: "desc" },
    });

    return c.json(
      {
        success: true,
        messages: "List Taiwan Tourism Locations!",
        data: locations,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting locations: ${error}`);
  }
};

// GET location by id
export const getLocationById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) return c.json({ success: false, messages: `could not found ID` });

    const location = await prisma.location.findUnique({ where: { id } });

    return c.json(
      {
        success: true,
        messages: "Here is your tourism location you are looking for",
        data: location,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting locations: ${error}`);
  }
};

// DELETE location by id
export const deleteLocationById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) return c.json({ success: false, messages: "could not found ID" });

    const deletedLocation = await prisma.location.delete({ where: { id } });

    return c.json(
      {
        success: true,
        messages: `Location with ID ${id} has been deleted`,
        data: deletedLocation,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting places: ${error}`);
  }
};

// POST a new place

export const createPlace = [
  zValidator("json", placeSchema),
  async (c: Context) => {
    const body = c.req.valid("json");
    try {
      const addPlace = await prisma.place.create({
        data: {
          name: body.name,
          description: body.description,
          categoryId: body.categoryId,
        },
      });

      return c.json(
        {
          success: true,
          messages: "Created New Taiwan Tourism Place!",
          data: addPlace,
        },
        201
      );
    } catch (error) {
      console.error(`Error to create place: ${error}`);
      return c.json(
        { sucess: false, message: "error creating new place!" },
        500
      );
    }
  },
];

// export async function createPlace(c: Context) {
//   try {
//     const data = await c.req.parseBody();

//     const name = data["name"];
//     const description = data["description"];
//     const categoryId = data["categoryId"];

// const name = typeof data["name"] === "string" ? data["name"] : "";
// const description =
//   typeof data["description"] === "string" ? data["description"] : "";
// const categoryId =
//   typeof data["categoryId"] === "number" ? data["categoryId"] : null;

// if (!name || !description || !categoryId) {
//   return c.json({ success: false, message: "Invalid input" }, 400);
// }

// const categoryExist = await prisma.category.findUnique({
//   where: { id: categoryId },
// });
// if (!categoryExist) {
//   return c.json({ success: false, message: "Category not found" }, 404);
// }

//     const addPlace = await prisma.place.create({
//       data: {
//         name: name,
//         description: description,
//         categoryId: categoryId,
//       },
//     });
//     return c.json(
//       {
//         success: true,
//         messages: "Created New Taiwan Tourism Place!",
//         data: addPlace,
//       },
//       201
//     );
//   } catch (error) {
//     console.error(`Error to create place: ${error}`);
//     return c.json({ sucess: false, message: "error creating new place!" }, 500);
//   }
// }
