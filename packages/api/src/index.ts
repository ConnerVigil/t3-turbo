import { prisma } from "db/lib/prisma";
import * as z from "zod";

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  /**
   * Get all posts
   */
  getAll: publicProcedure.query(async () => {
    const posts = await prisma.post.findMany();
    return posts;
  }),

  /**
   * Get a single post by id
   */
  getOne: publicProcedure.input(z.object({ id: z.string() })).query((opts) => {
    const { id } = opts.input;
    return prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }),

  /**
   * Create a new post
   */
  addPost: publicProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async (opts) => {
      const { title, content } = opts.input;
      const post = await prisma.post.create({
        data: {
          title,
          content,
        },
      });
      return post;
    }),

  /**
   * Update a post
   */
  updatePost: publicProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async (opts) => {
      const { id, title, content } = opts.input;
      const post = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title,
          content,
        },
      });

      return post;
    }),

  /**
   * Delete a post
   */
  deletePost: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      const post = await prisma.post.delete({
        where: {
          id: id,
        },
      });

      return post;
    }),
});

export type AppRouter = typeof appRouter;
