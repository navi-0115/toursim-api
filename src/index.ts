import { Hono } from "hono";
import { SwaggerUI } from "@hono/swagger-ui";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();

// Use the middleware to serve Swagger UI at /ui
app.get("/ui", (c) => {
  return c.html(`
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Custom Swagger" />
        <title>Custom Swagger</title>
        <script>
          // custom script
        </script>
        <style>
          /* custom style */
        </style>
      </head>
      ${SwaggerUI({ url: "/doc" })}
    </html>
  `);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/places", async (c) => {
  const places = await prisma.place.findMany();
  return c.json(places);
});

export default app;
