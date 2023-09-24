import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
    getUser: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findUnique({
            where: {
                id: ctx.session.user.id
            },
        })
    }),
});