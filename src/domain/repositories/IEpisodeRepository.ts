/**
 * Contrato para operações de repositório de Episodes
 */
import { Episode } from "../entities/Episode";

export interface IEpisodeRepository {
  /**
   * Busca um Episode pelo ID
   */
  findById(key: string): Promise<Episode | null>;

  /**
   * Lista todos os Episodes de uma Season
   */
  findBySeasonKey(seasonKey: string): Promise<Episode[]>;

  /**
   * Lista todos os Episodes de um TVShow
   */
  findByTVShowKey(tvShowKey: string): Promise<Episode[]>;

  /**
   * Busca com critérios customizados
   */
  search(query: Record<string, unknown>): Promise<Episode[]>;

  /**
   * Cria um novo Episode
   */
  create(episode: Episode): Promise<Episode>;

  /**
   * Atualiza um Episode existente
   */
  update(key: string, episode: Partial<Episode>): Promise<Episode>;

  /**
   * Deleta um Episode
   */
  delete(key: string): Promise<boolean>;
}
