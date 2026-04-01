import { TVShow, type ITVShowRepository } from "@/domain";
import { DeleteTVShowUseCase } from "./DeleteTVShowUseCase";

describe("DeleteTVShowUseCase", () => {
  const makeRepository = (): jest.Mocked<ITVShowRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  it("deve deletar TVShow com sucesso", async () => {
    const repository = makeRepository();
    repository.findById.mockResolvedValue(
      new TVShow({ key: "tv-1", name: "Dark" }),
    );
    repository.delete.mockResolvedValue(true);

    const useCase = new DeleteTVShowUseCase(repository);

    const response = await useCase.execute({ key: "tv-1" });

    expect(response.success).toBe(true);
    expect(repository.delete).toHaveBeenCalledWith("tv-1");
  });

  it("deve falhar quando TVShow nao existir", async () => {
    const repository = makeRepository();
    repository.findById.mockResolvedValue(null);

    const useCase = new DeleteTVShowUseCase(repository);

    await expect(useCase.execute({ key: "missing" })).rejects.toThrow(
      "TVShow não encontrado",
    );
    expect(repository.delete).not.toHaveBeenCalled();
  });
});
