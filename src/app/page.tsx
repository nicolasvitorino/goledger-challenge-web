import {
  AddToWatchlistUseCase,
  CreateEpisodeUseCase,
  CreateSeasonUseCase,
  CreateTVShowUseCase,
  DeleteEpisodeUseCase,
  DeleteSeasonUseCase,
  DeleteTVShowUseCase,
  DeleteWatchlistUseCase,
  ListEpisodesUseCase,
  ListSeasonsUseCase,
  UpdateTVShowUseCase,
  ListTVShowsUseCase,
  ListWatchlistsUseCase,
  UpdateEpisodeUseCase,
  UpdateSeasonUseCase,
  UpdateWatchlistUseCase,
} from "@/application";
import {
  EpisodeRepository,
  getHttpClient,
  SeasonRepository,
  TVShowRepository,
  WatchlistRepository,
} from "@/infrastructure";
import { revalidatePath } from "next/cache";
import styles from "./page.module.css";

async function loadTVShows() {
  const repository = new TVShowRepository(getHttpClient());
  const useCase = new ListTVShowsUseCase(repository);

  try {
    const result = await useCase.execute({});
    return result.tvShows;
  } catch {
    return [];
  }
}

async function loadSeasons() {
  const repository = new SeasonRepository(getHttpClient());
  const useCase = new ListSeasonsUseCase(repository);

  try {
    const result = await useCase.execute({});
    return result.seasons;
  } catch {
    return [];
  }
}

async function loadEpisodes() {
  const repository = new EpisodeRepository(getHttpClient());
  const useCase = new ListEpisodesUseCase(repository);

  try {
    const result = await useCase.execute({});
    return result.episodes;
  } catch {
    return [];
  }
}

async function loadWatchlists() {
  const repository = new WatchlistRepository(getHttpClient());
  const useCase = new ListWatchlistsUseCase(repository);

  try {
    const result = await useCase.execute({});
    return result.watchlists;
  } catch {
    return [];
  }
}

async function createTVShow(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const genre = String(formData.get("genre") || "").trim();
  const releaseYearRaw = String(formData.get("releaseYear") || "").trim();

  if (!name) {
    return;
  }

  const repository = new TVShowRepository(getHttpClient());
  const useCase = new CreateTVShowUseCase(repository);

  const key = `tvshow-${Date.now()}`;
  const releaseYear = releaseYearRaw ? Number(releaseYearRaw) : undefined;

  await useCase.execute({
    key,
    name,
    description: description || undefined,
    genre: genre || undefined,
    releaseYear,
  });

  revalidatePath("/");
}

async function updateTVShow(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!key) {
    return;
  }

  const repository = new TVShowRepository(getHttpClient());
  const useCase = new UpdateTVShowUseCase(repository);

  await useCase.execute({
    key,
    name: name || undefined,
    description: description || undefined,
  });

  revalidatePath("/");
}

async function deleteTVShow(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  if (!key) {
    return;
  }

  const repository = new TVShowRepository(getHttpClient());
  const useCase = new DeleteTVShowUseCase(repository);

  await useCase.execute({ key });
  revalidatePath("/");
}

async function createSeason(formData: FormData) {
  "use server";

  const tvShowKey = String(formData.get("tvShowKey") || "").trim();
  const seasonNumber = Number(String(formData.get("seasonNumber") || "0"));
  const title = String(formData.get("title") || "").trim();

  if (!tvShowKey || seasonNumber < 1) {
    return;
  }

  const repository = new SeasonRepository(getHttpClient());
  const useCase = new CreateSeasonUseCase(repository);

  await useCase.execute({
    key: `season-${Date.now()}`,
    tvShowKey,
    seasonNumber,
    title: title || undefined,
  });

  revalidatePath("/");
}

async function updateSeason(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  const title = String(formData.get("title") || "").trim();

  if (!key) {
    return;
  }

  const repository = new SeasonRepository(getHttpClient());
  const useCase = new UpdateSeasonUseCase(repository);

  await useCase.execute({ key, title: title || undefined });
  revalidatePath("/");
}

async function deleteSeason(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  if (!key) {
    return;
  }

  const repository = new SeasonRepository(getHttpClient());
  const useCase = new DeleteSeasonUseCase(repository);

  await useCase.execute({ key });
  revalidatePath("/");
}

async function createEpisode(formData: FormData) {
  "use server";

  const seasonKey = String(formData.get("seasonKey") || "").trim();
  const tvShowKey = String(formData.get("tvShowKey") || "").trim();
  const episodeNumber = Number(String(formData.get("episodeNumber") || "0"));
  const title = String(formData.get("title") || "").trim();

  if (!seasonKey || !tvShowKey || !title || episodeNumber < 1) {
    return;
  }

  const repository = new EpisodeRepository(getHttpClient());
  const useCase = new CreateEpisodeUseCase(repository);

  await useCase.execute({
    key: `episode-${Date.now()}`,
    seasonKey,
    tvShowKey,
    episodeNumber,
    title,
  });

  revalidatePath("/");
}

async function updateEpisode(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  const title = String(formData.get("title") || "").trim();

  if (!key) {
    return;
  }

  const repository = new EpisodeRepository(getHttpClient());
  const useCase = new UpdateEpisodeUseCase(repository);

  await useCase.execute({ key, title: title || undefined });
  revalidatePath("/");
}

async function deleteEpisode(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  if (!key) {
    return;
  }

  const repository = new EpisodeRepository(getHttpClient());
  const useCase = new DeleteEpisodeUseCase(repository);

  await useCase.execute({ key });
  revalidatePath("/");
}

async function createWatchlist(formData: FormData) {
  "use server";

  const userId = String(formData.get("userId") || "").trim();
  const tvShowKey = String(formData.get("tvShowKey") || "").trim();
  const status = String(formData.get("status") || "plan-to-watch").trim() as
    | "watching"
    | "completed"
    | "plan-to-watch"
    | "dropped";

  if (!userId || !tvShowKey) {
    return;
  }

  const repository = new WatchlistRepository(getHttpClient());
  const useCase = new AddToWatchlistUseCase(repository);

  await useCase.execute({
    key: `watchlist-${Date.now()}`,
    userId,
    tvShowKey,
    status,
  });

  revalidatePath("/");
}

async function updateWatchlist(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  const status = String(formData.get("status") || "").trim() as
    | "watching"
    | "completed"
    | "plan-to-watch"
    | "dropped";

  if (!key) {
    return;
  }

  const repository = new WatchlistRepository(getHttpClient());
  const useCase = new UpdateWatchlistUseCase(repository);

  await useCase.execute({ key, status });
  revalidatePath("/");
}

async function deleteWatchlist(formData: FormData) {
  "use server";

  const key = String(formData.get("key") || "").trim();
  if (!key) {
    return;
  }

  const repository = new WatchlistRepository(getHttpClient());
  const useCase = new DeleteWatchlistUseCase(repository);

  await useCase.execute({ key });
  revalidatePath("/");
}
export default async function HomePage() {
  const tvShows = await loadTVShows();
  const seasons = await loadSeasons();
  const episodes = await loadEpisodes();
  const watchlists = await loadWatchlists();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>GoLedger TV Catalog</h1>
        <p>Catálogo de séries com arquitetura limpa</p>
      </header>

      <section className={styles.content}>
        <form action={createTVShow} className={styles.createForm}>
          <h2>Novo TV Show</h2>
          <div className={styles.formRow}>
            <input name="name" placeholder="Nome" required />
            <input name="genre" placeholder="Gênero" />
            <input
              name="releaseYear"
              placeholder="Ano"
              type="number"
              min="1900"
              max="2100"
            />
          </div>
          <textarea name="description" placeholder="Descrição" rows={2} />
          <button type="submit">Criar</button>
        </form>

        <div className={styles.sectionTitleRow}>
          <h2>TV Shows</h2>
          <span>{tvShows.length} itens</span>
        </div>

        {tvShows.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum TV Show encontrado.</p>
            <p>Próximo passo: implementar formulário de criação.</p>
          </div>
        ) : (
          <ul className={styles.grid}>
            {tvShows.map((show) => (
              <li className={styles.card} key={show.key}>
                <h3>{show.name}</h3>
                <p>{show.description || "Sem descrição"}</p>
                <div className={styles.meta}>
                  <span>{show.genre || "Gênero não informado"}</span>
                  <span>{show.releaseYear || "Ano não informado"}</span>
                </div>

                <form action={updateTVShow} className={styles.inlineForm}>
                  <input type="hidden" name="key" value={show.key} />
                  <input
                    name="name"
                    defaultValue={show.name}
                    placeholder="Nome"
                  />
                  <input
                    name="description"
                    defaultValue={show.description || ""}
                    placeholder="Descrição"
                  />
                  <button type="submit">Salvar</button>
                </form>

                <form action={deleteTVShow}>
                  <input type="hidden" name="key" value={show.key} />
                  <button type="submit" className={styles.deleteButton}>
                    Remover
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.content}>
        <form action={createSeason} className={styles.createForm}>
          <h2>Nova Season</h2>
          <div className={styles.formRow}>
            <input name="tvShowKey" placeholder="TV Show Key" required />
            <input
              name="seasonNumber"
              type="number"
              min="1"
              placeholder="Numero"
              required
            />
            <input name="title" placeholder="Titulo" />
          </div>
          <button type="submit">Criar Season</button>
        </form>
        <div className={styles.sectionTitleRow}>
          <h2>Seasons</h2>
          <span>{seasons.length} itens</span>
        </div>
        <ul className={styles.grid}>
          {seasons.map((season) => (
            <li className={styles.card} key={season.key}>
              <h3>{season.title || `Season ${season.seasonNumber}`}</h3>
              <p>TV Show: {season.tvShowKey}</p>
              <form action={updateSeason} className={styles.inlineForm}>
                <input type="hidden" name="key" value={season.key} />
                <input
                  name="title"
                  defaultValue={season.title || ""}
                  placeholder="Titulo"
                />
                <button type="submit">Salvar</button>
              </form>
              <form action={deleteSeason}>
                <input type="hidden" name="key" value={season.key} />
                <button type="submit" className={styles.deleteButton}>
                  Remover
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.content}>
        <form action={createEpisode} className={styles.createForm}>
          <h2>Novo Episode</h2>
          <div className={styles.formRow}>
            <input name="tvShowKey" placeholder="TV Show Key" required />
            <input name="seasonKey" placeholder="Season Key" required />
            <input
              name="episodeNumber"
              type="number"
              min="1"
              placeholder="Numero"
              required
            />
          </div>
          <input name="title" placeholder="Titulo" required />
          <button type="submit">Criar Episode</button>
        </form>
        <div className={styles.sectionTitleRow}>
          <h2>Episodes</h2>
          <span>{episodes.length} itens</span>
        </div>
        <ul className={styles.grid}>
          {episodes.map((episode) => (
            <li className={styles.card} key={episode.key}>
              <h3>{episode.title}</h3>
              <p>
                TV: {episode.tvShowKey} | Season: {episode.seasonKey} | Ep{" "}
                {episode.episodeNumber}
              </p>
              <form action={updateEpisode} className={styles.inlineForm}>
                <input type="hidden" name="key" value={episode.key} />
                <input
                  name="title"
                  defaultValue={episode.title}
                  placeholder="Titulo"
                />
                <button type="submit">Salvar</button>
              </form>
              <form action={deleteEpisode}>
                <input type="hidden" name="key" value={episode.key} />
                <button type="submit" className={styles.deleteButton}>
                  Remover
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.content}>
        <form action={createWatchlist} className={styles.createForm}>
          <h2>Nova Watchlist</h2>
          <div className={styles.formRow}>
            <input name="userId" placeholder="User ID" required />
            <input name="tvShowKey" placeholder="TV Show Key" required />
            <select name="status" defaultValue="plan-to-watch">
              <option value="plan-to-watch">plan-to-watch</option>
              <option value="watching">watching</option>
              <option value="completed">completed</option>
              <option value="dropped">dropped</option>
            </select>
          </div>
          <button type="submit">Criar Watchlist</button>
        </form>
        <div className={styles.sectionTitleRow}>
          <h2>Watchlists</h2>
          <span>{watchlists.length} itens</span>
        </div>
        <ul className={styles.grid}>
          {watchlists.map((watchlist) => (
            <li className={styles.card} key={watchlist.key}>
              <h3>{watchlist.userId}</h3>
              <p>TV Show: {watchlist.tvShowKey}</p>
              <p>Status: {watchlist.status}</p>
              <form action={updateWatchlist} className={styles.inlineForm}>
                <input type="hidden" name="key" value={watchlist.key} />
                <select name="status" defaultValue={watchlist.status}>
                  <option value="plan-to-watch">plan-to-watch</option>
                  <option value="watching">watching</option>
                  <option value="completed">completed</option>
                  <option value="dropped">dropped</option>
                </select>
                <button type="submit">Salvar</button>
              </form>
              <form action={deleteWatchlist}>
                <input type="hidden" name="key" value={watchlist.key} />
                <button type="submit" className={styles.deleteButton}>
                  Remover
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
