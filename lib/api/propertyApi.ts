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

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

export const propertyApi = {
  /**
   * Fetch properties with optional filters
   * @param filters - Filter parameters
   * @returns Property list response
   */
  getProperties: async (filters: PropertyFilters = {}): Promise<PropertyListResponse> => {
    const response = await apiClient.get<PropertyListResponse>('/properties', { params: filters });
    return response.data;
  },

  /**
   * Fetch single property by MLS ID
   * @param mlsId - Property MLS ID
   * @returns Property details
   */
  getPropertyById: async (mlsId: number): Promise<Property> => {
    const response = await apiClient.get<Property>(`/properties/${mlsId}`);
    return response.data;
  },
};
