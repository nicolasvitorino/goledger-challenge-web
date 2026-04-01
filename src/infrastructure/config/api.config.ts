/**
 * Configuração da API
 */
export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://ec2-50-19-36-138.compute-1.amazonaws.com",
  USERNAME: process.env.NEXT_PUBLIC_API_USERNAME || "goledger",
  PASSWORD: process.env.NEXT_PUBLIC_API_PASSWORD || "5NxVCAjC",
};

/**
 * Endpoints da API
 */
export const API_ENDPOINTS = {
  SEARCH: "/api/query/search",
  READ_ASSET: "/api/query/readAsset",
  GET_SCHEMA: "/api/query/getSchema",
  CREATE_ASSET: "/api/command/createAsset",
  UPDATE_ASSET: "/api/command/updateAsset",
  DELETE_ASSET: "/api/command/deleteAsset",
};
