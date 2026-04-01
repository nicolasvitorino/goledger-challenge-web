/**
 * Use Case: Create TVShow
 * Responsável por criar um novo TVShow
 */
import { TVShow, ITVShowRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface CreateTVShowRequest {
  key: string;
  name: string;
  description?: string;
  genre?: string;
  releaseYear?: number;
  posterUrl?: string;
  rating?: number;
}

export interface CreateTVShowResponse {
  tvShow: TVShow;
  success: boolean;
}

export class CreateTVShowUseCase implements IUseCase<
  CreateTVShowRequest,
  CreateTVShowResponse
> {
  constructor(private tvShowRepository: ITVShowRepository) {}

  async execute(request: CreateTVShowRequest): Promise<CreateTVShowResponse> {
    // Validar dados de entrada
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("TVShow key é obrigatório");
    }
    if (!request.name || request.name.trim().length === 0) {
      throw new Error("TVShow name é obrigatório");
    }

    // Criar entidade
    const tvShow = new TVShow({
      key: request.key,
      name: request.name,
      description: request.description,
      genre: request.genre,
      releaseYear: request.releaseYear,
      posterUrl: request.posterUrl,
      rating: request.rating,
    });

    // Validar entidade
    if (!tvShow.isValid()) {
      throw new Error("TVShow inválido");
    }

    // Persistir
    const createdTVShow = await this.tvShowRepository.create(tvShow);

    return {
      tvShow: createdTVShow,
      success: true,
    };
  }
}
