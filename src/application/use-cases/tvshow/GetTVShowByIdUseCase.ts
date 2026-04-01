/**
 * Use Case: Get TVShow by ID
 * Responsável por buscar um TVShow específico
 */
import { TVShow, ITVShowRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface GetTVShowByIdRequest {
  key: string;
}

export interface GetTVShowByIdResponse {
  tvShow: TVShow | null;
}

export class GetTVShowByIdUseCase implements IUseCase<
  GetTVShowByIdRequest,
  GetTVShowByIdResponse
> {
  constructor(private tvShowRepository: ITVShowRepository) {}

  async execute(request: GetTVShowByIdRequest): Promise<GetTVShowByIdResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("TVShow key é obrigatório");
    }

    const tvShow = await this.tvShowRepository.findById(request.key);

    return {
      tvShow,
    };
  }
}
