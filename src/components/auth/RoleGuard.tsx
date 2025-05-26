import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/services/hooks/useAuth';
import { UserRole, AdminPermission } from '@/services/types/auth.types';
import { getDashboardPath } from '@/utils/auth.utils';

interface RoleGuardProps {
  children: ReactNode;
  roles?: UserRole[];
  permissions?: AdminPermission[];
}

export const RoleGuard = ({ children, roles = [], permissions = [] }: RoleGuardProps) => {
  const { user, checkRole, checkPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !checkRole(roles)) {
    return <Navigate to={getDashboardPath(user)} replace />;
  }

  if (permissions.length > 0 && !permissions.every(checkPermission)) {
    return <Navigate to={getDashboardPath(user)} replace />;
  }

  return <>{children}</>;
};
