import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';

export const BASE_URL = "https://campus-trade-bakend.onrender.com";
// export const BASE_URL = "http://localhost:3000";

export type TagTypes = 'Categories' | 'Products' | 'Users' | 'Orders' | 'Profile' | 'Sellers';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Logout on 401 Unauthorized
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Categories', 'Products', 'Users', 'Orders', 'Profile', 'Sellers'],

  // Add default cache configuration
  keepUnusedDataFor: 300, // Keep unused data in cache for 5 minutes

  // Add refetch configuration
  refetchOnMountOrArgChange: 30, // Refetch after 30 seconds
  refetchOnFocus: false, // Don't refetch when window regains focus
  refetchOnReconnect: true, // Refetch on reconnection

  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

// Add custom hooks for cache management
export const usePrefetch = (endpoint: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(baseApi.util.prefetch(endpoint, undefined, {
      force: false // Only prefetch if not in cache
    }));
  }, [dispatch, endpoint]);
};

export const clearApiCache = async () => {
  const cacheKeys = await caches.keys();
  return Promise.all(
    cacheKeys
      .filter(key => key === 'api-cache')
      .map(key => caches.delete(key))
  );
};
