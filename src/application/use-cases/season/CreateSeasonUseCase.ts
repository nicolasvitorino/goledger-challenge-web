/**
 * Use Case: Create Season
 */
import { Season, ISeasonRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface CreateSeasonRequest {
  key: string;
  tvShowKey: string;
  seasonNumber: number;
  title?: string;
  description?: string;
  releaseYear?: number;
}

export interface CreateSeasonResponse {
  season: Season;
  success: boolean;
}

export class CreateSeasonUseCase implements IUseCase<
  CreateSeasonRequest,
  CreateSeasonResponse
> {
  constructor(private seasonRepository: ISeasonRepository) {}

  async execute(request: CreateSeasonRequest): Promise<CreateSeasonResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Season key é obrigatório");
    }
    if (!request.tvShowKey || request.tvShowKey.trim().length === 0) {
      throw new Error("Season tvShowKey é obrigatório");
    }
    if (request.seasonNumber < 1) {
      throw new Error("Season seasonNumber deve ser maior que 0");
    }

    const season = new Season({
      key: request.key,
      tvShowKey: request.tvShowKey,
      seasonNumber: request.seasonNumber,
      title: request.title,
      description: request.description,
      releaseYear: request.releaseYear,
    });

    if (!season.isValid()) {
      throw new Error("Season inválido");
    }

    const createdSeason = await this.seasonRepository.create(season);

    return {
      season: createdSeason,
      success: true,
    };
  }
}
