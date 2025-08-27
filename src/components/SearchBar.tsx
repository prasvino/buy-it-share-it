import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, Loader2, TrendingUp, User, Hash } from "lucide-react";
import { useSearchPosts } from "@/lib/api";
import { Post } from "@/lib/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { useDebounce } from "../hooks/use-debounce";

interface SearchBarProps {
  onSearch?: (keyword: string) => void;
  onSelectPost?: (post: Post) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  autoFocus?: boolean;
}

const SearchBar = ({ 
  onSearch, 
  onSelectPost, 
  placeholder = "Search posts, users, platforms...", 
  className,
  showSuggestions = true,
  autoFocus = false
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Debounce search query to avoid too many API calls
  const debouncedQuery = useDebounce(query, 300);
  
  // Search posts when debounced query changes
  const { data: searchResults, isLoading } = useSearchPosts({
    keyword: debouncedQuery,
    page: 0,
    size: 8 // Limit suggestions to 8 results
  });

  // Show/hide suggestions based on query and results
  useEffect(() => {
    if (showSuggestions && debouncedQuery.length >= 2 && searchResults?.posts) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery, searchResults, showSuggestions]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
  }, []);

  // Handle search submission
  const handleSearch = useCallback((searchQuery: string = query) => {
    if (searchQuery.trim().length >= 2) {
      onSearch?.(searchQuery.trim());
      setShowResults(false);
      inputRef.current?.blur();
    }
  }, [query, onSearch]);

  // Handle suggestion selection
  const handleSelectSuggestion = useCallback((post: Post) => {
    setQuery(post.content.slice(0, 50) + (post.content.length > 50 ? "..." : ""));
    setShowResults(false);
    onSelectPost?.(post);
  }, [onSelectPost]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showResults || !searchResults?.posts) return;

    const suggestions = searchResults.posts;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [showResults, searchResults, selectedIndex, handleSelectSuggestion, handleSearch]);

  // Clear search
  const handleClear = useCallback(() => {
    setQuery("");
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format timestamp for suggestions
  const formatTimestamp = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  }, []);

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-12 pr-20 h-12 text-base rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <Button
              onClick={handleClear}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            onClick={() => handleSearch()}
            disabled={query.length < 2}
            size="sm"
            className="h-8 px-3 rounded-xl"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showResults && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 max-h-96 overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500">Searching...</span>
            </div>
          ) : searchResults?.error ? (
            <div className="p-4 text-center text-gray-500">
              <p>{searchResults.error}</p>
            </div>
          ) : searchResults?.posts && searchResults.posts.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                {searchResults.total} result{searchResults.total !== 1 ? 's' : ''} found
              </div>
              
              {searchResults.posts.map((post, index) => (
                <button
                  key={post.id}
                  onClick={() => handleSelectSuggestion(post)}
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0",
                    selectedIndex === index && "bg-blue-50"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage
                        src={post.user.avatar}
                        alt={post.user.name}
                      />
                      <AvatarFallback className="text-xs">
                        {post.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {post.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          @{post.user.username}
                        </span>
                        <span className="text-xs text-gray-500">·</span>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(post.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 line-clamp-2 overflow-hidden">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Hash className="w-3 h-3" />
                          <span>{post.platform.name}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <TrendingUp className="w-3 h-3" />
                          <span>${post.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              
              {searchResults.hasNext && (
                <div className="px-4 py-3 border-t bg-gray-50">
                  <button
                    onClick={() => handleSearch()}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all {searchResults.total} results →
                  </button>
                </div>
              )}
            </div>
          ) : debouncedQuery.length >= 2 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No results found for "{debouncedQuery}"</p>
              <p className="text-xs mt-1 text-gray-400">
                Try searching for users, platforms, or post content
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;