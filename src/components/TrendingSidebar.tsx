
import { TrendingUp, ShoppingBag, Zap, Star, Fire, Award, Crown, Sparkles } from "lucide-react";

const TrendingSidebar = () => {
  return (
    <div className="space-y-8">
      {/* Trending Purchases - Revolutionary Design */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-2xl shadow-gray-100/50 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 border-b border-gray-100/50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-3">
              <Fire className="w-4 h-4 text-white" />
            </div>
            What's Hot
            <Sparkles className="w-4 h-4 ml-2 text-yellow-500 animate-pulse" />
          </h3>
          <p className="text-sm text-gray-500 mt-1">Trending purchases right now</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-2xl">📱</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-xs text-white font-bold">1</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">iPhone 15 Pro</p>
              <p className="text-sm text-gray-500 mb-1">2,341 purchases today</p>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600">Hot Deal</span>
              </div>
            </div>
            <Crown className="w-5 h-5 text-yellow-500 group-hover:scale-125 transition-transform duration-300" />
          </div>

          <div className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-2xl">👟</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-xs text-white font-bold">2</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Nike Air Max</p>
              <p className="text-sm text-gray-500 mb-1">1,892 purchases</p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-gray-600">Rising</span>
              </div>
            </div>
            <Award className="w-5 h-5 text-green-500 group-hover:scale-125 transition-transform duration-300" />
          </div>

          <div className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-2xl">💻</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">MacBook Pro</p>
              <p className="text-sm text-gray-500 mb-1">1,456 purchases</p>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-gray-600">Popular</span>
              </div>
            </div>
            <Star className="w-5 h-5 text-purple-500 group-hover:scale-125 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Card */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-2xl shadow-gray-100/50">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 border-b border-gray-100/50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-3">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            Live Stats
          </h3>
          <p className="text-sm text-gray-500 mt-1">Real-time platform activity</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-3xl border border-blue-100/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold">📊</span>
              </div>
              <span className="font-semibold text-blue-700">Total Posts</span>
            </div>
            <span className="text-2xl font-bold text-blue-800 group-hover:scale-110 transition-transform duration-300">12.5k</span>
          </div>
          
          <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-3xl border border-green-100/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold">💰</span>
              </div>
              <span className="font-semibold text-green-700">Money Spent</span>
            </div>
            <span className="text-2xl font-bold text-green-800 group-hover:scale-110 transition-transform duration-300">$2.1M</span>
          </div>
          
          <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-3xl border border-purple-100/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold">👥</span>
              </div>
              <span className="font-semibold text-purple-700">Active Users</span>
            </div>
            <span className="text-2xl font-bold text-purple-800 group-hover:scale-110 transition-transform duration-300">8.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;
