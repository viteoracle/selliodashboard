import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { AdminPermission, UserRole } from '../types/auth.types';
import { hasRole, hasPermission, isAdmin, isSeller, isCustomer } from '@/utils/auth.utils';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    isAdmin: isAdmin(auth.user),
    isSeller: isSeller(auth.user),
    isCustomer: isCustomer(auth.user),
    checkRole: (roles: UserRole | UserRole[]) => hasRole(auth.user, roles),
    checkPermission: (permission: AdminPermission) => hasPermission(auth.user, permission),
    logout: () => dispatch(logout()),
  };
};
