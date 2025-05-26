
import { baseApi } from './baseApi';
import { 
  LoginRequest, 
  LoginResponse, 
  ResendOTPRequest,
  ResendOTPResponse, 
  RegistrationResponse, 
  VerifyOTPRequest, 
  VerifyOTPResponse 
} from '../types/auth.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerSeller: builder.mutation<RegistrationResponse, FormData>({
      query: (formData) => ({
        url: '/api/auth/register/seller',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),
    verifyOTP: builder.mutation<VerifyOTPResponse, VerifyOTPRequest>({
      query: (data) => ({
        url: '/api/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOTP: builder.mutation<ResendOTPResponse, ResendOTPRequest>({
      query: (data) => ({
        url: '/api/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    registerCustomer: builder.mutation<
      { message: string }, 
      FormData
    >({
      query: (data) => ({
        url: '/api/auth/register/customer',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useLoginMutation, 
  useRegisterSellerMutation, 
  useVerifyOTPMutation,
  useResendOTPMutation,
  useRegisterCustomerMutation,
} = authApi;
