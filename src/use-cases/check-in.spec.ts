import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";

import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let checkInRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInRepository, gymsRepository);

        gymsRepository.items.push({
            id: "gym-01",
            title: "NodeJS Gym",
            description: "",
            phone: "",
            latitude: new Decimal(-23.4178799),
            longitude: new Decimal(-51.928231),
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.4178799,
            userLongitude: -51.928231,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.4178799,
            userLongitude: -51.928231,
        });

        await expect(() => {
            return sut.execute({
                userId: "user-01",
                gymId: "gym-01",
                userLatitude: -23.4178799,
                userLongitude: -51.928231,
            });
        }).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.4178799,
            userLongitude: -51.928231,
        });

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.4178799,
            userLongitude: -51.928231,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in on distant gym", async () => {
        gymsRepository.items.push({
            id: "gym-02",
            title: "NodeJS Gym",
            description: "",
            phone: "",
            latitude: new Decimal(-23.3847121),
            longitude: new Decimal(-51.9541872),
        });

        await expect(() => {
            return sut.execute({
                userId: "user-01",
                gymId: "gym-02",
                userLatitude: -23.4178799,
                userLongitude: -51.928231,
            });
        }).rejects.toBeInstanceOf(Error);
    });
});
