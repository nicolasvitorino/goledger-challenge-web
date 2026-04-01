import { Season, ISeasonRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface ListSeasonsRequest {
  query?: Record<string, unknown>;
}

export interface ListSeasonsResponse {
  seasons: Season[];
  total: number;
}

export class ListSeasonsUseCase implements IUseCase<
  ListSeasonsRequest,
  ListSeasonsResponse
> {
  constructor(private seasonRepository: ISeasonRepository) {}

  async execute(request: ListSeasonsRequest): Promise<ListSeasonsResponse> {
    const seasons = await this.seasonRepository.search(request.query || {});

    return {
      seasons,
      total: seasons.length,
    };
  }
}
