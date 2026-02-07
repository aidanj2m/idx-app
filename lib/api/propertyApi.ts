import axios from 'axios';
import { Property, PropertyFilters, PropertyListResponse } from '../types/property';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// Simple in-memory cache with TTL
const cache = new Map<string, { data: unknown; expiry: number }>();
const CACHE_TTL = 60_000; // 1 minute

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: unknown) {
  cache.set(key, { data, expiry: Date.now() + CACHE_TTL });
}

export const propertyApi = {
  getProperties: async (filters: PropertyFilters = {}): Promise<PropertyListResponse> => {
    const cacheKey = `properties:${JSON.stringify(filters)}`;
    const cached = getCached<PropertyListResponse>(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<PropertyListResponse>('/properties', { params: filters });
    setCache(cacheKey, response.data);
    return response.data;
  },

  getPropertyById: async (mlsId: number): Promise<Property> => {
    const cacheKey = `property:${mlsId}`;
    const cached = getCached<Property>(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<Property>(`/properties/${mlsId}`);
    setCache(cacheKey, response.data);
    return response.data;
  },
};
