import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Roles } from "@prisma/client";

export const usersRouter = createTRPCRouter({
    getUser: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findUnique({
            where: {
                id: ctx.session.user.id
            },
        })
    }),

    setUserInfo: protectedProcedure
    .input(z.object({ isSeller: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
        const updatedUser = await ctx.prisma.user.update({
            where: {
                id: ctx.session.user.id
            },
            data: {
                role: input.isSeller ? Roles.Seller : Roles.Shipper,
                isCompleted: true,
            }
        });

      return {
        success: true,
        message: "Current User Role is Set Successfully",
        data: { updatedUser, }
      };
    }),
});