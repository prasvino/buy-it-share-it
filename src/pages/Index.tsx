
import { useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import CreatePost from "../components/CreatePost";

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <UserProfile />
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <CreatePost />
            </div>
            
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          {/* Right Sidebar - Trending/Suggestions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending Purchases</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">iPhone 15 Pro</p>
                    <p className="text-xs text-gray-500">2,341 purchases</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    👟
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Nike Air Max</p>
                    <p className="text-xs text-gray-500">1,892 purchases</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    💻
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">MacBook Pro</p>
                    <p className="text-xs text-gray-500">1,456 purchases</p>
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
