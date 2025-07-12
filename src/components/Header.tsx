
import { useState } from "react";
import { Search, Bell, MessageCircle, Plus, Sparkles, ShoppingBag, Menu } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 sticky top-0 z-50 shadow-lg shadow-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                PurchaseShare
              </h1>
              <p className="text-xs text-gray-500 font-medium">Share • Discover • Shop</p>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-xl mx-6 sm:mx-8">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Search products, brands, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50/80 border border-gray-200/50 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-300 text-sm placeholder:text-gray-500 hover:bg-white/80"
                />
                {searchQuery && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {/* Create Post Button */}
            <button className="group relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-110">
              <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>

            {/* Notifications */}
            <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-2xl transition-all duration-300 group">
              <Bell className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>

            {/* Messages */}
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-2xl transition-all duration-300 group">
              <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </button>

            {/* Mobile Menu */}
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-2xl transition-all duration-300 xl:hidden">
              <Menu className="w-5 h-5" />
            </button>

            {/* Profile */}
            <button className="relative group ml-3">
              <div className="w-11 h-11 rounded-2xl overflow-hidden border-3 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 p-[2px] transition-all duration-300 group-hover:scale-110">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
