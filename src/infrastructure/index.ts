/**
 * Exports da camada Infrastructure
 */

// HTTP Client
export { HttpClient, getHttpClient } from "./http/HttpClient";

// Repositories
export { TVShowRepository } from "./repositories/TVShowRepository";
export { SeasonRepository } from "./repositories/SeasonRepository";
export { EpisodeRepository } from "./repositories/EpisodeRepository";
export { WatchlistRepository } from "./repositories/WatchlistRepository";

// Config
export { API_CONFIG, API_ENDPOINTS } from "./config/api.config";
