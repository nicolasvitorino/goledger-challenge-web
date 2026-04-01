/**
 * Use Case: List Episodes by Season
 */
import { Episode, IEpisodeRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface ListEpisodesBySeasonRequest {
  seasonKey: string;
}

export interface ListEpisodesBySeasonResponse {
  episodes: Episode[];
  total: number;
}

export class ListEpisodesBySeasonUseCase implements IUseCase<
  ListEpisodesBySeasonRequest,
  ListEpisodesBySeasonResponse
> {
  constructor(private episodeRepository: IEpisodeRepository) {}

  async execute(
    request: ListEpisodesBySeasonRequest,
  ): Promise<ListEpisodesBySeasonResponse> {
    if (!request.seasonKey || request.seasonKey.trim().length === 0) {
      throw new Error("Season key é obrigatório");
    }

    const episodes = await this.episodeRepository.findBySeasonKey(
      request.seasonKey,
    );

    return {
      episodes,
      total: episodes.length,
    };
  }
}
