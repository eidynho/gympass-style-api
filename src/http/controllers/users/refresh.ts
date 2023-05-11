import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true });

    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.sub,
            },
        },
    );

    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.sub,
                expiresIn: "30d",
            },
        },
    );

    return reply
        .status(200)
        .setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true, // HTTPS
            sameSite: true,
            httpOnly: true, // accessible just in back-end
        })
        .send({
            token,
        });
}
