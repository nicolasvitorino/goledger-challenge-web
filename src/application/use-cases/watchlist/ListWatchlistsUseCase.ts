import { Watchlist, IWatchlistRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface ListWatchlistsRequest {
  query?: Record<string, unknown>;
}

export interface ListWatchlistsResponse {
  watchlists: Watchlist[];
  total: number;
}

export class ListWatchlistsUseCase implements IUseCase<
  ListWatchlistsRequest,
  ListWatchlistsResponse
> {
  constructor(private watchlistRepository: IWatchlistRepository) {}

  async execute(
    request: ListWatchlistsRequest,
  ): Promise<ListWatchlistsResponse> {
    const watchlists = await this.watchlistRepository.search(
      request.query || {},
    );

    return {
      watchlists,
      total: watchlists.length,
    };
  }
}
