// Import Context for handling HTTP response and requests
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prisma from "../../prisma/client/index";

// Zod Schema
// const categorySchema = z.object({
//   name: z.string(),
// });

//  POST a new category
export const createCategory = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    if (typeof body.name !== "string" || body.name.trim() === "") {
      return c.json({ success: false, message: "Invalid category name" }, 400);
    }
    const addCategory = await prisma.category.create({
      data: {
        name: body.name,
      },
    });

    return c.json(
      {
        success: true,
        messages: "Created New Taiwan Tourism Category!",
        data: addCategory,
      },
      201
    );
  } catch (error) {
    console.error(`Error to create category: ${error}`);
    return c.json(
      { sucess: false, message: "error creating new category!" },
      500
    );
  }
};

// GET all category
export const getAllCategory = async (c: Context) => {
  try {
    const category = await prisma.category.findMany({
      orderBy: { id: "desc" },
    });

    return c.json(
      {
        success: true,
        messages: "List Taiwan Tourism category!",
        data: category,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting category: ${error}`);
  }
};

// GET category by id
export const getCategoryById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) return c.json({ success: false, messages: `could not found ID` });

    const category = await prisma.category.findUnique({ where: { id } });

    return c.json(
      {
        success: true,
        messages: "Here is your tourism category you are looking for",
        data: category,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting category: ${error}`);
  }
};

// DELETE category by id
export const deletecategoryById = async (c: Context) => {
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
