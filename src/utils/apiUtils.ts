import axios, { AxiosRequestHeaders } from 'axios';
import { API_BASE } from './constants';
import { ProviderManager } from './providers/ProviderManager';

export const isStatusOK = (response: ApiResponse) => {
  return response.status >= 200 && response.status < 300;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getAuthHeaders = async (attemptLogin = true) => {
  const providerManager = await ProviderManager.getInstance();
  const authHeaders = await providerManager.getAuthHeaders(attemptLogin);
  return authHeaders;
};

export interface ApiResponse {
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any;
  status: number;
}

export const httpGet = async (path: string, params?: object): Promise<ApiResponse> => {
  try {
    const headers = await authHeaders(path);
    const response = await axios.get(`${API_BASE}${path}`, { headers, params });

    return { status: response.status, error: '', result: response.data };
  } catch (error) {
    return httpErrorResponse(error);
  }
};

// ===================================================================

export const httpPost = async (path: string, body: object): Promise<ApiResponse> => {
  try {
    const headers = await authHeaders(path);
    const response = await axios.post(`${API_BASE}${path}`, body, { headers });

    return { status: response.status, error: '', result: response.data };
  } catch (error) {
    return httpErrorResponse(error);
  }
};

// ===================================================================

export const authHeaders = async (path: string): Promise<AxiosRequestHeaders> => {
  const userEndpointRegex = /\/(u|user)\//;
  const publicUserEndpoint = /\/p\/u\//;
  const requiresAuth = userEndpointRegex.test(path) && !publicUserEndpoint.test(path);

  let authHeaders = {};
  if (requiresAuth) {
    authHeaders = await getAuthHeaders();
  }

  return authHeaders;
};

// ===================================================================

export const httpErrorResponse = (error: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err: any = error;
  let status = 551;
  let message = '';

  if (err.response) {
    message = err.response.data;
    status = err.response.status;
    console.log(err.response.headers);
  } else if (err.request) {
    console.log(err.request);
    message = 'request error';
  } else {
    message = err.message;
  }
  console.log(err.config);

  return { status: status, error: message };
};
