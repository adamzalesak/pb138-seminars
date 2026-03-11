import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  CreateInstructorBodySchema,
  InstructorSchema,
} from "./instructor.schema";
import * as instructorsService from "./instructors.service";
import { ErrorResponseSchema } from "../../types";

export const instructorsRouter = new OpenAPIHono();

// GET /instructors
instructorsRouter.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Instructors"],
    operationId: "getInstructors",
    description: "Returns all instructors.",
    responses: {
      200: {
        description: "List of instructors",
        content: {
          "application/json": { schema: z.array(InstructorSchema) },
        },
      },
    },
  }),
  (c) => {
    const instructors = instructorsService.getAll();
    return c.json(instructors, 200);
  },
);

// GET /instructors/:id
instructorsRouter.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    tags: ["Instructors"],
    operationId: "getInstructorById",
    description: "Returns a single instructor by ID.",
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      200: {
        description: "The instructor",
        content: {
          "application/json": { schema: InstructorSchema },
        },
      },
      404: {
        description: "Instructor not found",
        content: {
          "application/json": { schema: ErrorResponseSchema },
        },
      },
    },
  }),
  (c) => {
    const { id } = c.req.valid("param");
    const instructor = instructorsService.getById(id);

    if (!instructor) {
      return c.json({ message: `Instructor with id '${id}' not found` }, 404);
    }

    return c.json(instructor, 200);
  },
);

// POST /instructors
instructorsRouter.openapi(
  createRoute({
    method: "post",
    path: "/",
    tags: ["Instructors"],
    operationId: "createInstructor",
    description: "Creates a new instructor.",
    request: {
      body: {
        content: {
          "application/json": { schema: CreateInstructorBodySchema },
        },
      },
    },
    responses: {
      201: {
        description: "Instructor created",
        content: {
          "application/json": { schema: InstructorSchema },
        },
      },
    },
  }),
  (c) => {
    const body = c.req.valid("json");
    const instructor = instructorsService.create(body);
    return c.json(instructor, 201);
  },
);
