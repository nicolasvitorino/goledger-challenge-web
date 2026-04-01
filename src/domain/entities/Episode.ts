/**
 * Entity: Episode
 * Representa um episódio de uma temporada de TV.
 */
export interface IEpisode {
  '@assetType': 'episodes';
  key: string;
  seasonKey: string;
  tvShowKey: string;
  episodeNumber: number;
  title: string;
  description?: string;
  duration?: number;
  airDate?: string;
  rating?: number;
  '@timestamp'?: string;
}

export class Episode implements IEpisode {
  '@assetType': 'episodes' = 'episodes';
  key: string;
  seasonKey: string;
  tvShowKey: string;
  episodeNumber: number;
  title: string;
  description?: string;
  duration?: number;
  airDate?: string;
  rating?: number;
  '@timestamp'?: string;

  constructor(data: Omit<IEpisode, '@assetType'>) {
    this.key = data.key;
    this.seasonKey = data.seasonKey;
    this.tvShowKey = data.tvShowKey;
    this.episodeNumber = data.episodeNumber;
    this.title = data.title;
    this.description = data.description;
    this.duration = data.duration;
    this.airDate = data.airDate;
    this.rating = data.rating;
    this['@timestamp'] = data['@timestamp'];
    
    this.validate();
  }

  private validate(): void {
    if (!this.key || this.key.trim().length === 0) {
      throw new Error('Episode key é obrigatório');
    }
    if (!this.seasonKey || this.seasonKey.trim().length === 0) {
      throw new Error('Episode seasonKey é obrigatório');
    }
    if (!this.tvShowKey || this.tvShowKey.trim().length === 0) {
      throw new Error('Episode tvShowKey é obrigatório');
    }
    if (this.episodeNumber < 1) {
      throw new Error('Episode episodeNumber deve ser maior que 0');
    }
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('Episode title é obrigatório');
    }
    if (this.rating !== undefined && (this.rating < 0 || this.rating > 10)) {
      throw new Error('Episode rating deve estar entre 0 e 10');
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
