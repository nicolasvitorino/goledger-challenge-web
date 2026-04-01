import { TVShow, type ITVShowRepository } from "@/domain";
import { UpdateTVShowUseCase } from "./UpdateTVShowUseCase";

describe("UpdateTVShowUseCase", () => {
  const makeRepository = (): jest.Mocked<ITVShowRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  it("deve atualizar TVShow com sucesso", async () => {
    const repository = makeRepository();

    repository.findById.mockResolvedValue(
      new TVShow({ key: "tv-1", name: "Dark" }),
    );
    repository.update.mockResolvedValue(
      new TVShow({ key: "tv-1", name: "Dark (updated)" }),
    );

    const useCase = new UpdateTVShowUseCase(repository);

    const response = await useCase.execute({
      key: "tv-1",
      name: "Dark (updated)",
    });

    expect(response.success).toBe(true);
    expect(response.tvShow.name).toBe("Dark (updated)");
    expect(repository.update).toHaveBeenCalledWith("tv-1", {
      name: "Dark (updated)",
    });
  });

  it("deve falhar quando TVShow nao existir", async () => {
    const repository = makeRepository();
    repository.findById.mockResolvedValue(null);

    const useCase = new UpdateTVShowUseCase(repository);

    await expect(
      useCase.execute({ key: "missing-id", name: "Novo nome" }),
    ).rejects.toThrow("TVShow não encontrado");

    expect(repository.update).not.toHaveBeenCalled();
  });
});
