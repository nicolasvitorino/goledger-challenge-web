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
  ListSeasonsUseCase,
  UpdateSeasonUseCase,
  DeleteSeasonUseCase,
  type CreateSeasonRequest,
  type CreateSeasonResponse,
  type ListSeasonsByTVShowRequest,
  type ListSeasonsByTVShowResponse,
  type ListSeasonsRequest,
  type ListSeasonsResponse,
  type UpdateSeasonRequest,
  type UpdateSeasonResponse,
  type DeleteSeasonRequest,
  type DeleteSeasonResponse,
} from "./use-cases/season";

// Episode Use Cases
export {
  CreateEpisodeUseCase,
  ListEpisodesBySeasonUseCase,
  ListEpisodesUseCase,
  UpdateEpisodeUseCase,
  DeleteEpisodeUseCase,
  type CreateEpisodeRequest,
  type CreateEpisodeResponse,
  type ListEpisodesBySeasonRequest,
  type ListEpisodesBySeasonResponse,
  type ListEpisodesRequest,
  type ListEpisodesResponse,
  type UpdateEpisodeRequest,
  type UpdateEpisodeResponse,
  type DeleteEpisodeRequest,
  type DeleteEpisodeResponse,
} from "./use-cases/episode";

// Watchlist Use Cases
export {
  AddToWatchlistUseCase,
  ListUserWatchlistUseCase,
  ListWatchlistsUseCase,
  UpdateWatchlistUseCase,
  DeleteWatchlistUseCase,
  type AddToWatchlistRequest,
  type AddToWatchlistResponse,
  type ListUserWatchlistRequest,
  type ListUserWatchlistResponse,
  type ListWatchlistsRequest,
  type ListWatchlistsResponse,
  type UpdateWatchlistRequest,
  type UpdateWatchlistResponse,
  type DeleteWatchlistRequest,
  type DeleteWatchlistResponse,
} from "./use-cases/watchlist";
