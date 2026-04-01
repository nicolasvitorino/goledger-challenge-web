/**
 * Exports da camada Domain
 * Entities
 */
export { TVShow, type ITVShow } from './entities/TVShow';
export { Season, type ISeason } from './entities/Season';
export { Episode, type IEpisode } from './entities/Episode';
export { Watchlist, type IWatchlist } from './entities/Watchlist';

/**
 * Repository Interfaces
 */
export { type ITVShowRepository } from './repositories/ITVShowRepository';
export { type ISeasonRepository } from './repositories/ISeasonRepository';
export { type IEpisodeRepository } from './repositories/IEpisodeRepository';
export { type IWatchlistRepository } from './repositories/IWatchlistRepository';
