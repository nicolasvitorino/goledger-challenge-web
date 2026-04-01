/**
 * Exports da camada Application
 */

// Use Cases Interface
export { type IUseCase } from "./use-cases/IUseCase";

// TVShow Use Cases
export {
  GetTVShowByIdUseCase,
  CreateTVShowUseCase,
  UpdateTVShowUseCase,
  DeleteTVShowUseCase,
  ListTVShowsUseCase,
  SearchTVShowsUseCase,
  type GetTVShowByIdRequest,
  type GetTVShowByIdResponse,
  type CreateTVShowRequest,
  type CreateTVShowResponse,
  type UpdateTVShowRequest,
  type UpdateTVShowResponse,
  type DeleteTVShowRequest,
  type DeleteTVShowResponse,
  type ListTVShowsRequest,
  type ListTVShowsResponse,
  type SearchTVShowsRequest,
  type SearchTVShowsResponse,
} from "./use-cases/tvshow";

// Season Use Cases
export {
  CreateSeasonUseCase,
  ListSeasonsByTVShowUseCase,
  type CreateSeasonRequest,
  type CreateSeasonResponse,
  type ListSeasonsByTVShowRequest,
  type ListSeasonsByTVShowResponse,
} from "./use-cases/season";

// Episode Use Cases
export {
  CreateEpisodeUseCase,
  ListEpisodesBySeasonUseCase,
  type CreateEpisodeRequest,
  type CreateEpisodeResponse,
  type ListEpisodesBySeasonRequest,
  type ListEpisodesBySeasonResponse,
} from "./use-cases/episode";

// Watchlist Use Cases
export {
  AddToWatchlistUseCase,
  ListUserWatchlistUseCase,
  type AddToWatchlistRequest,
  type AddToWatchlistResponse,
  type ListUserWatchlistRequest,
  type ListUserWatchlistResponse,
} from "./use-cases/watchlist";
