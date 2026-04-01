/**
 * Use Case: Create Episode
 */
import { Episode, IEpisodeRepository } from "@domain";
import { IUseCase } from "../IUseCase";

export interface CreateEpisodeRequest {
  key: string;
  seasonKey: string;
  tvShowKey: string;
  episodeNumber: number;
  title: string;
  description?: string;
  duration?: number;
  airDate?: string;
  rating?: number;
}

export interface CreateEpisodeResponse {
  episode: Episode;
  success: boolean;
}

export class CreateEpisodeUseCase implements IUseCase<
  CreateEpisodeRequest,
  CreateEpisodeResponse
> {
  constructor(private episodeRepository: IEpisodeRepository) {}

  async execute(request: CreateEpisodeRequest): Promise<CreateEpisodeResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Episode key é obrigatório");
    }
    if (!request.seasonKey || request.seasonKey.trim().length === 0) {
      throw new Error("Episode seasonKey é obrigatório");
    }
    if (!request.tvShowKey || request.tvShowKey.trim().length === 0) {
      throw new Error("Episode tvShowKey é obrigatório");
    }
    if (request.episodeNumber < 1) {
      throw new Error("Episode episodeNumber deve ser maior que 0");
    }
    if (!request.title || request.title.trim().length === 0) {
      throw new Error("Episode title é obrigatório");
    }

    const episode = new Episode({
      key: request.key,
      seasonKey: request.seasonKey,
      tvShowKey: request.tvShowKey,
      episodeNumber: request.episodeNumber,
      title: request.title,
      description: request.description,
      duration: request.duration,
      airDate: request.airDate,
      rating: request.rating,
    });

    if (!episode.isValid()) {
      throw new Error("Episode inválido");
    }

    const createdEpisode = await this.episodeRepository.create(episode);

    return {
      episode: createdEpisode,
      success: true,
    };
  }
}
