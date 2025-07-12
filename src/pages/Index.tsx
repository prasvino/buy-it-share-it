
import { useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import CreatePost from "../components/CreatePost";
import { TrendingUp, ShoppingBag, Zap, Star } from "lucide-react";

const Index = () => {
  const [posts] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        username: "@sarahj",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face"
      },
      content: "Just got the new iPhone 15 Pro from Amazon for $999! The camera quality is absolutely incredible 📸✨",
      platform: {
        name: "Amazon",
        icon: "🛒",
        color: "bg-orange-500"
      },
      price: "$999",
      media: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=300&fit=crop",
      timestamp: "2h",
      likes: 24,
      comments: 8,
      reposts: 3
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        username: "@miketech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
      },
      content: "Found this amazing coffee maker at Target! Perfect morning brew every time ☕️",
      platform: {
        name: "Target",
        icon: "🎯",
        color: "bg-red-500"
      },
      price: "$79.99",
      media: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop",
      timestamp: "4h",
      likes: 18,
      comments: 5,
      reposts: 2
    },
    {
      id: 3,
      user: {
        name: "Emma Rodriguez",
        username: "@emmar",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
      },
      content: "Best investment for my home office! This ergonomic chair from Wayfair is a game changer 💺",
      platform: {
        name: "Wayfair",
        icon: "🏠",
        color: "bg-purple-500"
      },
      price: "$299",
      timestamp: "6h",
      likes: 31,
      comments: 12,
      reposts: 7
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <UserProfile />
            </div>
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm mb-6">
              <CreatePost />
            </div>
            
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          {/* Right Sidebar - Trending */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Trending Purchases */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                    Trending
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50/70 rounded-2xl transition-colors duration-200 cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                        📱
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">iPhone 15 Pro</p>
                        <p className="text-xs text-gray-500">2,341 purchases today</p>
                      </div>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50/70 rounded-2xl transition-colors duration-200 cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                        👟
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Nike Air Max</p>
                        <p className="text-xs text-gray-500">1,892 purchases</p>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50/70 rounded-2xl transition-colors duration-200 cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                        💻
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">MacBook Pro</p>
                        <p className="text-xs text-gray-500">1,456 purchases</p>
                      </div>
                      <Zap className="w-4 h-4 text-purple-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2 text-blue-500" />
                    Today's Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                      <span className="text-sm text-gray-700">Total Posts</span>
                      <span className="font-bold text-blue-700">12.5k</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                      <span className="text-sm text-gray-700">Money Spent</span>
                      <span className="font-bold text-green-700">$2.1M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                      <span className="text-sm text-gray-700">Active Users</span>
                      <span className="font-bold text-purple-700">8.2k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
