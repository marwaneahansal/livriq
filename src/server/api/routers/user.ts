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
    .input(z.object({ 
        isSeller: z.boolean(),
        companyName: z.string().nonempty(),
        phoneNumber: z.string().nonempty(),
        city: z.string().nonempty(),
        deliveryMethod: z.string().nullable() }
    ))
    .mutation(async ({ ctx, input }) => {
        try {

            const updatedUser = await ctx.prisma.user.update({
                where: {
                    id: ctx.session.user.id
                },
                data: {
                    role: input.isSeller ? Roles.Seller : Roles.Shipper,
                    isCompleted: true,
                }
            });
    
            if (updatedUser.role === Roles.Seller)
            {
                await ctx.prisma.seller.create({
                    data: {
                        city: input.city,
                        phoneNumber: input.phoneNumber,
                        companyName: input.companyName,
                        userId: ctx.session.user.id
                    },
                });
            } else if (updatedUser.role === Roles.Shipper)
            {
                await ctx.prisma.shipper.create({
                    data: {
                        city: input.city,
                        phoneNumber: input.phoneNumber,
                        companyName: input.companyName,
                        userId: ctx.session.user.id,
                        deliveryMethod: input.deliveryMethod!
                    },
                });
            }
    
          return {
            success: true,
            message: "Current User Role is Set Successfully",
            data: { updatedUser, }
          };
        } catch (e) {
            return {
                success: false,
                message: "Error while setting user role",
              };
        }
    }),
});