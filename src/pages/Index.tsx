
import { useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import CreatePost from "../components/CreatePost";
import TrendingSidebar from "../components/TrendingSidebar";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-x-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Sidebar - User Profile */}
          <div className="xl:col-span-3 order-2 xl:order-1">
            <div className="sticky top-28">
              <UserProfile />
            </div>
          </div>
          
          {/* Main Feed */}
          <div className="xl:col-span-6 order-1 xl:order-2">
            {/* Create Post - Floating Style */}
            <div className="mb-8 transform hover:scale-[1.02] transition-all duration-300">
              <CreatePost />
            </div>
            
            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="transform hover:scale-[1.02] transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Load More Posts</span>
              </button>
            </div>
          </div>
          
          {/* Right Sidebar - Trending */}
          <div className="xl:col-span-3 order-3">
            <div className="sticky top-28">
              <TrendingSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
