import { UserWithRole, AdminPermission, UserRole } from '@/services/types/auth.types';

export const isAdmin = (user: UserWithRole | null): user is UserWithRole & { role: 'admin' } => {
  return user?.role === 'admin';
};

export const isSeller = (user: UserWithRole | null): user is UserWithRole & { role: 'seller' } => {
  return user?.role === 'seller';
};

export const isCustomer = (user: UserWithRole | null): user is UserWithRole & { role: 'customer' } => {
  return user?.role === 'customer';
};

export const hasRole = (user: UserWithRole | null, roles: UserRole | UserRole[]): boolean => {
  if (!user) return false;
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return roleArray.includes(user.role);
};

export const hasPermission = (user: UserWithRole | null, permission: AdminPermission): boolean => {
  if (!user || user.role !== 'admin') return false;
  return user.permissions.includes(permission);
};

export const getDashboardPath = (user: UserWithRole | null): string => {
  if (!user) return '/login';
  switch (user.role) {
    case 'admin':
      return '/admin/dashboard';
    case 'seller':
      return '/seller/dashboard';
    case 'customer':
      return '/customer/dashboard';
    default:
      return '/';
  }
};
