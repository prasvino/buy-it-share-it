
import { MapPin, Calendar, ExternalLink, Settings, Users, UserPlus } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
        <div className="absolute -bottom-6 left-6">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="Profile"
            className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
          />
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors duration-200">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="pt-8 p-6">
        {/* Profile Info */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Alex Thompson</h2>
              <p className="text-sm text-gray-500">@alexthompson</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Follow</span>
            </button>
          </div>

          {/* Bio */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Tech enthusiast sharing my latest purchases and finds 🛍️ Always hunting for the best deals!
          </p>

          {/* Profile Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>Joined March 2023</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <ExternalLink className="w-4 h-4 mr-2 text-gray-400" />
              <a href="#" className="text-blue-600 hover:underline">alexthompson.com</a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50/70 rounded-2xl">
              <div className="text-xl font-bold text-gray-900">127</div>
              <div className="text-xs text-gray-500 font-medium">Posts</div>
            </div>
            <div className="text-center p-3 bg-gray-50/70 rounded-2xl">
              <div className="text-xl font-bold text-gray-900">892</div>
              <div className="text-xs text-gray-500 font-medium">Following</div>
            </div>
            <div className="text-center p-3 bg-gray-50/70 rounded-2xl">
              <div className="text-xl font-bold text-gray-900">1.2K</div>
              <div className="text-xs text-gray-500 font-medium">Followers</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
              <span className="text-sm text-gray-700">This Month</span>
              <span className="font-semibold text-blue-700">12 purchases</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
              <span className="text-sm text-gray-700">Total Spent</span>
              <span className="font-semibold text-green-700">$2,847</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
              <span className="text-sm text-gray-700">Avg Rating</span>
              <span className="font-semibold text-orange-600">⭐ 4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
