import { IEpisodeRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface DeleteEpisodeRequest {
  key: string;
}

export interface DeleteEpisodeResponse {
  success: boolean;
}

export class DeleteEpisodeUseCase implements IUseCase<
  DeleteEpisodeRequest,
  DeleteEpisodeResponse
> {
  constructor(private episodeRepository: IEpisodeRepository) {}

  async execute(request: DeleteEpisodeRequest): Promise<DeleteEpisodeResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Episode key e obrigatorio");
    }

    const existing = await this.episodeRepository.findById(request.key);
    if (!existing) {
      throw new Error("Episode nao encontrado");
    }

    const success = await this.episodeRepository.delete(request.key);
    if (!success) {
      throw new Error("Falha ao remover episode");
    }

    return { success: true };
  }
}
