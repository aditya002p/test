import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const todos = await prisma.todo.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(todos);
    }

    if (req.method === "POST") {
      const todo = await prisma.todo.create({
        data: {
          text: req.body.text,
          status: req.body.status,
        },
      });
      return res.status(201).json(todo);
    }

    if (req.method === "PUT") {
      const todo = await prisma.todo.update({
        where: { id: req.body.id },
        data: {
          text: req.body.text,
          status: req.body.status,
        },
      });
      return res.status(200).json(todo);
    }

    if (req.method === "DELETE") {
      await prisma.todo.delete({
        where: { id: req.query.id as string },
      });
      return res.status(200).json({ message: "Todo deleted" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Request error:", error);
    res.status(500).json({
      error: "Error processing request",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
