
import { MapPin, Calendar, ExternalLink, Settings, Users, UserPlus, Star, Award, TrendingUp } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-xl shadow-gray-100/50 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/30">
      {/* Enhanced Cover with Floating Elements */}
      <div className="relative h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-2 right-4 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-4 right-12 w-4 h-4 bg-white/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-2 left-8 w-6 h-6 bg-white/20 rounded-full animate-bounce delay-700"></div>
        
        {/* Profile Image with Enhanced Style */}
        <div className="absolute -bottom-8 left-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white shadow-2xl transform transition-all duration-300 hover:scale-110">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-2xl text-white hover:bg-white/30 transition-all duration-300 group">
          <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>

      <div className="pt-12 p-6">
        {/* Profile Info with Enhanced Layout */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Alex Thompson</h2>
              <p className="text-sm text-gray-500 flex items-center">
                @alexthompson
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-current" />
              </p>
            </div>
            <button className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Follow</span>
              </div>
            </button>
          </div>

          {/* Enhanced Bio */}
          <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl p-4 mb-4 border border-blue-100/50">
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              Tech enthusiast sharing my latest purchases and finds 🛍️ Always hunting for the best deals!
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center"><Award className="w-3 h-3 mr-1" /> Top Reviewer</span>
              <span className="flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Trendsetter</span>
            </div>
          </div>

          {/* Profile Details with Icons */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600 text-sm group hover:text-blue-600 transition-colors duration-200">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors duration-200">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm group hover:text-green-600 transition-colors duration-200">
              <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors duration-200">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <span>Joined March 2023</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm group hover:text-purple-600 transition-colors duration-200">
              <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors duration-200">
                <ExternalLink className="w-4 h-4 text-purple-600" />
              </div>
              <a href="#" className="text-blue-600 hover:underline">alexthompson.com</a>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl font-bold text-blue-700 mb-1 group-hover:scale-110 transition-transform duration-300">127</div>
              <div className="text-xs text-blue-600 font-medium">Posts</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl font-bold text-green-700 mb-1 group-hover:scale-110 transition-transform duration-300">892</div>
              <div className="text-xs text-green-600 font-medium">Following</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl font-bold text-purple-700 mb-1 group-hover:scale-110 transition-transform duration-300">1.2K</div>
              <div className="text-xs text-purple-600 font-medium">Followers</div>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="border-t border-gray-100/50 pt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 animate-pulse"></div>
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-2xl border border-blue-100/30 hover:shadow-md transition-all duration-300 group">
              <span className="text-sm text-blue-700 font-medium">This Month</span>
              <span className="font-bold text-blue-800 group-hover:scale-110 transition-transform duration-300">12 purchases</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-100/30 hover:shadow-md transition-all duration-300 group">
              <span className="text-sm text-green-700 font-medium">Total Spent</span>
              <span className="font-bold text-green-800 group-hover:scale-110 transition-transform duration-300">$2,847</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50/80 to-orange-50/80 rounded-2xl border border-yellow-100/30 hover:shadow-md transition-all duration-300 group">
              <span className="text-sm text-orange-700 font-medium">Avg Rating</span>
              <span className="font-bold text-orange-800 flex items-center group-hover:scale-110 transition-transform duration-300">
                ⭐ 4.8
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
