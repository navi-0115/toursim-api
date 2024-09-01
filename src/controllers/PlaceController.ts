// Import Context for handling HTTP response and requests
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prisma from "../../prisma/client/index";

// Zod Schema
const placeSchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number().int(),
});

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

// GET place by id
export const getPlaceById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) return c.json({ success: false, messages: "could not found ID" });

    const place = await prisma.place.findUnique({ where: { id } });

    return c.json(
      {
        success: true,
        messages: "Here is your tourism place you are looking for",
        data: place,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting places: ${error}`);
  }
};

// DELETE place by id
export const deletePlaceById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) return c.json({ success: false, messages: "could not found ID" });

    const deletedPlace = await prisma.place.delete({ where: { id } });

    return c.json(
      {
        success: true,
        messages: `Location with ID ${id} has been deleted`,
        data: deletedPlace,
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
