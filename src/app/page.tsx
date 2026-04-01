import { ListTVShowsUseCase } from "@/application";
import { getHttpClient, TVShowRepository } from "@/infrastructure";
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

export default async function HomePage() {
  const tvShows = await loadTVShows();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>GoLedger TV Catalog</h1>
        <p>Catálogo de séries com arquitetura limpa</p>
      </header>

      <section className={styles.content}>
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
