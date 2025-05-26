export interface User {
  _id: string;
  id?: string; // Adding alias field for consistency
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  adminVerified?: boolean;
  businessName?: string;
  businessAddress?: string;
  governmentId?: string;
  permissions?: string[];
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  role?: string;
  isVerified?: boolean;
  adminVerified?: boolean;
}

export interface AdminDashboardStats {
  overview: {
    totalOrders: number;
    totalRevenue: number;
    avgOrderValue: number;
    pendingOrders: number;
  };
  recentOrders: Array<{
    orderId: string;
    customerType: string;
    amount: number;
    status: string;
    createdAt: string;
  }>;
  orderStats: {
    pending: number;
    confirmed: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  salesChart: Array<{
    date: string;
    orders: number;
    revenue: number;
  }>;
  topProducts: Array<{
    productId: string;
    name: string;
    totalOrders: number;
    revenue: number;
  }>;
  topCustomers: Array<{
    customerId: string;
    name: string;
    totalOrders: number;
    totalSpent: number;
  }>;
}

export interface DashboardOverview {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  pendingOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export interface DashboardStatsResponse {
  overview: DashboardOverview;
  salesChart: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}
