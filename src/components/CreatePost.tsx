
import { useState } from "react";
import { Image, MapPin, DollarSign, Tag, Smile, Camera, Globe, Sparkles, Zap } from "lucide-react";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [price, setPrice] = useState("");

  const platforms = [
    { name: "Amazon", icon: "🛒", color: "from-orange-500 to-orange-600" },
    { name: "Target", icon: "🎯", color: "from-red-500 to-red-600" },
    { name: "Best Buy", icon: "💻", color: "from-blue-600 to-blue-700" },
    { name: "Walmart", icon: "🏪", color: "from-blue-500 to-blue-600" },
    { name: "Apple Store", icon: "🍎", color: "from-gray-700 to-gray-800" },
    { name: "Local Store", icon: "🏪", color: "from-green-500 to-green-600" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-2xl shadow-gray-100/50 overflow-hidden">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-gray-100/50">
        <div className="flex items-center space-x-4">
          {/* Enhanced User Avatar */}
          <div className="relative group">
            <div className="w-14 h-14 rounded-3xl overflow-hidden border-3 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                alt="Your avatar"
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Share Your Purchase</h3>
            <p className="text-sm text-gray-500">What did you buy today?</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Textarea */}
        <div className="mb-6">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your purchase experience, thoughts, and recommendations..."
            className="w-full resize-none border-none outline-none text-base placeholder-gray-400 bg-transparent leading-relaxed min-h-[100px] focus:placeholder-gray-300 transition-colors duration-200"
            rows={4}
          />
        </div>

        {/* Enhanced Purchase Details Card */}
        <div className="bg-gradient-to-br from-gray-50/80 to-blue-50/50 rounded-3xl p-6 mb-6 border border-gray-100/50 hover:shadow-lg transition-all duration-300">
          <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
            Purchase Details
            <Zap className="w-4 h-4 ml-2 text-yellow-500" />
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Platform Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Where did you shop?
              </label>
              <div className="relative group">
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md appearance-none cursor-pointer"
                >
                  <option value="">Choose a platform</option>
                  {platforms.map((platform) => (
                    <option key={platform.name} value={platform.name}>
                      {platform.icon} {platform.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>

            {/* Enhanced Price Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                How much did you spend?
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-16 pr-4 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-green-500/30 focus:border-green-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
          <div className="flex items-center space-x-1 overflow-x-auto">
            <button className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md">
              <Camera className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden sm:inline">Photo</span>
            </button>
            <button className="flex items-center space-x-2 text-green-600 hover:bg-green-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md">
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden sm:inline">Location</span>
            </button>
            <button className="flex items-center space-x-2 text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md">
              <Tag className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden sm:inline">Tag</span>
            </button>
            <button className="flex items-center space-x-2 text-yellow-600 hover:bg-yellow-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md">
              <Smile className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Enhanced Share Button */}
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-2">
              <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Share Purchase</span>
              <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
