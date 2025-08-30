
import { useState } from "react";
import { Star, MessageCircle, Repeat, Share, MoreHorizontal, ExternalLink, Zap, Award, Play } from "lucide-react";
import { useLikePost, useRepostPost, useCurrentUser } from "@/lib/api";
import { Post } from "@/lib/api";
import CommentsModal from "./CommentsModal";
import ShareModal from "./ShareModal";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  
  const { data: currentUser } = useCurrentUser();
  const likePostMutation = useLikePost();
  const repostPostMutation = useRepostPost();

  const handleLike = () => {
    if (!currentUser) {
      toast.error("Please login to like posts");
      return;
    }
    
    // Prevent multiple rapid clicks
    if (likePostMutation.isPending) {
      console.log('Like request already pending, ignoring click');
      return;
    }
    
    console.log('Like clicked:', { 
      postId: post.id, 
      currentLiked: post.isLiked, 
      currentCount: post.likes,
      userId: currentUser.id,
      action: post.isLiked ? 'unlike' : 'like'
    });
    
    likePostMutation.mutate(post.id);
  };

  const handleRepost = () => {
    if (!currentUser) {
      toast.error("Please login to repost");
      return;
    }
    repostPostMutation.mutate(post.id);
  };

  const handleComment = () => {
    setShowComments(true);
  };

  const handleShare = () => {
    setShowShare(true);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(price);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
      <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
      </div>

      <div className="p-8">
        {/* Enhanced User Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              {/* Enhanced Profile Image */}
              <div className="w-14 h-14 rounded-3xl overflow-hidden border-3 border-gray-100 group-hover:border-blue-200 transition-all duration-300 hover:scale-110">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Enhanced Platform Badge */}
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${post.platform.color} rounded-2xl flex items-center justify-center text-sm shadow-xl border-3 border-white transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12`}>
                {post.platform.icon}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-700 transition-colors duration-300">
                  {post.user.name}
                  {post.user.isVerified && (
                    <Star className="w-3 h-3 text-yellow-500 fill-current inline ml-1" />
                  )}
                </h3>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="text-sm text-gray-500 font-medium">{formatTimestamp(post.timestamp)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">@{post.user.username}</p>
            </div>
          </div>
          
          <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-2xl transition-all duration-300 group-hover:rotate-90">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Enhanced Content */}
        <div className="mb-6">
          <p className="text-gray-800 leading-relaxed mb-6 text-base font-medium">{post.content}</p>
          
          {/* Enhanced Media with Video Support */}
          {post.media && (
            <div className="relative rounded-3xl overflow-hidden mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <img
                src={post.media}
                alt="Purchase"
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Video Play Button Overlay */}
              {post.mediaType === "video" && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer group/play">
                    <Play className="w-8 h-8 text-gray-800 ml-1 group-hover/play:text-blue-600 transition-colors duration-300" fill="currentColor" />
                  </div>
                </div>
              )}
              
              {/* Video Badge */}
              {post.mediaType === "video" && (
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Play className="w-3 h-3" fill="currentColor" />
                  <span>Video</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          {/* Revolutionary Purchase Card */}
          <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 border-green-100/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute top-2 right-2 w-16 h-16 bg-green-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-2 left-2 w-12 h-12 bg-emerald-200/30 rounded-full blur-lg"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <span className="text-lg">💰</span>
                </div>
                <div>
                  <p className="text-sm text-green-600 font-semibold flex items-center">
                    Purchased from
                    <Zap className="w-3 h-3 ml-1 text-yellow-500" />
                  </p>
                  <p className="text-lg font-bold text-green-800">{post.platform.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-green-700 mb-2 transform transition-all duration-300 group-hover:scale-110">
                  {formatPrice(post.price, post.currency)}
                </p>
                <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700 bg-green-100/50 hover:bg-green-100 px-3 py-2 rounded-xl transition-all duration-300 group-hover:shadow-md">
                  <ExternalLink className="w-3 h-3" />
                  <span className="font-medium">View Deal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              post.isLiked 
                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 shadow-lg shadow-amber-100' 
                : 'text-gray-500 hover:text-amber-500 hover:bg-amber-50 hover:shadow-lg hover:shadow-amber-100'
            }`}
          >
            <Star className={`w-5 h-5 transition-all duration-300 ${
              post.isLiked 
                ? 'fill-amber-500 text-amber-500 scale-125 drop-shadow-sm' 
                : 'hover:scale-125'
            }`} />
            <span className="font-semibold">{post.likes}</span>
          </button>

          <button
            onClick={handleComment}
            className="flex items-center space-x-3 px-6 py-3 rounded-2xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-100"
          >
            <MessageCircle className="w-5 h-5 hover:scale-125 transition-transform duration-300" />
            <span className="font-semibold">{post.comments}</span>
          </button>

          <button
            onClick={handleRepost}
            disabled={repostPostMutation.isPending}
            className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              post.isReposted 
                ? 'text-green-500 bg-green-50 hover:bg-green-100 shadow-lg shadow-green-100' 
                : 'text-gray-500 hover:text-green-500 hover:bg-green-50 hover:shadow-lg hover:shadow-green-100'
            }`}
          >
            <Repeat className={`w-5 h-5 hover:scale-125 transition-transform duration-300 ${post.isReposted ? 'fill-current' : ''}`} />
            <span className="font-semibold">{post.reposts}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-3 px-6 py-3 rounded-2xl text-gray-500 hover:text-purple-500 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-100"
          >
            <Share className="w-5 h-5 hover:scale-125 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Modals */}
      <CommentsModal 
        post={post}
        open={showComments}
        onOpenChange={setShowComments}
      />
      
      <ShareModal 
        post={post}
        open={showShare}
        onOpenChange={setShowShare}
      />
    </div>
  );
};

export default PostCard;
