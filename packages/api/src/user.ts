import { prisma } from "db/lib/prisma";
import * as z from "zod";

import { publicProcedure, router } from "./trpc";

export const userRouter = router({
  /**
   * Get all users
   */
  getAll: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),

  /**
   * Get a single user by id
   */
  getOne: publicProcedure.input(z.object({ id: z.string() })).query((opts) => {
    const { id } = opts.input;
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }),

  /**
   * Create a new user
   */
  addUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
      }),
    )
    .mutation(async (opts) => {
      const { name, email, password } = opts.input;
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return user;
    }),

  /**
   * Update a user
   */
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { id, name, email, password } = opts.input;
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
        },
      });

      return user;
    }),

  /**
   * Delete a user
   */
  deleteUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      return user;
    }),
});
