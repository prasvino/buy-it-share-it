
import { TrendingUp, ShoppingBag, Zap, Star, Flame, Award, Crown, Sparkles } from "lucide-react";
import { useTrendingItems, useStats } from "@/lib/api";
import { useRealTimeTrending, useRealTimeStats } from "@/lib/websocket";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingItem, Stats } from "@/lib/api";

const TrendingSidebar = () => {
  const { data: trendingItems, isLoading: trendingLoading } = useTrendingItems();
  const { data: stats, isLoading: statsLoading } = useStats();
  
  // Enable real-time updates
  useRealTimeTrending();
  useRealTimeStats();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(amount);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Award className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-600" />;
      default:
        return <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-green-500';
      case 3:
        return 'bg-purple-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Trending Purchases - Revolutionary Design */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-2xl shadow-gray-100/50 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 border-b border-gray-100/50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-3">
              <Flame className="w-4 h-4 text-white" />
            </div>
            What's Hot
            <Sparkles className="w-4 h-4 ml-2 text-yellow-500 animate-pulse" />
          </h3>
          <p className="text-sm text-gray-500 mt-1">Trending purchases right now</p>
        </div>
        
        <div className="p-6 space-y-4">
          {trendingLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-3xl">
                <Skeleton className="w-16 h-16 rounded-3xl" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            ))
          ) : trendingItems?.length === 0 ? (
            // Empty state
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-500 text-sm">No trending items yet</p>
            </div>
          ) : (
            // Trending items list
            trendingItems?.map((item: TrendingItem) => (
              <div 
                key={item.id} 
                className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 ${getRankColor(item.rank)} rounded-full flex items-center justify-center border-2 border-white text-xs text-white font-bold`}>
                    {item.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{item.name}</p>
                  <p className="text-sm text-gray-500 mb-1">{formatNumber(item.purchasesToday)} purchases today</p>
                  <div className="flex items-center space-x-1">
                    {item.isHot && (
                      <Star className="w-3 h-3 text-red-500 fill-current" />
                    )}
                    {item.isRising && (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    )}
                    <span className="text-xs text-gray-600">
                      {item.isHot ? 'Hot Deal' : item.isRising ? 'Rising' : 'Popular'}
                    </span>
                  </div>
                </div>
                {getRankIcon(item.rank)}
              </div>
            ))
          )}
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
          {statsLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center p-5 rounded-3xl">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-2xl" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))
          ) : stats ? (
            // Stats data
            <>
              <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-3xl border border-blue-100/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold">📊</span>
                  </div>
                  <span className="font-semibold text-blue-700">Total Posts</span>
                </div>
                <span className="text-2xl font-bold text-blue-800 group-hover:scale-110 transition-transform duration-300">
                  {formatNumber(stats.totalPosts)}
                </span>
              </div>
              
              <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-3xl border border-green-100/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold">💰</span>
                  </div>
                  <span className="font-semibold text-green-700">Money Spent</span>
                </div>
                <span className="text-2xl font-bold text-green-800 group-hover:scale-110 transition-transform duration-300">
                  {formatCurrency(stats.totalMoneySpent)}
                </span>
              </div>
              
              <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-3xl border border-purple-100/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold">👥</span>
                  </div>
                  <span className="font-semibold text-purple-700">Active Users</span>
                </div>
                <span className="text-2xl font-bold text-purple-800 group-hover:scale-110 transition-transform duration-300">
                  {formatNumber(stats.activeUsers)}
                </span>
              </div>
            </>
          ) : (
            // Error state
            <div className="text-center py-8">
              <div className="text-4xl mb-2">⚠️</div>
              <p className="text-gray-500 text-sm">Failed to load stats</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;
