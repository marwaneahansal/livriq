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

    setUserRole: protectedProcedure
    .input(z.object({ isSeller: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
        //! Roles is undefined
        const updatedUser = await ctx.prisma.user.update({
            where: {
                id: ctx.session.user.id
            },
            data: {
                role: input.isSeller ? Roles.Seller : Roles.Shipper
            }
        });

      return {
        success: true,
        message: "Current User Role is Set Successfully",
        data: { updatedUser, }
      };
    }),
});