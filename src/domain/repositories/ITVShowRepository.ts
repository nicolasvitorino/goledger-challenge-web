/**
 * Contrato para operações de repositório de TVShows
 * Esta interface será implementada na camada de Infrastructure
 */
import { TVShow } from "../entities/TVShow";

export interface ITVShowRepository {
  /**
   * Busca um TVShow pelo ID
   */
  findById(key: string): Promise<TVShow | null>;

  /**
   * Lista todos os TVShows com filtros opcionais
   */
  findAll(filters?: Record<string, unknown>): Promise<TVShow[]>;

  /**
   * Busca TVShows com base em critérios de busca
   */
  search(query: Record<string, unknown>): Promise<TVShow[]>;

  /**
   * Cria um novo TVShow
   */
  create(tvShow: TVShow): Promise<TVShow>;

  /**
   * Atualiza um TVShow existente
   */
  update(key: string, tvShow: Partial<TVShow>): Promise<TVShow>;

  /**
   * Deleta um TVShow
   */
  delete(key: string): Promise<boolean>;
}
