/**
 * Implementação do Repository para Watchlist
 */
import { Watchlist, IWatchlistRepository } from "@domain";
import { HttpClient } from "../http/HttpClient";

export class WatchlistRepository implements IWatchlistRepository {
  private assetType = "watchlists";

  constructor(private httpClient: HttpClient) {}

  async findById(key: string): Promise<Watchlist | null> {
    try {
      const response = await this.httpClient.readAsset(this.assetType, key);
      if (!response || typeof response !== "object") return null;

      const data = response as Record<string, unknown>;
      return new Watchlist({
        key: data.key as string,
        userId: data.userId as string,
        tvShowKey: data.tvShowKey as string,
        status: data.status as
          | "watching"
          | "completed"
          | "plan-to-watch"
          | "dropped",
        currentSeason: data.currentSeason as number | undefined,
        currentEpisode: data.currentEpisode as number | undefined,
        rating: data.rating as number | undefined,
        notes: data.notes as string | undefined,
        addedAt: data.addedAt as string | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error finding Watchlist by ID:", error);
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Watchlist[]> {
    try {
      const response = await this.httpClient.search({
        selector: {
          "@assetType": this.assetType,
          userId,
        },
      });

      if (!response || !Array.isArray(response)) return [];

      return (response as Record<string, unknown>[]).map(
        (item) =>
          new Watchlist({
            key: item.key as string,
            userId: item.userId as string,
            tvShowKey: item.tvShowKey as string,
            status: item.status as
              | "watching"
              | "completed"
              | "plan-to-watch"
              | "dropped",
            currentSeason: item.currentSeason as number | undefined,
            currentEpisode: item.currentEpisode as number | undefined,
            rating: item.rating as number | undefined,
            notes: item.notes as string | undefined,
            addedAt: item.addedAt as string | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error finding Watchlist by User:", error);
      return [];
    }
  }

  async findByUserAndTVShow(
    userId: string,
    tvShowKey: string,
  ): Promise<Watchlist | null> {
    try {
      const response = await this.httpClient.search({
        selector: {
          "@assetType": this.assetType,
          userId,
          tvShowKey,
        },
      });

      if (!response || !Array.isArray(response) || response.length === 0)
        return null;

      const item = (response as Record<string, unknown>[])[0];
      return new Watchlist({
        key: item.key as string,
        userId: item.userId as string,
        tvShowKey: item.tvShowKey as string,
        status: item.status as
          | "watching"
          | "completed"
          | "plan-to-watch"
          | "dropped",
        currentSeason: item.currentSeason as number | undefined,
        currentEpisode: item.currentEpisode as number | undefined,
        rating: item.rating as number | undefined,
        notes: item.notes as string | undefined,
        addedAt: item.addedAt as string | undefined,
        "@timestamp": item["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error finding Watchlist by User and TVShow:", error);
      return null;
    }
  }

  async search(query: Record<string, unknown>): Promise<Watchlist[]> {
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
          new Watchlist({
            key: item.key as string,
            userId: item.userId as string,
            tvShowKey: item.tvShowKey as string,
            status: item.status as
              | "watching"
              | "completed"
              | "plan-to-watch"
              | "dropped",
            currentSeason: item.currentSeason as number | undefined,
            currentEpisode: item.currentEpisode as number | undefined,
            rating: item.rating as number | undefined,
            notes: item.notes as string | undefined,
            addedAt: item.addedAt as string | undefined,
            "@timestamp": item["@timestamp"] as string | undefined,
          }),
      );
    } catch (error) {
      console.error("Error searching Watchlists:", error);
      return [];
    }
  }

  async create(watchlist: Watchlist): Promise<Watchlist> {
    try {
      const response = await this.httpClient.createAsset(this.assetType, {
        key: watchlist.key,
        userId: watchlist.userId,
        tvShowKey: watchlist.tvShowKey,
        status: watchlist.status,
        currentSeason: watchlist.currentSeason,
        currentEpisode: watchlist.currentEpisode,
        rating: watchlist.rating,
        notes: watchlist.notes,
        addedAt: watchlist.addedAt,
      });

      if (!response || typeof response !== "object")
        throw new Error("Invalid response");

      const data = response as Record<string, unknown>;
      return new Watchlist({
        key: (data.key as string) || watchlist.key,
        userId: (data.userId as string) || watchlist.userId,
        tvShowKey: (data.tvShowKey as string) || watchlist.tvShowKey,
        status:
          (data.status as
            | "watching"
            | "completed"
            | "plan-to-watch"
            | "dropped") || watchlist.status,
        currentSeason:
          (data.currentSeason as number) || watchlist.currentSeason,
        currentEpisode:
          (data.currentEpisode as number) || watchlist.currentEpisode,
        rating: (data.rating as number) || watchlist.rating,
        notes: (data.notes as string) || watchlist.notes,
        addedAt: (data.addedAt as string) || watchlist.addedAt,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error creating Watchlist:", error);
      throw error;
    }
  }

  async update(key: string, watchlist: Partial<Watchlist>): Promise<Watchlist> {
    try {
      const response = await this.httpClient.updateAsset(this.assetType, key, {
        ...(watchlist.status !== undefined && { status: watchlist.status }),
        ...(watchlist.currentSeason !== undefined && {
          currentSeason: watchlist.currentSeason,
        }),
        ...(watchlist.currentEpisode !== undefined && {
          currentEpisode: watchlist.currentEpisode,
        }),
        ...(watchlist.rating !== undefined && { rating: watchlist.rating }),
        ...(watchlist.notes !== undefined && { notes: watchlist.notes }),
      });

      if (!response || typeof response !== "object")
        throw new Error("Invalid response");

      const data = response as Record<string, unknown>;
      return new Watchlist({
        key: (data.key as string) || key,
        userId: data.userId as string,
        tvShowKey: data.tvShowKey as string,
        status: data.status as
          | "watching"
          | "completed"
          | "plan-to-watch"
          | "dropped",
        currentSeason: data.currentSeason as number | undefined,
        currentEpisode: data.currentEpisode as number | undefined,
        rating: data.rating as number | undefined,
        notes: data.notes as string | undefined,
        addedAt: data.addedAt as string | undefined,
        "@timestamp": data["@timestamp"] as string | undefined,
      });
    } catch (error) {
      console.error("Error updating Watchlist:", error);
      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.httpClient.deleteAsset(this.assetType, key);
      return true;
    } catch (error) {
      console.error("Error deleting Watchlist:", error);
      return false;
    }
  }
}
