
import { baseApi } from './baseApi';
import { 
  Category, 
  CategoriesResponse, 
  CreateCategoryDto, 
  CategoryStatsResponse,
  PopularCategoriesResponse
} from '../types/category.types';

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, {
      isActive?: boolean;
      sort?: string;
      page?: number;
      limit?: number;
    }>({
      query: (params) => ({
        url: '/api/categories',
        params
      }),
      providesTags: (result) => 
        result
          ? [
              ...result.categories.map(({ id }) => ({ 
                type: 'Categories' as const,
                id 
              })),
              { type: 'Categories' as const, id: 'LIST' }
            ]
          : [{ type: 'Categories' as const, id: 'LIST' }]
    }),

    getCategoryStats: builder.query<CategoryStatsResponse, void>({
      query: () => ({
        url: '/api/categories/stats',
      }),
      providesTags: [{ type: 'Categories', id: 'STATS' }]
    }),

    getPopularCategories: builder.query<PopularCategoriesResponse, {
      limit?: number;
    }>({
      query: (params = {}) => ({
        url: '/api/categories/popular',
        params
      }),
      providesTags: [{ type: 'Categories', id: 'POPULAR' }]
    }),

    createCategory: builder.mutation<Category, CreateCategoryDto>({
      query: (data) => ({
        url: '/api/categories',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [
        { type: 'Categories', id: 'LIST' }, 
        { type: 'Categories', id: 'STATS' },
        { type: 'Categories', id: 'POPULAR' }
      ]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryStatsQuery,
  useGetPopularCategoriesQuery,
  useCreateCategoryMutation
} = categoriesApi;
