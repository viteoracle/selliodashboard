
export interface Category {
  id: string;
  _id?: string; // Adding for consistency with backend
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  order: number;
  parent: {
    id: string;
    name: string;
  } | null;
  image: string | null;
}

export interface CategoryImage {
  url: string;
  thumbnail: string;
  banner: string;
}

export interface PopularCategoryImage {
  url: string;
  title?: string;
  subtitle?: string;
}

export interface CategoryStats {
  id: string;
  name: string;
  slug: string;
  description: string;
  stats: {
    products: number;
    sales: number;
  };
  image: CategoryImage;
}

export interface PopularCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  image: PopularCategoryImage;
  banner: string;
  thumbnail: string;
}

export interface CategoryStatsResponse {
  categories: CategoryStats[];
  total: number;
}

export interface PopularCategoriesResponse {
  categories: PopularCategory[];
  total: number;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface CreateCategoryDto {
  name: string;
  description: string;
  order: number;
  parent?: string;
}
