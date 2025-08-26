import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/api";
import LoginForm from "./LoginForm";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication status on mount and set up a listener for storage changes
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };

    checkAuth();

    // Listen for storage changes (e.g., when token is set/removed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events when token changes within the same tab
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Show loading state while checking authentication
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuth) {
    return <LoginForm />;
  }

  // Show main app if authenticated
  return <>{children}</>;
};

export default AuthWrapper;