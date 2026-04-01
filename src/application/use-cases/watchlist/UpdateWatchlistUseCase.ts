import { Watchlist, IWatchlistRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface UpdateWatchlistRequest {
  key: string;
  status?: "watching" | "completed" | "plan-to-watch" | "dropped";
  rating?: number;
  notes?: string;
}

export interface UpdateWatchlistResponse {
  watchlist: Watchlist;
  success: boolean;
}

export class UpdateWatchlistUseCase implements IUseCase<
  UpdateWatchlistRequest,
  UpdateWatchlistResponse
> {
  constructor(private watchlistRepository: IWatchlistRepository) {}

  async execute(
    request: UpdateWatchlistRequest,
  ): Promise<UpdateWatchlistResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Watchlist key e obrigatorio");
    }

    const existing = await this.watchlistRepository.findById(request.key);
    if (!existing) {
      throw new Error("Watchlist nao encontrada");
    }

    const watchlist = await this.watchlistRepository.update(request.key, {
      status: request.status,
      rating: request.rating,
      notes: request.notes,
    });

    return { watchlist, success: true };
  }
}
