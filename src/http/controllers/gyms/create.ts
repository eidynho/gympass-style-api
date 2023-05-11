import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });

    const { title, description, phone, latitude, longitude } =
        createGymBodySchema.parse(request.body);

    const createGymUseCase = makeCreateGymUseCase();

    // don't need try catch to handle error because don't have custom error
    // so it will be handled globally
    await createGymUseCase.execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    });

    return reply.status(201).send();
}
