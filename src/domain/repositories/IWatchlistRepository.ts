/**
 * Contrato para operações de repositório de Watchlists
 */
import { Watchlist } from '../entities/Watchlist';

export interface IWatchlistRepository {
  /**
   * Busca uma Watchlist pelo ID
   */
  findById(key: string): Promise<Watchlist | null>;

  /**
   * Lista todas as Watchlists de um usuário
   */
  findByUserId(userId: string): Promise<Watchlist[]>;

  /**
   * Busca a watchlist de um usuário para um TVShow específico
   */
  findByUserAndTVShow(userId: string, tvShowKey: string): Promise<Watchlist | null>;

  /**
   * Busca com critérios customizados
   */
  search(query: Record<string, unknown>): Promise<Watchlist[]>;

  /**
   * Cria uma nova Watchlist
   */
  create(watchlist: Watchlist): Promise<Watchlist>;

  /**
   * Atualiza uma Watchlist existente
   */
  update(key: string, watchlist: Partial<Watchlist>): Promise<Watchlist>;

  /**
   * Deleta uma Watchlist
   */
  delete(key: string): Promise<boolean>;
}
