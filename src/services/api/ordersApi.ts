import { baseApi } from './baseApi';

interface OrderItem {
  productId: string;
  quantity: number;
}

interface ShippingAddress {
  fullName: string;
  email?: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
}

export interface CreateOrderRequest {
  guestEmail?: string;
  items: OrderItem[];
  deliveryInfo?: ShippingAddress;
  shippingAddress?: ShippingAddress;
}

export interface InitiatePaymentResponse {
  paymentUrl: string;
  reference: string;
}

export interface PaymentResponse {
  payment: {
    paymentUrl: string;
    reference: string;
    amount: number;
    currency: string;
  };
  order: {
    _id?: string;
    id?: string;
    status: string;
    totals?: {
      final: number;
    };
    total?: number;
  };
}

export interface VerificationResponse {
  payment: {
    reference: string;
  };
  order: {
    _id: string;
    status: string;
    total?: number;
    totals?: {
      final: number;
    };
  };
  verified: boolean;
}

export interface Order {
  id?: string;
  _id?: string;
  orderId?: string;
  customer?: string;
  date?: string;
  orderDate?: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: { productId: string; quantity: number }[];
  total?: number;
  totals?: {
    final: number;
  };
  payment?: {
    status: string;
    method: string;
  };
  shipping?: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    tracking: string | null;
  };
  createdAt?: string;
}

interface OrdersResponse {
  orders: Order[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

interface CustomerDetails {
  email: string;
  fullName: string;
}

interface OrderProduct {
  id: string;
  name: string;
  image: string;
}

interface OrderItem {
  product: OrderProduct;
  quantity: number;
  price: number;
  total: number;
}

interface ShippingInfo {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  tracking: string | null;
}

interface PaymentInfo {
  status: string;
  method: string;
}

export interface SellerOrder {
  orderId: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  status: string;
  payment: PaymentInfo;
  shipping: ShippingInfo;
  orderDate: string;
}

interface SellerOrdersResponse {
  orders: SellerOrder[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

interface AdminOrdersResponse {
  orders: {
    orderId: string;
    customer: {
      id?: string;
      email: string;
      fullName: string;
    };
    items: Array<{
      product: {
        id: string;
        name: string;
        image: string;
      };
      quantity: number;
      price: number;
      total: number;
    }>;
    status: string;
    payment: {
      status: string;
      method: string;
    };
    totals: {
      final: number;
    };
    createdAt: string;
  }[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface OrderStatusUpdateRequest {
  orderId: string;
  status: 'delivered' | 'rejected' | 'disputed';
  reason?: string;
}

export interface OrderStatusResponse {
  message: string;
  order: {
    _id: string;
    status: string;
  };
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<{ orderId: string }, CreateOrderRequest>({
      query: (data) => ({
        url: '/api/orders',
        method: 'POST',
        body: data,
      }),
    }),
    createCustomerOrder: builder.mutation<{ _id: string }, CreateOrderRequest>({
      query: (data) => ({
        url: '/api/orders/customer/create',
        method: 'POST',
        body: data,
      }),
    }),
    initiateCustomerPayment: builder.mutation<PaymentResponse, string>({
      query: (orderId) => ({
        url: `/api/orders/customer/${orderId}/pay`,
        method: 'POST',
      }),
    }),
    verifyPayment: builder.query<any, string>({
      query: (reference) => `/api/orders/verify-payment/${reference}`,
    }),
    getSellerOrders: builder.query<SellerOrdersResponse, { page?: number; limit?: number }>({
      query: (params) => ({
        url: '/api/orders/seller/orders',
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10
        }
      }),
      providesTags: ['Orders'],
    }),
    getCustomerOrders: builder.query<OrdersResponse, {
      page?: number;
      limit?: number;
    }>({
      query: (params) => ({
        url: '/api/orders/customer',
        params: {
          page: params.page || 1,
          limit: params.limit || 10
        }
      }),
      providesTags: ['Orders'],
    }),
    getAdminOrders: builder.query<AdminOrdersResponse, {
      page?: number;
      limit?: number;
      status?: string;
      sort?: string;
      search?: string;
    }>({
      query: (params) => ({
        url: '/api/orders/admin/orders',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
          sort: params.sort || '-createdAt',
          search: params.search
        }
      }),
      providesTags: ['Orders'],
    }),
    updateCustomerOrderStatus: builder.mutation<OrderStatusResponse, OrderStatusUpdateRequest>({
      query: (data) => ({
        url: `/api/orders/customer/status`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { 
  useCreateOrderMutation,
  useCreateCustomerOrderMutation,
  useInitiateCustomerPaymentMutation,
  useVerifyPaymentQuery,
  useGetSellerOrdersQuery,
  useGetCustomerOrdersQuery,
  useGetAdminOrdersQuery,
  useUpdateCustomerOrderStatusMutation,
} = ordersApi;
