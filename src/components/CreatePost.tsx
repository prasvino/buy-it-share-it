
import { useState } from "react";
import { Image, MapPin, DollarSign, Tag } from "lucide-react";

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
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
          alt="Your avatar"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Post Form */}
        <div className="flex-1">
          <div className="mb-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What did you buy today? Share your purchase experience..."
              className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 bg-transparent"
              rows={3}
            />
          </div>

          {/* Purchase Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where did you buy it?
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-full transition-colors">
                <Image className="w-4 h-4" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              <button className="flex items-center space-x-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-full transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Location</span>
              </button>
              <button className="flex items-center space-x-2 text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-full transition-colors">
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">Tag</span>
              </button>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Share Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
