import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create gym use case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to create gym", async () => {
        const { gym } = await sut.execute({
            title: "NodeJS Gym",
            description: "A beautiful gym",
            phone: null,
            latitude: -23.4178799,
            longitude: -51.928231,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
