import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth();

  // If auth data is parsing, show a loading block
  if (user === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to home if they are not an administrator
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}