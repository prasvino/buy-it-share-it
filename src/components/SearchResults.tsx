import { useState, useCallback } from "react";
import { Search, Filter, SortDesc, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchPosts } from "@/lib/api";
import { SearchParams } from "@/lib/api";
import PostCard from "./PostCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import SearchBar from "./SearchBar";

interface SearchResultsProps {
  initialKeyword?: string;
  initialPage?: number;
  pageSize?: number;
  showSearchBar?: boolean;
  className?: string;
}

const SearchResults = ({ 
  initialKeyword = "", 
  initialPage = 0, 
  pageSize = 10,
  showSearchBar = true,
  className = ""
}: SearchResultsProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: initialKeyword,
    page: initialPage,
    size: pageSize
  });

  const { data: searchResults, isLoading, error } = useSearchPosts(searchParams);

  // Handle search from SearchBar
  const handleSearch = useCallback((keyword: string) => {
    setSearchParams(prev => ({
      ...prev,
      keyword,
      page: 0 // Reset to first page on new search
    }));
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((newPage: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: newPage
    }));
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle page size change
  const handlePageSizeChange = useCallback((newSize: string) => {
    setSearchParams(prev => ({
      ...prev,
      size: parseInt(newSize),
      page: 0 // Reset to first page when changing page size
    }));
  }, []);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchParams({
      keyword: "",
      page: 0,
      size: pageSize
    });
  }, [pageSize]);

  // Calculate pagination info
  const totalPages = Math.ceil((searchResults?.total || 0) / (searchParams.size || pageSize));
  const currentPage = searchParams.page || 0;
  const hasResults = searchResults?.posts && searchResults.posts.length > 0;
  const showPagination = hasResults && totalPages > 1;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Bar */}
      {showSearchBar && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 shadow-lg">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search posts, users, platforms..."
            className="w-full"
            showSuggestions={true}
          />
        </div>
      )}

      {/* Search Info & Filters */}
      {(searchParams.keyword || hasResults) && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Info */}
            <div className="flex items-center space-x-3">
              {searchParams.keyword ? (
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    Results for
                  </span>
                  <Badge variant="secondary" className="px-3 py-1">
                    "{searchParams.keyword}"
                  </Badge>
                  <span className="text-gray-500">
                    ({searchResults?.total || 0} found)
                  </span>
                  <Button
                    onClick={handleClearSearch}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    All posts ({searchResults?.total || 0})
                  </span>
                </div>
              )}
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Show:</span>
              <Select
                value={(searchParams.size || pageSize).toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">per page</span>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-3" />
            <p className="text-gray-500">Searching...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <div className="text-red-600 mb-2">
            <Search className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Search Error</p>
          </div>
          <p className="text-red-700 text-sm">
            {error instanceof Error ? error.message : "Failed to search posts. Please try again."}
          </p>
          <Button
            onClick={() => handleSearch(searchParams.keyword || "")}
            variant="outline"
            size="sm"
            className="mt-3"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* No Results */}
      {!isLoading && !error && !hasResults && searchParams.keyword && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No results found
          </h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any posts matching "{searchParams.keyword}".
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Try:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Checking your spelling</li>
              <li>Using different keywords</li>
              <li>Searching for usernames or platform names</li>
              <li>Using fewer or more general terms</li>
            </ul>
          </div>
          <Button
            onClick={handleClearSearch}
            variant="outline"
            className="mt-6"
          >
            View All Posts
          </Button>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && hasResults && (
        <div className="space-y-6">
          {/* Results Grid */}
          <div className="grid gap-6">
            {searchResults.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {showPagination && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Showing {currentPage * (searchParams.size || pageSize) + 1} to{" "}
                  {Math.min((currentPage + 1) * (searchParams.size || pageSize), searchResults.total)} of{" "}
                  {searchResults.total} results
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i;
                      } else if (currentPage <= 2) {
                        pageNum = i;
                      } else if (currentPage >= totalPages - 3) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          {pageNum + 1}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;