import { Watchlist, type IWatchlistRepository } from "@/domain";
import { AddToWatchlistUseCase } from "./AddToWatchlistUseCase";

describe("AddToWatchlistUseCase", () => {
  const makeRepository = (): jest.Mocked<IWatchlistRepository> => ({
    findById: jest.fn(),
    findByUserId: jest.fn(),
    findByUserAndTVShow: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  it("deve adicionar item na watchlist com status default", async () => {
    const repository = makeRepository();

    repository.create.mockImplementation(async (watchlist) => watchlist);

    const useCase = new AddToWatchlistUseCase(repository);

    const response = await useCase.execute({
      key: "w-1",
      userId: "user-1",
      tvShowKey: "tv-1",
    });

    expect(response.success).toBe(true);
    expect(response.watchlist.status).toBe("plan-to-watch");
    expect(repository.create).toHaveBeenCalledTimes(1);
  });

  it("deve falhar quando userId for vazio", async () => {
    const repository = makeRepository();
    const useCase = new AddToWatchlistUseCase(repository);

    await expect(
      useCase.execute({
        key: "w-1",
        userId: "",
        tvShowKey: "tv-1",
      }),
    ).rejects.toThrow("User ID é obrigatório");

    expect(repository.create).not.toHaveBeenCalled();
  });
});
