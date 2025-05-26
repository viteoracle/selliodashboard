import { baseApi } from './baseApi';
import { AdminDashboardStats, UsersQueryParams, UsersResponse } from '../types/admin.types';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, UsersQueryParams>({
      query: (params) => ({
        url: '/api/auth/admin/users',
        method: 'GET',
        params,
      }),
      providesTags: ['Users'],
    }),
    verifySeller: builder.mutation<{ success: boolean; message: string }, string>({
      query: (sellerId) => ({
        url: `/api/auth/admin/verify-seller/${sellerId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
    GetAdminOrders: builder.query<any, string>({
      query: (timeframe = 'month') => ({
        url: '/api/orders/admin/dashboard',
        params: { timeframe }
      }),
      providesTags: ['Orders'],
    }),
    getDashboardStats: builder.query<any, string>({
      query: (timeframe) => ({
        url: '/api/auth/admin/dashboard-stats',
        params: { timeframe }
      }),
    }),
  }),
});

export const {
  useVerifySellerMutation,
  useGetUsersQuery,
  useGetAdminOrdersQuery,
  useGetDashboardStatsQuery,
} = adminApi;
