/**
 * Entity: Season
 * Representa uma temporada de um programa de TV.
 */
export interface ISeason {
  "@assetType": "seasons";
  key: string;
  tvShowKey: string;
  seasonNumber: number;
  title?: string;
  description?: string;
  releaseYear?: number;
  "@timestamp"?: string;
}

export class Season implements ISeason {
  "@assetType": "seasons" = "seasons";
  key: string;
  tvShowKey: string;
  seasonNumber: number;
  title?: string;
  description?: string;
  releaseYear?: number;
  "@timestamp"?: string;

  constructor(data: Omit<ISeason, "@assetType">) {
    this.key = data.key;
    this.tvShowKey = data.tvShowKey;
    this.seasonNumber = data.seasonNumber;
    this.title = data.title;
    this.description = data.description;
    this.releaseYear = data.releaseYear;
    this["@timestamp"] = data["@timestamp"];

    this.validate();
  }

  private validate(): void {
    if (!this.key || this.key.trim().length === 0) {
      throw new Error("Season key é obrigatório");
    }
    if (!this.tvShowKey || this.tvShowKey.trim().length === 0) {
      throw new Error("Season tvShowKey é obrigatório");
    }
    if (this.seasonNumber < 1) {
      throw new Error("Season seasonNumber deve ser maior que 0");
    }
  }

  isValid(): boolean {
    try {
      this.validate();
      return true;
    } catch {
      return false;
    }
  }
}
