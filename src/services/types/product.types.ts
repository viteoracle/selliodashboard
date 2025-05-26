export interface Product {
  _id: string;
  name: string;
  description: string;
  price: {
    current: number;
    discount?: number;
  };
  inventory: {
    quantity: number;
    sku: string;
    lowStockAlert: number;
  };
  metadata: {
    rating: {
      average: number;
      count: number;
    };
    views: number;
    sales: number;
  };
  sellerId: {
    _id: string;
    businessName: string;
  };
  category: {
    _id: string;
    name: string;
  };
  images: Array<{
    url: string;
    isDefault: boolean;
    _id: string;
  }>;
  status: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrendingProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: {
    current: number;
    discount?: number;
    compareAt?: number;
  };
  category: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    businessName: string;
  };
  image: string;
  badge?: string;
  stats: {
    rating: {
      average: number;
      count: number;
    };
    views: number;
    sales: number;
  };
  trending: {
    isHot: boolean;
    isTrending: boolean;
    lastUpdated: string;
  };
}

export interface PopularProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: {
    current: number;
    discount?: number;
    compareAt?: number;
  };
  category: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    businessName: string;
  };
  rating: {
    average: number;
    count: number;
  };
  badge?: string;
  image: string;
  stats: {
    sales: number;
    views: number;
  };
}

export interface TrendingProductsResponse {
  products: TrendingProduct[];
  total: number;
}

export interface PopularProductsResponse {
  products: PopularProduct[];
  total: number;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface PaginatedResponse {
  products: Product[];
  pagination: {
    total: number;
    pages: number;
    currentPage: string;
    limit: string;
  };
}

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: {
    current: number;
    discount?: number;
    compareAt?: number;
  };
  category: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    businessName: string;
    email: string;
    phoneNumber: string;
  };
  inventory: {
    quantity: number;
    sku: string;
    lowStockAlert: number;
  };
  images: Array<{
    url: string;
    isDefault: boolean;
  }>;
  metadata: {
    rating: {
      average: number;
      count: number;
    };
    views: number;
    sales: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminProductsResponse {
  products: AdminProduct[];
  stats: {
    totalProducts: number;
    totalValue: number;
    lowStock: number;
  };
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}
