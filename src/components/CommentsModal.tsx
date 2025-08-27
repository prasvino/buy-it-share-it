import { useState, useCallback, useMemo } from "react";
import { Heart, Send, Loader2, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePostComments, useCreateComment, useLikeComment, useCurrentUser } from "@/lib/api";
import { Post, Comment } from "@/lib/api";
import { toast } from "sonner";

interface CommentsModalProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommentsModal = ({ post, open, onOpenChange }: CommentsModalProps) => {
  const [newComment, setNewComment] = useState("");
  const isMobile = useIsMobile();
  
  const { data: commentsData, isLoading } = usePostComments(post.id);
  const { data: currentUser } = useCurrentUser();
  const createCommentMutation = useCreateComment();
  const likeCommentMutation = useLikeComment();

  const handleSubmitComment = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    try {
      await createCommentMutation.mutateAsync({
        postId: post.id,
        content: newComment.trim(),
      });
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  }, [newComment, currentUser, createCommentMutation, post.id]);

  const handleLikeComment = useCallback((commentId: string) => {
    if (!currentUser) {
      toast.error("Please login to like comments");
      return;
    }
    likeCommentMutation.mutate(commentId);
  }, [currentUser, likeCommentMutation]);

  const formatTimestamp = useCallback((timestamp: string) => {
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
  }, []);

  const CommentItem = useCallback(({ comment }: { comment: Comment }) => (
    <div className="flex space-x-3 p-4 hover:bg-gray-50/50 transition-colors duration-200">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage
          src={comment.user.avatar}
          alt={comment.user.name}
        />
        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold text-sm text-gray-900">{comment.user.name}</span>
          <span className="text-xs text-gray-500">@{comment.user.username}</span>
          <span className="text-xs text-gray-500">·</span>
          <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
        </div>
        
        <p className="text-sm text-gray-800 leading-relaxed mb-2">{comment.content}</p>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleLikeComment(comment.id)}
            disabled={likeCommentMutation.isPending || !currentUser}
            className={`flex items-center space-x-1 transition-all duration-200 ${
              comment.isLiked 
                ? 'text-amber-500' 
                : 'text-gray-500 hover:text-amber-500'
            }`}
          >
            <Star className={`w-4 h-4 ${
              comment.isLiked 
                ? 'fill-amber-500 text-amber-500' 
                : ''
            }`} />
            {comment.likes > 0 && (
              <span className="text-xs font-medium">{comment.likes}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  ), [formatTimestamp, handleLikeComment, likeCommentMutation.isPending, currentUser]);

  const CommentsContent = useCallback(() => (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Post Info */}
      <div className="flex-shrink-0 p-4 border-b bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={post.user.avatar}
              alt={post.user.name}
            />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{post.user.name}</span>
              <span className="text-sm text-gray-500">@{post.user.username}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis">{post.content}</p>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : commentsData?.comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No comments yet.</p>
              <p className="text-xs mt-1">Be the first to comment!</p>
            </div>
          ) : (
            commentsData?.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Comment Input */}
      {currentUser && (
        <div className="flex-shrink-0 p-4 border-t bg-white">
          <form onSubmit={handleSubmitComment} className="flex space-x-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage
                src={currentUser.avatar}
                alt={currentUser.name}
              />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 flex space-x-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[40px] max-h-[120px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment(e);
                  }
                }}
              />
              
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim() || createCommentMutation.isPending}
                className="px-3"
              >
                {createCommentMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {!currentUser && (
        <div className="flex-shrink-0 p-4 border-t bg-gray-50 text-center">
          <p className="text-sm text-gray-500">Please login to comment</p>
        </div>
      )}
    </div>
  ), [isLoading, commentsData, post, currentUser, newComment, createCommentMutation.isPending, handleSubmitComment, CommentItem]);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Comments ({post.comments})</SheetTitle>
          </SheetHeader>
          <CommentsContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg h-[80vh] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Comments ({post.comments})</DialogTitle>
        </DialogHeader>
        <CommentsContent />
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;