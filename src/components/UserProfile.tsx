
import { MapPin, Calendar, ExternalLink } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
        />
        <h2 className="text-xl font-bold text-gray-800">Alex Thompson</h2>
        <p className="text-gray-500">@alexthompson</p>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">
          Tech enthusiast sharing my latest purchases and finds 🛍️ Always hunting for the best deals!
        </p>
      </div>

      {/* Profile Details */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>San Francisco, CA</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Joined March 2023</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          <a href="#" className="text-blue-600 hover:underline">alexthompson.com</a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">127</div>
          <div className="text-xs text-gray-500">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">892</div>
          <div className="text-xs text-gray-500">Following</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">1.2K</div>
          <div className="text-xs text-gray-500">Followers</div>
        </div>
      </div>

      {/* Recent Purchase Stats */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Activity</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">This Month</span>
            <span className="font-medium text-gray-800">12 purchases</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Spent</span>
            <span className="font-medium text-green-600">$2,847</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avg Rating</span>
            <span className="font-medium text-yellow-600">⭐ 4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
