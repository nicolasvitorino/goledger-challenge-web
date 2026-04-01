/**
 * Use Case: Delete TVShow
 * Responsável por deletar um TVShow
 */
import { ITVShowRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface DeleteTVShowRequest {
  key: string;
}

export interface DeleteTVShowResponse {
  success: boolean;
}

export class DeleteTVShowUseCase implements IUseCase<
  DeleteTVShowRequest,
  DeleteTVShowResponse
> {
  constructor(private tvShowRepository: ITVShowRepository) {}

  async execute(request: DeleteTVShowRequest): Promise<DeleteTVShowResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("TVShow key é obrigatório");
    }

    // Verificar se TVShow existe
    const tvShow = await this.tvShowRepository.findById(request.key);
    if (!tvShow) {
      throw new Error("TVShow não encontrado");
    }

    // Deletar
    const deleted = await this.tvShowRepository.delete(request.key);

    if (!deleted) {
      throw new Error("Erro ao deletar TVShow");
    }

    return {
      success: true,
    };
  }
}
