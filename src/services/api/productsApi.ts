
import { baseApi } from './baseApi';
import { 
  Product, 
  ProductFilters, 
  PaginatedResponse, 
  AdminProductsResponse,
  TrendingProductsResponse,
  PopularProductsResponse
} from '../types/product.types';

interface SellerProductsResponse {
  seller: {
    businessName: string;
    businessAddress: string;
  };
  products: Product[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number; // Added new field
  salesGrowth: number;
  productGrowth: number;
  orderGrowth: number;
  salesOverview: Array<{
    month: string;
    amount: number;
  }>;
}

interface UpdateProductStatusResponse {
  id: string;
  name: string;
  status: 'active' | 'draft';
  updatedAt: string;
}

interface DeleteProductResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    deletedAt: string;
  };
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<Product, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    getPublicProduct: builder.query<Product, string>({
      query: (id) => `/api/products/public/${id}`,
    }),

    getRelatedProducts: builder.query<{ products: Product[] }, { id: string; limit?: number }>({
      query: ({ id, limit = 4 }) => ({
        url: `/api/products/related/${id}`,
        params: { limit }
      }),
    }),

    getTrendingProducts: builder.query<TrendingProductsResponse, {
      limit?: number;
    }>({
      query: (params = {}) => ({
        url: '/api/products/trending',
        params
      }),
    }),

    getPopularProducts: builder.query<PopularProductsResponse, {
      limit?: number;
    }>({
      query: (params = {}) => ({
        url: '/api/products/popular',
        params
      }),
    }),

    incrementProductViews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/products/${id}/views`,
        method: 'POST',
      }),
    }),

    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: '/api/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<Product, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [
        { type: 'Products', id: 'LIST' },
        { type: 'Products', id: result?.data.id }
      ],
    }),

    getSellerProducts: builder.query<{
      products: Product[];
      pagination: {
        total: number;
        pages: number;
        currentPage: number;
        limit: number;
      };
    }, {
      page?: number;
      limit?: number;
      status?: string;
      sort?: string;
    }>({
      query: (params) => ({
        url: '/api/products/seller/products',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
          sort: params.sort || '-createdAt'
        },
      }),
      providesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    getPublicProducts: builder.query<PaginatedResponse, ProductFilters>({
      query: (params) => ({
        url: '/api/products/public',
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          category: params.category,
          search: params.search,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          sort: params.sort
        },
      }),
    }),

    getAdminProducts: builder.query<AdminProductsResponse, {
      page?: number;
      limit?: number;
      sort?: string;
    }>({
      query: (params) => ({
        url: '/api/products/admin/active',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          sort: params.sort || '-createdAt'
        }
      }),
      providesTags: ['Products'],
    }),

    getPublicSellerProducts: builder.query<SellerProductsResponse, { 
      sellerId: string;
      page?: number;
      limit?: number;
      excludeProduct?: string;  
    }>({
      query: ({ sellerId, ...params }) => ({
        url: `/api/products/seller/${sellerId}/public`,
        params: {
          page: params.page || 1,
          limit: params.limit || 12,
          ...params
        }
      }),
    }),

    getSellerDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/api/products/seller/dashboard'
    }),

    updateProductStatus: builder.mutation<UpdateProductStatusResponse, {
      productId: string;
      status: 'active' | 'draft';
    }>({
      query: ({ productId, status }) => ({
        url: `/api/products/${productId}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetPublicProductQuery,
  useGetRelatedProductsQuery,
  useGetTrendingProductsQuery,
  useGetPopularProductsQuery,
  useIncrementProductViewsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSellerProductsQuery,
  useGetPublicProductsQuery,
  useGetAdminProductsQuery,
  useGetPublicSellerProductsQuery,
  useGetSellerDashboardStatsQuery,
  useUpdateProductStatusMutation,
} = productsApi;
