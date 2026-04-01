import { Episode, IEpisodeRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface ListEpisodesRequest {
  query?: Record<string, unknown>;
}

export interface ListEpisodesResponse {
  episodes: Episode[];
  total: number;
}

export class ListEpisodesUseCase implements IUseCase<
  ListEpisodesRequest,
  ListEpisodesResponse
> {
  constructor(private episodeRepository: IEpisodeRepository) {}

  async execute(request: ListEpisodesRequest): Promise<ListEpisodesResponse> {
    const episodes = await this.episodeRepository.search(request.query || {});

    return {
      episodes,
      total: episodes.length,
    };
  }
}
