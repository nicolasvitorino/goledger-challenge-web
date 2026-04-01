import { Season, ISeasonRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface UpdateSeasonRequest {
  key: string;
  title?: string;
  description?: string;
  releaseYear?: number;
}

export interface UpdateSeasonResponse {
  season: Season;
  success: boolean;
}

export class UpdateSeasonUseCase implements IUseCase<
  UpdateSeasonRequest,
  UpdateSeasonResponse
> {
  constructor(private seasonRepository: ISeasonRepository) {}

  async execute(request: UpdateSeasonRequest): Promise<UpdateSeasonResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Season key e obrigatorio");
    }

    const existing = await this.seasonRepository.findById(request.key);
    if (!existing) {
      throw new Error("Season nao encontrada");
    }

    const season = await this.seasonRepository.update(request.key, {
      title: request.title,
      description: request.description,
      releaseYear: request.releaseYear,
    });

    return { season, success: true };
  }
}
