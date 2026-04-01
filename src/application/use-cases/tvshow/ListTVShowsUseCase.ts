/**
 * Use Case: List All TVShows
 * Responsável por listar todos os TVShows
 */
import { TVShow, ITVShowRepository } from "@domain";
import { IUseCase } from "../IUseCase";

export interface ListTVShowsRequest {
  filters?: Record<string, unknown>;
}

export interface ListTVShowsResponse {
  tvShows: TVShow[];
  total: number;
}

export class ListTVShowsUseCase implements IUseCase<
  ListTVShowsRequest,
  ListTVShowsResponse
> {
  constructor(private tvShowRepository: ITVShowRepository) {}

  async execute(request: ListTVShowsRequest): Promise<ListTVShowsResponse> {
    const tvShows = await this.tvShowRepository.findAll(request.filters);

    return {
      tvShows,
      total: tvShows.length,
    };
  }
}
