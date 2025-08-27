import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import UserProfile from "../components/UserProfile";
import TrendingSidebar from "../components/TrendingSidebar";
import MobileBottomNav from "../components/MobileBottomNav";
import { useCurrentUser } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
  
  // Get search parameters from URL
  const keyword = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '0');
  const size = parseInt(searchParams.get('size') || '10');

  // Handle navigation back to home
  const handleGoBack = () => {
    navigate('/');
  };

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
          
          {/* Main Search Content */}
          <div className="xl:col-span-6 order-1 xl:order-2 pt-20 md:pt-8 pb-8">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                onClick={handleGoBack}
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-2xl"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Feed</span>
              </Button>
            </div>

            {/* Search Results */}
            <SearchResults
              initialKeyword={keyword}
              initialPage={page}
              pageSize={size}
              showSearchBar={true}
              className="space-y-6"
            />
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
      </div>
    </div>
  );
};

export default Search;