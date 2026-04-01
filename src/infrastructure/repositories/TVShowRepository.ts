/**
 * Implementação do Repository para TVShow
 * Comunica com a API GoLedger através do HttpClient
 */
import { TVShow, ITVShowRepository } from "@domain";
import { HttpClient } from "../http/HttpClient";

export class TVShowRepository implements ITVShowRepository {
  private assetType = "tvShows";

  constructor(private httpClient: HttpClient) {}

  async findById(key: string): Promise<TVShow | null> {
    try {
      const response = await this.httpClient.readAsset(this.assetType, key);

      if (!response || typeof response !== "object") {
        return null;
      }

      const data = response as Record<string, unknown>;
      return new TVShow({
        key: data.key as string,
        name: data.name as string,
        description: data.description as string | undefined,
        genre: data.genre as string | undefined,
        releaseYear: data.releaseYear as number | undefined,
        posterUrl: data.posterUrl as string | undefined,
        rating: data.rating as number | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error finding TVShow by ID:", error);
      return null;
    }
  }

  async findAll(filters?: Record<string, unknown>): Promise<TVShow[]> {
    try {
      const response = await this.httpClient.search({
        selector: {
          "@assetType": this.assetType,
          ...(filters || {}),
        },
      });

      if (!response || !Array.isArray(response)) {
        return [];
      }

      return (response as Record<string, unknown>[]).map(
        (item) =>
          new TVShow({
            key: item.key as string,
            name: item.name as string,
            description: item.description as string | undefined,
            genre: item.genre as string | undefined,
            releaseYear: item.releaseYear as number | undefined,
            posterUrl: item.posterUrl as string | undefined,
            rating: item.rating as number | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error finding all TVShows:", error);
      return [];
    }
  }

  async search(query: Record<string, unknown>): Promise<TVShow[]> {
    try {
      const response = await this.httpClient.search({
        selector: {
          "@assetType": this.assetType,
          ...query,
        },
      });

      if (!response || !Array.isArray(response)) {
        return [];
      }

      return (response as Record<string, unknown>[]).map(
        (item) =>
          new TVShow({
            key: item.key as string,
            name: item.name as string,
            description: item.description as string | undefined,
            genre: item.genre as string | undefined,
            releaseYear: item.releaseYear as number | undefined,
            posterUrl: item.posterUrl as string | undefined,
            rating: item.rating as number | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error searching TVShows:", error);
      return [];
    }
  }

  async create(tvShow: TVShow): Promise<TVShow> {
    try {
      const response = await this.httpClient.createAsset(this.assetType, {
        key: tvShow.key,
        name: tvShow.name,
        description: tvShow.description,
        genre: tvShow.genre,
        releaseYear: tvShow.releaseYear,
        posterUrl: tvShow.posterUrl,
        rating: tvShow.rating,
      });

      if (!response || typeof response !== "object") {
        throw new Error("Invalid response from API");
      }

      const data = response as Record<string, unknown>;
      return new TVShow({
        key: (data.key as string) || tvShow.key,
        name: (data.name as string) || tvShow.name,
        description: (data.description as string) || tvShow.description,
        genre: (data.genre as string) || tvShow.genre,
        releaseYear: (data.releaseYear as number) || tvShow.releaseYear,
        posterUrl: (data.posterUrl as string) || tvShow.posterUrl,
        rating: (data.rating as number) || tvShow.rating,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error creating TVShow:", error);
      throw error;
    }
  }

  async update(key: string, tvShow: Partial<TVShow>): Promise<TVShow> {
    try {
      const response = await this.httpClient.updateAsset(this.assetType, key, {
        ...(tvShow.name && { name: tvShow.name }),
        ...(tvShow.description !== undefined && {
          description: tvShow.description,
        }),
        ...(tvShow.genre !== undefined && { genre: tvShow.genre }),
        ...(tvShow.releaseYear !== undefined && {
          releaseYear: tvShow.releaseYear,
        }),
        ...(tvShow.posterUrl !== undefined && { posterUrl: tvShow.posterUrl }),
        ...(tvShow.rating !== undefined && { rating: tvShow.rating }),
      });

      if (!response || typeof response !== "object") {
        throw new Error("Invalid response from API");
      }

      const data = response as Record<string, unknown>;
      return new TVShow({
        key: (data.key as string) || key,
        name: data.name as string,
        description: data.description as string | undefined,
        genre: data.genre as string | undefined,
        releaseYear: data.releaseYear as number | undefined,
        posterUrl: data.posterUrl as string | undefined,
        rating: data.rating as number | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error updating TVShow:", error);
      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.httpClient.deleteAsset(this.assetType, key);
      return true;
    } catch (error) {
      console.error("Error deleting TVShow:", error);
      return false;
    }
  }
}
