/**
 * Contrato para operações de repositório de Seasons
 */
import { Season } from '../entities/Season';

export interface ISeasonRepository {
  /**
   * Busca uma Season pelo ID
   */
  findById(key: string): Promise<Season | null>;

  /**
   * Lista todas as Seasons de um TVShow
   */
  findByTVShowKey(tvShowKey: string): Promise<Season[]>;

  /**
   * Busca com critérios customizados
   */
  search(query: Record<string, unknown>): Promise<Season[]>;

  /**
   * Cria uma nova Season
   */
  create(season: Season): Promise<Season>;

  /**
   * Atualiza uma Season existente
   */
  update(key: string, season: Partial<Season>): Promise<Season>;

  /**
   * Deleta uma Season
   */
  delete(key: string): Promise<boolean>;
}
