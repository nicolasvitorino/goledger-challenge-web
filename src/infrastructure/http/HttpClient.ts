/**
 * HTTP Client para comunicação com a API GoLedger
 * Encapsula axios e gerencia autenticação Basic Auth
 */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_CONFIG, API_ENDPOINTS } from "../config/api.config";

export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    const auth = Buffer.from(
      `${API_CONFIG.USERNAME}:${API_CONFIG.PASSWORD}`,
    ).toString("base64");

    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000,
    });
  }

  /**
   * Executa uma requisição GET
   */
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Executa uma requisição POST
   */
  async post<T>(
    endpoint: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.client.post<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Executa uma requisição PUT
   */
  async put<T>(
    endpoint: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.client.put<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Executa uma requisição DELETE
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Trata erros de requisição
   */
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `API Error: ${error.response.status}`,
          error.response.data,
        );
      } else if (error.request) {
        console.error("No response received from API", error.request);
      }
    }
    console.error("HTTP Client Error:", error);
  }

  /**
   * Busca ativos (Assets)
   */
  async search(query: Record<string, unknown>): Promise<unknown> {
    return this.post(API_ENDPOINTS.SEARCH, { query });
  }

  /**
   * Lê um ativo específico
   */
  async readAsset(assetType: string, key: string): Promise<unknown> {
    return this.post(API_ENDPOINTS.READ_ASSET, {
      assetType,
      key,
    });
  }

  /**
   * Obtém schema dos ativos
   */
  async getSchema(assetType?: string): Promise<unknown> {
    return this.post(API_ENDPOINTS.GET_SCHEMA, {
      ...(assetType && { assetType }),
    });
  }

  /**
   * Cria um novo ativo
   */
  async createAsset(
    assetType: string,
    attributes: Record<string, unknown>,
  ): Promise<unknown> {
    return this.post(API_ENDPOINTS.CREATE_ASSET, {
      assetType,
      attributes,
    });
  }

  /**
   * Atualiza um ativo existente
   */
  async updateAsset(
    assetType: string,
    key: string,
    attributes: Record<string, unknown>,
  ): Promise<unknown> {
    return this.post(API_ENDPOINTS.UPDATE_ASSET, {
      assetType,
      key,
      attributes,
    });
  }

  /**
   * Deleta um ativo
   */
  async deleteAsset(assetType: string, key: string): Promise<unknown> {
    return this.post(API_ENDPOINTS.DELETE_ASSET, {
      assetType,
      key,
    });
  }
}

// Singleton instance
let httpClientInstance: HttpClient | null = null;

export function getHttpClient(): HttpClient {
  if (!httpClientInstance) {
    httpClientInstance = new HttpClient();
  }
  return httpClientInstance;
}
