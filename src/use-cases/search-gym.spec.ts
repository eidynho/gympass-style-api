import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search.gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search a gym use case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);
    });

    it("should be able to search for gyms", async () => {
        await gymsRepository.create({
            title: "NodeJS Gym",
            description: "A beautiful gym",
            phone: null,
            latitude: -23.4178799,
            longitude: -51.928231,
        });

        await gymsRepository.create({
            title: "Typescript Gym",
            description: "The best gym",
            phone: null,
            latitude: -23.4178799,
            longitude: -51.928231,
        });

        const { gyms } = await sut.execute({
            query: "NodeJS",
            page: 1,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "NodeJS Gym",
            }),
        ]);
    });

    it("should be able to fetch paginated gyms search", async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Typescript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -23.4178799,
                longitude: -51.928231,
            });
        }

        const { gyms } = await sut.execute({
            query: "Typescript",
            page: 2,
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "Typescript Gym 21",
            }),
            expect.objectContaining({
                title: "Typescript Gym 22",
            }),
        ]);
    });
});
