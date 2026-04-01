import { ISeasonRepository } from "@/domain";
import { IUseCase } from "../IUseCase";

export interface DeleteSeasonRequest {
  key: string;
}

export interface DeleteSeasonResponse {
  success: boolean;
}

export class DeleteSeasonUseCase implements IUseCase<
  DeleteSeasonRequest,
  DeleteSeasonResponse
> {
  constructor(private seasonRepository: ISeasonRepository) {}

  async execute(request: DeleteSeasonRequest): Promise<DeleteSeasonResponse> {
    if (!request.key || request.key.trim().length === 0) {
      throw new Error("Season key e obrigatorio");
    }

    const existing = await this.seasonRepository.findById(request.key);
    if (!existing) {
      throw new Error("Season nao encontrada");
    }

    const success = await this.seasonRepository.delete(request.key);
    if (!success) {
      throw new Error("Falha ao remover season");
    }

    return { success: true };
  }
}
