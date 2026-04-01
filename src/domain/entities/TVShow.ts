/**
 * Entity: TVShow
 * Representa um programa de TV no domínio da aplicação.
 * Contém apenas dados e validações de negócio, sem dependências externas.
 */
export interface ITVShow {
  '@assetType': 'tvShows';
  key: string;
  name: string;
  description?: string;
  genre?: string;
  releaseYear?: number;
  posterUrl?: string;
  rating?: number;
  '@timestamp'?: string;
}

export class TVShow implements ITVShow {
  '@assetType': 'tvShows' = 'tvShows';
  key: string;
  name: string;
  description?: string;
  genre?: string;
  releaseYear?: number;
  posterUrl?: string;
  rating?: number;
  '@timestamp'?: string;

  constructor(data: Omit<ITVShow, '@assetType'>) {
    this.key = data.key;
    this.name = data.name;
    this.description = data.description;
    this.genre = data.genre;
    this.releaseYear = data.releaseYear;
    this.posterUrl = data.posterUrl;
    this.rating = data.rating;
    this['@timestamp'] = data['@timestamp'];
    
    this.validate();
  }

  private validate(): void {
    if (!this.key || this.key.trim().length === 0) {
      throw new Error('TVShow key é obrigatório');
    }
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('TVShow name é obrigatório');
    }
    if (this.rating !== undefined && (this.rating < 0 || this.rating > 10)) {
      throw new Error('TVShow rating deve estar entre 0 e 10');
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
