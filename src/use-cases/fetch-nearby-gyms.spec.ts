import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms use case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it("should be able to search for gyms up to 10 km", async () => {
        await gymsRepository.create({
            title: "Near Gym",
            description: null,
            phone: null,
            latitude: -23.4178799,
            longitude: -51.928231,
        });

        await gymsRepository.create({
            title: "Far Gym",
            description: null,
            phone: null,
            latitude: -23.4859973,
            longitude: -51.7990692,
        });

        const { gyms } = await sut.execute({
            userLatitude: -23.4178799,
            userLongitude: -51.928231,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "Near Gym",
            }),
        ]);
    });
});
