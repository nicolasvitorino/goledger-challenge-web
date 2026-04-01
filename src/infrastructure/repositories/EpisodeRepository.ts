/**
 * Implementação do Repository para Episode
 */
import { Episode, IEpisodeRepository } from "@/domain";
import { HttpClient } from "../http/HttpClient";

export class EpisodeRepository implements IEpisodeRepository {
  private assetType = "episodes";

  constructor(private httpClient: HttpClient) {}

  async findById(key: string): Promise<Episode | null> {
    try {
      const response = await this.httpClient.readAsset(this.assetType, key);
      if (!response || typeof response !== "object") return null;

      const data = response as Record<string, unknown>;
      return new Episode({
        key: data.key as string,
        seasonKey: data.seasonKey as string,
        tvShowKey: data.tvShowKey as string,
        episodeNumber: data.episodeNumber as number,
        title: data.title as string,
        description: data.description as string | undefined,
        duration: data.duration as number | undefined,
        airDate: data.airDate as string | undefined,
        rating: data.rating as number | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error finding Episode by ID:", error);
      return null;
    }
  }

  async findBySeasonKey(seasonKey: string): Promise<Episode[]> {
    try {
      const response = await this.httpClient.search({
        selector: {
          "@assetType": this.assetType,
          seasonKey,
        },
      });

      if (!response || !Array.isArray(response)) return [];

      return (response as Record<string, unknown>[]).map(
        (item) =>
          new Episode({
            key: item.key as string,
            seasonKey: item.seasonKey as string,
            tvShowKey: item.tvShowKey as string,
            episodeNumber: item.episodeNumber as number,
            title: item.title as string,
            description: item.description as string | undefined,
            duration: item.duration as number | undefined,
            airDate: item.airDate as string | undefined,
            rating: item.rating as number | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error finding Episodes by Season:", error);
      return [];
    }
  }

  async findByTVShowKey(tvShowKey: string): Promise<Episode[]> {
    try {
      const response = await this.httpClient.search({
        selector: {
          "@assetType": this.assetType,
          tvShowKey,
        },
      });

      if (!response || !Array.isArray(response)) return [];

      return (response as Record<string, unknown>[]).map(
        (item) =>
          new Episode({
            key: item.key as string,
            seasonKey: item.seasonKey as string,
            tvShowKey: item.tvShowKey as string,
            episodeNumber: item.episodeNumber as number,
            title: item.title as string,
            description: item.description as string | undefined,
            duration: item.duration as number | undefined,
            airDate: item.airDate as string | undefined,
            rating: item.rating as number | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error finding Episodes by TVShow:", error);
      return [];
    }
  }

  async search(query: Record<string, unknown>): Promise<Episode[]> {
    try {
      const response = await this.httpClient.search({
        selector: {
          "@assetType": this.assetType,
          ...query,
        },
      });

      if (!response || !Array.isArray(response)) return [];

      return (response as Record<string, unknown>[]).map(
        (item) =>
          new Episode({
            key: item.key as string,
            seasonKey: item.seasonKey as string,
            tvShowKey: item.tvShowKey as string,
            episodeNumber: item.episodeNumber as number,
            title: item.title as string,
            description: item.description as string | undefined,
            duration: item.duration as number | undefined,
            airDate: item.airDate as string | undefined,
            rating: item.rating as number | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error searching Episodes:", error);
      return [];
    }
  }

  async create(episode: Episode): Promise<Episode> {
    try {
      const response = await this.httpClient.createAsset(this.assetType, {
        key: episode.key,
        seasonKey: episode.seasonKey,
        tvShowKey: episode.tvShowKey,
        episodeNumber: episode.episodeNumber,
        title: episode.title,
        description: episode.description,
        duration: episode.duration,
        airDate: episode.airDate,
        rating: episode.rating,
      });

      if (!response || typeof response !== "object")
        throw new Error("Invalid response");

      const data = response as Record<string, unknown>;
      return new Episode({
        key: (data.key as string) || episode.key,
        seasonKey: (data.seasonKey as string) || episode.seasonKey,
        tvShowKey: (data.tvShowKey as string) || episode.tvShowKey,
        episodeNumber: (data.episodeNumber as number) || episode.episodeNumber,
        title: (data.title as string) || episode.title,
        description: (data.description as string) || episode.description,
        duration: (data.duration as number) || episode.duration,
        airDate: (data.airDate as string) || episode.airDate,
        rating: (data.rating as number) || episode.rating,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error creating Episode:", error);
      throw error;
    }
  }

  async update(key: string, episode: Partial<Episode>): Promise<Episode> {
    try {
      const response = await this.httpClient.updateAsset(this.assetType, key, {
        ...(episode.title !== undefined && { title: episode.title }),
        ...(episode.description !== undefined && {
          description: episode.description,
        }),
        ...(episode.duration !== undefined && { duration: episode.duration }),
        ...(episode.airDate !== undefined && { airDate: episode.airDate }),
        ...(episode.rating !== undefined && { rating: episode.rating }),
      });

      if (!response || typeof response !== "object")
        throw new Error("Invalid response");

      const data = response as Record<string, unknown>;
      return new Episode({
        key: (data.key as string) || key,
        seasonKey: data.seasonKey as string,
        tvShowKey: data.tvShowKey as string,
        episodeNumber: data.episodeNumber as number,
        title: data.title as string,
        description: data.description as string | undefined,
        duration: data.duration as number | undefined,
        airDate: data.airDate as string | undefined,
        rating: data.rating as number | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error updating Episode:", error);
      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.httpClient.deleteAsset(this.assetType, key);
      return true;
    } catch (error) {
      console.error("Error deleting Episode:", error);
      return false;
    }
  }
}
