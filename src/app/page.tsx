import { ListTVShowsUseCase } from "@/application";
import {
  CreateTVShowUseCase,
  DeleteTVShowUseCase,
  UpdateTVShowUseCase,
} from "@/application";
import { getHttpClient, TVShowRepository } from "@/infrastructure";
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

async function createTVShow(formData: FormData) {
  'use server';

  const name = String(formData.get('name') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const genre = String(formData.get('genre') || '').trim();
  const releaseYearRaw = String(formData.get('releaseYear') || '').trim();

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

  revalidatePath('/');
}

async function updateTVShow(formData: FormData) {
  'use server';

  const key = String(formData.get('key') || '').trim();
  const name = String(formData.get('name') || '').trim();
  const description = String(formData.get('description') || '').trim();

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

  revalidatePath('/');
}

async function deleteTVShow(formData: FormData) {
  'use server';

  const key = String(formData.get('key') || '').trim();
  if (!key) {
    return;
  }

  const repository = new TVShowRepository(getHttpClient());
  const useCase = new DeleteTVShowUseCase(repository);

  await useCase.execute({ key });
  revalidatePath('/');
}
export default async function HomePage() {
  const tvShows = await loadTVShows();

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
            <input name="releaseYear" placeholder="Ano" type="number" min="1900" max="2100" />
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
                <p>{show.description || 'Sem descrição'}</p>
                <div className={styles.meta}>
                  <span>{show.genre || "Gênero não informado"}</span>
                  <span>{show.releaseYear || "Ano não informado"}</span>
                </div>

                <form action={updateTVShow} className={styles.inlineForm}>
                  <input type="hidden" name="key" value={show.key} />
                  <input name="name" defaultValue={show.name} placeholder="Nome" />
                  <input
                    name="description"
                    defaultValue={show.description || ''}
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
    </main>
  );
}
