/**
 * Use Case: List Seasons by TVShow
 */
import { Season, ISeasonRepository } from "@domain";
import { IUseCase } from "../IUseCase";

export interface ListSeasonsByTVShowRequest {
  tvShowKey: string;
}

export interface ListSeasonsByTVShowResponse {
  seasons: Season[];
  total: number;
}

export class ListSeasonsByTVShowUseCase implements IUseCase<
  ListSeasonsByTVShowRequest,
  ListSeasonsByTVShowResponse
> {
  constructor(private seasonRepository: ISeasonRepository) {}

  async execute(
    request: ListSeasonsByTVShowRequest,
  ): Promise<ListSeasonsByTVShowResponse> {
    if (!request.tvShowKey || request.tvShowKey.trim().length === 0) {
      throw new Error("TVShow key é obrigatório");
    }

    const seasons = await this.seasonRepository.findByTVShowKey(
      request.tvShowKey,
    );

    return {
      seasons,
      total: seasons.length,
    };
  }
}
