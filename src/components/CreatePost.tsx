
import { useState } from "react";
import { Image, MapPin, DollarSign, Tag, Smile, Camera, Globe } from "lucide-react";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [price, setPrice] = useState("");

  const platforms = [
    { name: "Amazon", icon: "🛒", color: "bg-orange-500" },
    { name: "Target", icon: "🎯", color: "bg-red-500" },
    { name: "Best Buy", icon: "💻", color: "bg-blue-600" },
    { name: "Walmart", icon: "🏪", color: "bg-blue-500" },
    { name: "Apple Store", icon: "🍎", color: "bg-gray-800" },
    { name: "Local Store", icon: "🏪", color: "bg-green-500" },
  ];

  return (
    <div className="p-6">
      <div className="flex space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
            alt="Your avatar"
            className="w-12 h-12 rounded-2xl object-cover border-2 border-gray-100"
          />
        </div>

        {/* Post Form */}
        <div className="flex-1">
          <div className="mb-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What did you buy today? Share your purchase experience..."
              className="w-full resize-none border-none outline-none text-base placeholder-gray-500 bg-transparent leading-relaxed min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Purchase Details */}
          <div className="bg-gray-50/70 rounded-2xl p-4 mb-4 border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Purchase Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Platform Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Where did you buy it?
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none transition-all duration-200 text-sm"
                >
                  <option value="">Select platform</option>
                  {platforms.map((platform) => (
                    <option key={platform.name} value={platform.name}>
                      {platform.icon} {platform.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none transition-all duration-200 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <button className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0">
                <Camera className="w-4 h-4" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              <button className="flex items-center space-x-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Location</span>
              </button>
              <button className="flex items-center space-x-2 text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0">
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">Tag</span>
              </button>
              <button className="flex items-center space-x-2 text-yellow-600 hover:bg-yellow-50 px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0">
                <Smile className="w-4 h-4" />
              </button>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Share Purchase</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
