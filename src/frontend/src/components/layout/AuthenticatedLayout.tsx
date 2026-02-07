import { Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSession } from '../../state/SessionContext';
import AuthenticatedNavbar from './AuthenticatedNavbar';
import ProfileSetupDialog from '../auth/ProfileSetupDialog';

export default function AuthenticatedLayout() {
  const { isAuthenticated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthenticatedNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <ProfileSetupDialog />
    </div>
  );
}
