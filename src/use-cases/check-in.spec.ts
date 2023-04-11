import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe("Check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new CheckInUseCase(checkInRepository);
    });

    it("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
