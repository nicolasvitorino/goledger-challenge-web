/**
 * Use Case: List User Watchlist
 */
import { Watchlist, IWatchlistRepository } from "@domain";
import { IUseCase } from "../IUseCase";

export interface ListUserWatchlistRequest {
  userId: string;
}

export interface ListUserWatchlistResponse {
  watchlists: Watchlist[];
  total: number;
}

export class ListUserWatchlistUseCase implements IUseCase<
  ListUserWatchlistRequest,
  ListUserWatchlistResponse
> {
  constructor(private watchlistRepository: IWatchlistRepository) {}

  async execute(
    request: ListUserWatchlistRequest,
  ): Promise<ListUserWatchlistResponse> {
    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error("User ID é obrigatório");
    }

    const watchlists = await this.watchlistRepository.findByUserId(
      request.userId,
    );

    return {
      watchlists,
      total: watchlists.length,
    };
  }
}
