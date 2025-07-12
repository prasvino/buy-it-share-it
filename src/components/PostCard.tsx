
import { Heart, MessageCircle, Repeat, Share, MoreHorizontal, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Post {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  platform: {
    name: string;
    icon: string;
    color: string;
  };
  price: string;
  media?: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 group">
      <div className="p-6">
        {/* User Info Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors duration-200"
              />
              {/* Platform Badge */}
              <div className={`absolute -bottom-1 -right-1 w-7 h-7 ${post.platform.color} rounded-xl flex items-center justify-center text-xs shadow-lg border-2 border-white`}>
                {post.platform.icon}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 text-sm">{post.user.name}</h3>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{post.user.username}</p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed mb-4 text-sm">{post.content}</p>
          
          {/* Media */}
          {post.media && (
            <div className="rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img
                src={post.media}
                alt="Purchase"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Purchase Details Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-sm">💰</span>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium">Purchased from</p>
                  <p className="text-sm font-semibold text-green-800">{post.platform.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-700">{post.price}</p>
                <button className="text-xs text-green-600 hover:text-green-700 flex items-center space-x-1 mt-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl transition-all duration-200 ${
              isLiked 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-gray-500 hover:text-green-500 hover:bg-green-50 transition-all duration-200">
            <Repeat className="w-4 h-4" />
            <span className="text-sm font-medium">{post.reposts}</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-gray-500 hover:text-purple-500 hover:bg-purple-50 transition-all duration-200">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
