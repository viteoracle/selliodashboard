export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface OrderSeller {
  id: string;
  name: string;
}

export interface OrderItem {
  product: OrderProduct;
  seller: OrderSeller;
  quantity: number;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber?: string;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  final: number;
}

export interface Order {
  orderId: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  payment: {
    status: string;
    method: string;
  };
  shipping: {
    address: ShippingAddress;
    method: string;
    cost: number;
    tracking: string | null;
  };
  totals: OrderTotals;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface DeliveryInfo {
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  deliveryMethod?: 'standard' | 'express';
  specialInstructions?: string;
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress?: ShippingAddress;
}

export interface PaymentResponse {
  payment: {
    paymentUrl: string;
    reference: string;
    amount: number;
    currency: string;
  };
  order: {
    id: string;
    status: string;
    items: Array<{
      product: string;
      quantity: number;
      price: number;
    }>;
    totals: {
      subtotal: number;
      tax: number;
      shipping: number;
      final: number;
    }
  };
  customer: {
    email: string;
    shipping: {
      fullName: string;
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    }
  };
}

export interface PaymentVerificationResponse {
  success: boolean;
  order?: {
    _id: string;
    status: string;
    payment: {
      status: string;
      transactionId: string;
      method: string;
    };
    totals: {
      subtotal: number;
      tax: number;
      shipping: number;
      final: number;
    };
  };
  transaction?: {
    reference: string;
    status: string;
    amount: number;
    currency: string;
  };
  message?: string;
  details?: {
    paystackError?: string;
    serverError?: string;
  };
}

export interface AdminOrder {
  orderId: string;
  customerType: 'registered' | 'guest';
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
    seller: {
      id: string;
      name: string;
    };
    quantity: number;
    price: number;
    total: number;
  }>;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment: {
    status: string;
    method: string;
    transactionId: string | null;
  };
  shipping: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    cost: number;
    tracking: string | null;
  };
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    final: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrdersResponse {
  orders: AdminOrder[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}
