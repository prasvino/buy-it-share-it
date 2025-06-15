
import { useState } from "react";
import { User, Search, Bell, MessageCircle } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">PurchaseShare</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search purchases, users, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
