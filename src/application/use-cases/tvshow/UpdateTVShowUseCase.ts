/**
 * Use Case: Update TVShow
 * Responsável por atualizar um TVShow existente
 */
import { TVShow, ITVShowRepository } from "@domain";
import { IUseCase } from "../IUseCase";

export interface UpdateTVShowRequest {
  key: string;
  name?: string;
  description?: string;
  genre?: string;
  releaseYear?: number;
  posterUrl?: string;
  rating?: number;
}

export interface UpdateTVShowResponse {
  tvShow: TVShow;
  success: boolean;
}

export class UpdateTVShowUseCase implements IUseCase<
  UpdateTVShowRequest,
  UpdateTVShowResponse
> {
  constructor(private tvShowRepository: ITVShowRepository) {}

  async execute(request: UpdateTVShowRequest): Promise<UpdateTVShowResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("TVShow key é obrigatório");
    }

    // Buscar TVShow existente
    const existingTVShow = await this.tvShowRepository.findById(request.key);
    if (!existingTVShow) {
      throw new Error("TVShow não encontrado");
    }

    // Preparar dados para atualização
    const updateData: Partial<TVShow> = {};
    if (request.name !== undefined) updateData.name = request.name;
    if (request.description !== undefined)
      updateData.description = request.description;
    if (request.genre !== undefined) updateData.genre = request.genre;
    if (request.releaseYear !== undefined)
      updateData.releaseYear = request.releaseYear;
    if (request.posterUrl !== undefined)
      updateData.posterUrl = request.posterUrl;
    if (request.rating !== undefined) updateData.rating = request.rating;

    // Atualizar
    const updatedTVShow = await this.tvShowRepository.update(
      request.key,
      updateData,
    );

    return {
      tvShow: updatedTVShow,
      success: true,
    };
  }
}
