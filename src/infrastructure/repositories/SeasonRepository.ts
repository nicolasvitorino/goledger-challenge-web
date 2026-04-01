/**
 * Implementação do Repository para Season
 */
import { Season, ISeasonRepository } from "@domain";
import { HttpClient } from "../http/HttpClient";

export class SeasonRepository implements ISeasonRepository {
  private assetType = "seasons";

  constructor(private httpClient: HttpClient) {}

  async findById(key: string): Promise<Season | null> {
    try {
      const response = await this.httpClient.readAsset(this.assetType, key);
      if (!response || typeof response !== "object") return null;

      const data = response as Record<string, unknown>;
      return new Season({
        key: data.key as string,
        tvShowKey: data.tvShowKey as string,
        seasonNumber: data.seasonNumber as number,
        title: data.title as string | undefined,
        description: data.description as string | undefined,
        releaseYear: data.releaseYear as number | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error finding Season by ID:", error);
      return null;
    }
  }

  async findByTVShowKey(tvShowKey: string): Promise<Season[]> {
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
          new Season({
            key: item.key as string,
            tvShowKey: item.tvShowKey as string,
            seasonNumber: item.seasonNumber as number,
            title: item.title as string | undefined,
            description: item.description as string | undefined,
            releaseYear: item.releaseYear as number | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error finding Seasons by TVShow:", error);
      return [];
    }
  }

  async search(query: Record<string, unknown>): Promise<Season[]> {
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
          new Season({
            key: item.key as string,
            tvShowKey: item.tvShowKey as string,
            seasonNumber: item.seasonNumber as number,
            title: item.title as string | undefined,
            description: item.description as string | undefined,
            releaseYear: item.releaseYear as number | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error searching Seasons:", error);
      return [];
    }
  }

  async create(season: Season): Promise<Season> {
    try {
      const response = await this.httpClient.createAsset(this.assetType, {
        key: season.key,
        tvShowKey: season.tvShowKey,
        seasonNumber: season.seasonNumber,
        title: season.title,
        description: season.description,
        releaseYear: season.releaseYear,
      });

      if (!response || typeof response !== "object")
        throw new Error("Invalid response");

      const data = response as Record<string, unknown>;
      return new Season({
        key: (data.key as string) || season.key,
        tvShowKey: (data.tvShowKey as string) || season.tvShowKey,
        seasonNumber: (data.seasonNumber as number) || season.seasonNumber,
        title: (data.title as string) || season.title,
        description: (data.description as string) || season.description,
        releaseYear: (data.releaseYear as number) || season.releaseYear,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error creating Season:", error);
      throw error;
    }
  }

  async update(key: string, season: Partial<Season>): Promise<Season> {
    try {
      const response = await this.httpClient.updateAsset(this.assetType, key, {
        ...(season.title !== undefined && { title: season.title }),
        ...(season.description !== undefined && {
          description: season.description,
        }),
        ...(season.releaseYear !== undefined && {
          releaseYear: season.releaseYear,
        }),
        ...(season.seasonNumber !== undefined && {
          seasonNumber: season.seasonNumber,
        }),
      });

      if (!response || typeof response !== "object")
        throw new Error("Invalid response");

      const data = response as Record<string, unknown>;
      return new Season({
        key: (data.key as string) || key,
        tvShowKey: data.tvShowKey as string,
        seasonNumber: data.seasonNumber as number,
        title: data.title as string | undefined,
        description: data.description as string | undefined,
        releaseYear: data.releaseYear as number | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error updating Season:", error);
      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.httpClient.deleteAsset(this.assetType, key);
      return true;
    } catch (error) {
      console.error("Error deleting Season:", error);
      return false;
    }
  }
}
