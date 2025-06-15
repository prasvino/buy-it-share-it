
import { Heart, MessageCircle, Repeat, Share, MoreHorizontal } from "lucide-react";
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* User Info Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {/* Platform Badge */}
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${post.platform.color} rounded-full flex items-center justify-center text-xs shadow-md`}>
                {post.platform.icon}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{post.user.name}</h3>
              <p className="text-sm text-gray-500">{post.user.username} · {post.timestamp}</p>
            </div>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
          
          {/* Price Tag */}
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
            <span>💰</span>
            <span>{post.price}</span>
          </div>

          {/* Media */}
          {post.media && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.media}
                alt="Purchase"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        {/* Platform Info */}
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <span>Purchased from</span>
          <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${post.platform.color}`}>
            {post.platform.name}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors ${
              isLiked 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors">
            <Repeat className="w-4 h-4" />
            <span className="text-sm font-medium">{post.reposts}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-purple-500 hover:bg-purple-50 transition-colors">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
