/**
 * Entity: Watchlist
 * Representa a lista de programas que um usuário quer assistir.
 */
export interface IWatchlist {
  '@assetType': 'watchlists';
  key: string;
  userId: string;
  tvShowKey: string;
  status: 'watching' | 'completed' | 'plan-to-watch' | 'dropped';
  currentSeason?: number;
  currentEpisode?: number;
  rating?: number;
  notes?: string;
  addedAt?: string;
  '@timestamp'?: string;
}

export class Watchlist implements IWatchlist {
  '@assetType': 'watchlists' = 'watchlists';
  key: string;
  userId: string;
  tvShowKey: string;
  status: 'watching' | 'completed' | 'plan-to-watch' | 'dropped';
  currentSeason?: number;
  currentEpisode?: number;
  rating?: number;
  notes?: string;
  addedAt?: string;
  '@timestamp'?: string;

  constructor(data: Omit<IWatchlist, '@assetType'>) {
    this.key = data.key;
    this.userId = data.userId;
    this.tvShowKey = data.tvShowKey;
    this.status = data.status;
    this.currentSeason = data.currentSeason;
    this.currentEpisode = data.currentEpisode;
    this.rating = data.rating;
    this.notes = data.notes;
    this.addedAt = data.addedAt;
    this['@timestamp'] = data['@timestamp'];
    
    this.validate();
  }

  private validate(): void {
    if (!this.key || this.key.trim().length === 0) {
      throw new Error('Watchlist key é obrigatório');
    }
    if (!this.userId || this.userId.trim().length === 0) {
      throw new Error('Watchlist userId é obrigatório');
    }
    if (!this.tvShowKey || this.tvShowKey.trim().length === 0) {
      throw new Error('Watchlist tvShowKey é obrigatório');
    }
    const validStatuses = ['watching', 'completed', 'plan-to-watch', 'dropped'];
    if (!validStatuses.includes(this.status)) {
      throw new Error('Watchlist status deve ser um dos: watching, completed, plan-to-watch, dropped');
    }
    if (this.rating !== undefined && (this.rating < 0 || this.rating > 10)) {
      throw new Error('Watchlist rating deve estar entre 0 e 10');
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

  markAsWatching(): void {
    this.status = 'watching';
  }

  markAsCompleted(): void {
    this.status = 'completed';
  }

  markAsDropped(): void {
    this.status = 'dropped';
  }

  updateProgress(seasonNumber: number, episodeNumber: number): void {
    this.currentSeason = seasonNumber;
    this.currentEpisode = episodeNumber;
  }
}
