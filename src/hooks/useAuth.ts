import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/services/store/store';
import { logout } from '@/services/store/slices/authSlice';
import { UserRole, AdminPermission } from '@/services/types/auth.types';
import { hasPermission, hasRole } from '@/utils/auth.utils';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const checkRole = (roles: UserRole | UserRole[]) => {
    return hasRole(auth.user, roles);
  };

  const checkPermission = (permission: AdminPermission) => {
    return hasPermission(auth.user, permission);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    isAdmin: auth.user?.role === 'admin',
    isSeller: auth.user?.role === 'seller',
    isCustomer: auth.user?.role === 'customer',
    checkRole,
    checkPermission,
    logout: handleLogout,
  };
};
