import { useEffect } from 'react';
import { Loader2, ShoppingBag } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({ message = 'Loading...' }: PageLoaderProps) => {
  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl animate-pulse">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 to-pink-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
        </div>
        
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-medium">{message}</p>
        
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;