import { Episode, IEpisodeRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface UpdateEpisodeRequest {
  key: string;
  title?: string;
  description?: string;
  duration?: number;
  rating?: number;
}

export interface UpdateEpisodeResponse {
  episode: Episode;
  success: boolean;
}

export class UpdateEpisodeUseCase implements IUseCase<
  UpdateEpisodeRequest,
  UpdateEpisodeResponse
> {
  constructor(private episodeRepository: IEpisodeRepository) {}

  async execute(request: UpdateEpisodeRequest): Promise<UpdateEpisodeResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Episode key e obrigatorio");
    }

    const existing = await this.episodeRepository.findById(request.key);
    if (!existing) {
      throw new Error("Episode nao encontrado");
    }

    const episode = await this.episodeRepository.update(request.key, {
      title: request.title,
      description: request.description,
      duration: request.duration,
      rating: request.rating,
    });

    return { episode, success: true };
  }
}
