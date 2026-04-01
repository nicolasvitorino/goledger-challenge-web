import { IWatchlistRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface DeleteWatchlistRequest {
  key: string;
}

export interface DeleteWatchlistResponse {
  success: boolean;
}

export class DeleteWatchlistUseCase implements IUseCase<
  DeleteWatchlistRequest,
  DeleteWatchlistResponse
> {
  constructor(private watchlistRepository: IWatchlistRepository) {}

  async execute(
    request: DeleteWatchlistRequest,
  ): Promise<DeleteWatchlistResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Watchlist key e obrigatorio");
    }

    const existing = await this.watchlistRepository.findById(request.key);
    if (!existing) {
      throw new Error("Watchlist nao encontrada");
    }

    const success = await this.watchlistRepository.delete(request.key);
    if (!success) {
      throw new Error("Falha ao remover watchlist");
    }

    return { success: true };
  }
}
