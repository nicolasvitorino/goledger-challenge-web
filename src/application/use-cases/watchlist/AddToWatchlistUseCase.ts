/**
 * Use Case: Add to Watchlist
 */
import { Watchlist, IWatchlistRepository } from "@domain";
import { IUseCase } from "../IUseCase";

export interface AddToWatchlistRequest {
  key: string;
  userId: string;
  tvShowKey: string;
  status?: "watching" | "completed" | "plan-to-watch" | "dropped";
}

export interface AddToWatchlistResponse {
  watchlist: Watchlist;
  success: boolean;
}

export class AddToWatchlistUseCase implements IUseCase<
  AddToWatchlistRequest,
  AddToWatchlistResponse
> {
  constructor(private watchlistRepository: IWatchlistRepository) {}

  async execute(
    request: AddToWatchlistRequest,
  ): Promise<AddToWatchlistResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Watchlist key é obrigatório");
    }
    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error("User ID é obrigatório");
    }
    if (!request.tvShowKey || request.tvShowKey.trim().length === 0) {
      throw new Error("TVShow key é obrigatório");
    }

    const watchlist = new Watchlist({
      key: request.key,
      userId: request.userId,
      tvShowKey: request.tvShowKey,
      status: request.status || "plan-to-watch",
      addedAt: new Date().toISOString(),
    });

    if (!watchlist.isValid()) {
      throw new Error("Watchlist inválido");
    }

    const createdWatchlist = await this.watchlistRepository.create(watchlist);

    return {
      watchlist: createdWatchlist,
      success: true,
    };
  }
}
