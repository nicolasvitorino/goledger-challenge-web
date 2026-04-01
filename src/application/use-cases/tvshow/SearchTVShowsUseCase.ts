/**
 * Use Case: Search TVShows
 * Responsável por buscar TVShows com critérios específicos
 */
import { TVShow, ITVShowRepository } from "@domain";
import { IUseCase } from "../IUseCase";

export interface SearchTVShowsRequest {
  query: Record<string, unknown>;
}

export interface SearchTVShowsResponse {
  tvShows: TVShow[];
  total: number;
}

export class SearchTVShowsUseCase implements IUseCase<
  SearchTVShowsRequest,
  SearchTVShowsResponse
> {
  constructor(private tvShowRepository: ITVShowRepository) {}

  async execute(request: SearchTVShowsRequest): Promise<SearchTVShowsResponse> {
    if (!request.query || Object.keys(request.query).length === 0) {
      throw new Error("Critérios de busca são obrigatórios");
    }

    const tvShows = await this.tvShowRepository.search(request.query);

    return {
      tvShows,
      total: tvShows.length,
    };
  }
}
