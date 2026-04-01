import { TVShow, type ITVShowRepository } from "@/domain";
import { CreateTVShowUseCase } from "./CreateTVShowUseCase";

describe("CreateTVShowUseCase", () => {
  const makeRepository = (): jest.Mocked<ITVShowRepository> => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  it("deve criar TVShow com sucesso", async () => {
    const repository = makeRepository();
    const created = new TVShow({
      key: "tv-1",
      name: "Dark",
      genre: "Sci-Fi",
    });

    repository.create.mockResolvedValue(created);

    const useCase = new CreateTVShowUseCase(repository);

    const response = await useCase.execute({
      key: "tv-1",
      name: "Dark",
      genre: "Sci-Fi",
    });

    expect(response.success).toBe(true);
    expect(response.tvShow.name).toBe("Dark");
    expect(repository.create).toHaveBeenCalledTimes(1);
  });

  it("deve falhar quando name for vazio", async () => {
    const repository = makeRepository();
    const useCase = new CreateTVShowUseCase(repository);

    await expect(
      useCase.execute({
        key: "tv-1",
        name: "",
      }),
    ).rejects.toThrow("TVShow name é obrigatório");

    expect(repository.create).not.toHaveBeenCalled();
  });
});
