import { baseApi } from './baseApi';
import { UserProfile, TopSellersResponse } from '../types/auth.types';
import { RootState } from '../store/store';

export interface PublicSellerProfile {
  businessName: string;
  businessAddress: string;
  rating: {
    average: number;
    count: number;
  };
  totalProducts: number;
  joinedDate: string;
}

export interface UpdateProfileResponse {
  message: string;
  profile: UserProfile;
}

export interface Seller {
  id: string;
  businessName: string;
  businessAddress: string;
  logo?: string;
  status: string;
  rating: {
    average: number;
    count: number;
  };
  totalProducts: number;
  joinedDate: string;
  slug?: string;
}

export interface VendorsResponse {
  success: boolean;
  sellers: Seller[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface VendorsParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface UpdateBankAccountResponse {
  success: boolean;
  message: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: '/api/auth/profile',
        method: 'GET',
      }),
      // Skip query if not authenticated
      keepUnusedDataFor: 0, // Don't cache profile data
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          // Handle error silently
        }
      },
      providesTags: ['Profile'],
    }),
    getPublicSellerProfile: builder.query<PublicSellerProfile, string>({
      query: (sellerId) => `/api/auth/seller/${sellerId}/public`,
    }),
    updateSellerProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (data) => ({
        url: '/api/auth/profile/seller/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateCustomerProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (data) => ({
        url: '/api/auth/profile/customer/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateBankAccount: builder.mutation<UpdateBankAccountResponse, BankAccountInfo>({
      query: (data) => ({
        url: '/api/auth/profile/seller/bank-account',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    getTopSellers: builder.query<TopSellersResponse, number | void>({
      query: (limit) => ({
        url: limit ? `/api/auth/sellers/top?limit=${limit}` : '/api/auth/sellers/top',
        method: 'GET',
      }),
      providesTags: ['Sellers'],
    }),
    getAllVendors: builder.query<VendorsResponse, VendorsParams>({
      query: (params = {}) => ({
        url: '/api/auth/sellers',
        method: 'GET',
        params,
      }),
      providesTags: ['Sellers'],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetProfileQuery, 
  useGetPublicSellerProfileQuery,
  useUpdateSellerProfileMutation,
  useUpdateCustomerProfileMutation,
  useUpdateBankAccountMutation,
  useGetTopSellersQuery,
  useGetAllVendorsQuery
} = userApi;

// Add selector to check auth state
export const selectShouldFetchProfile = (state: RootState) => 
  state.auth.isAuthenticated && state.auth.token;
