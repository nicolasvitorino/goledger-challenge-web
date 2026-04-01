import { Season, type ISeasonRepository } from "@/domain";
import { CreateSeasonUseCase } from "./CreateSeasonUseCase";

describe("CreateSeasonUseCase", () => {
  const makeRepository = (): jest.Mocked<ISeasonRepository> => ({
    findById: jest.fn(),
    findByTVShowKey: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  it("deve criar season com sucesso", async () => {
    const repository = makeRepository();
    repository.create.mockResolvedValue(
      new Season({
        key: "season-1",
        tvShowKey: "tv-1",
        seasonNumber: 1,
        title: "Season 1",
      }),
    );

    const useCase = new CreateSeasonUseCase(repository);

    const response = await useCase.execute({
      key: "season-1",
      tvShowKey: "tv-1",
      seasonNumber: 1,
      title: "Season 1",
    });

    expect(response.success).toBe(true);
    expect(response.season.seasonNumber).toBe(1);
    expect(repository.create).toHaveBeenCalledTimes(1);
  });

  it("deve falhar com seasonNumber invalido", async () => {
    const repository = makeRepository();
    const useCase = new CreateSeasonUseCase(repository);

    await expect(
      useCase.execute({
        key: "season-1",
        tvShowKey: "tv-1",
        seasonNumber: 0,
      }),
    ).rejects.toThrow("Season seasonNumber deve ser maior que 0");

    expect(repository.create).not.toHaveBeenCalled();
  });
});
