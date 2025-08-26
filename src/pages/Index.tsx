import { useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import CreatePostFAB from "../components/CreatePostFAB";
import TrendingSidebar from "../components/TrendingSidebar";
import MobileBottomNav from "../components/MobileBottomNav";
import { usePosts, useCurrentUser } from "@/lib/api";
import { useRealTimePosts } from "@/lib/websocket";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [page, setPage] = useState(1);
  const { data: postsData, isLoading, error, fetchNextPage, hasNextPage } = usePosts(page, 10);
  const { data: currentUser } = useCurrentUser();
  
  // Enable real-time updates
  useRealTimePosts();

  const handleLoadMore = () => {
    if (hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  const posts = postsData?.posts || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-x-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Sidebar - User Profile (Hidden on mobile) */}
          <div className="hidden xl:block xl:col-span-3 order-2 xl:order-1">
            <div className="sticky top-28">
              {currentUser ? (
                <UserProfile user={currentUser} />
              ) : (
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-xl p-6">
                  <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              )}
            </div>
          </div>
          
          {/* Main Feed */}
          <div className="xl:col-span-6 order-1 xl:order-2 pt-20 md:pt-8 pb-8">
            
            {/* Posts Feed */}
            <div className="space-y-6">
              {isLoading && posts.length === 0 ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <Skeleton className="w-14 h-14 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-6" />
                    <Skeleton className="h-72 w-full rounded-2xl mb-6" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                ))
              ) : error ? (
                // Error state
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-red-100/50 p-8 text-center">
                  <div className="text-red-500 mb-4">⚠️</div>
                  <h3 className="text-lg font-semibold text-red-700 mb-2">Failed to load posts</h3>
                  <p className="text-red-600 mb-4">Please check your connection and try again</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : posts.length === 0 ? (
                // Empty state
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-12 text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
                  <p className="text-gray-600 mb-6">Be the first to share your purchase!</p>
                  <CreatePostFAB />
                </div>
              ) : (
                // Posts list
                posts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="transform hover:scale-[1.02] transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <PostCard post={post} />
                  </div>
                ))
              )}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {isLoading ? 'Loading...' : 'Load More Posts'}
                  </span>
                </button>
              </div>
            )}

            {/* End of feed message */}
            {!hasNextPage && posts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">You've reached the end of the feed</p>
              </div>
            )}
          </div>
          
          {/* Right Sidebar - Trending (Hidden on mobile) */}
          <div className="hidden xl:block xl:col-span-3 order-3">
            <div className="sticky top-28">
              <TrendingSidebar />
            </div>
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
        <CreatePostFAB />
      </div>
    </div>
  );
};

export default Index;
