import { useState } from "react";
import { 
  Share2, 
  Copy, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail,
  Check,
  ExternalLink,
  Star
} from "lucide-react";
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
import { Input } from "./ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Post } from "@/lib/api";
import { toast } from "sonner";

interface ShareModalProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareModal = ({ post, open, onOpenChange }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();
  
  // Generate the share URL (this would be the actual post URL in production)
  const shareUrl = `${window.location.origin}/post/${post.id}`;
  const shareTitle = `Check out this ${post.platform.name} purchase by ${post.user.name}`;
  const shareText = `${post.content.slice(0, 100)}${post.content.length > 100 ? '...' : ''}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled sharing or sharing failed
        console.log('Web share cancelled or failed');
      }
    } else {
      copyToClipboard();
    }
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: copied ? Check : Copy,
      action: copyToClipboard,
      color: "bg-gray-100 hover:bg-gray-200 text-gray-700",
      description: "Copy link to clipboard"
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=550,height=420');
      },
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
      description: "Share on Twitter"
    },
    {
      name: "Facebook",
      icon: Facebook,
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=550,height=420');
      },
      color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
      description: "Share on Facebook"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=550,height=420');
      },
      color: "bg-blue-100 hover:bg-blue-200 text-blue-900",
      description: "Share on LinkedIn"
    },
    {
      name: "Email",
      icon: Mail,
      action: () => {
        const subject = encodeURIComponent(shareTitle);
        const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      },
      color: "bg-green-100 hover:bg-green-200 text-green-700",
      description: "Share via email"
    },
  ];

  // Add native share option for mobile
  if (isMobile && navigator.share) {
    shareOptions.unshift({
      name: "More Options",
      icon: Share2,
      action: shareViaWebShare,
      color: "bg-purple-100 hover:bg-purple-200 text-purple-700",
      description: "Use system share"
    });
  }

  const ShareContent = () => (
    <div className="space-y-6">
      {/* Post Preview */}
      <div className="bg-gray-50 rounded-2xl p-4 border">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-10 h-10 rounded-2xl object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{post.user.name}</span>
              <span className="text-sm text-gray-500">@{post.user.username}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{post.platform.name}</span>
              <span>•</span>
              <span>${post.price}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-800 overflow-hidden text-ellipsis">{post.content}</p>
      </div>

      {/* Share URL */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Link to share</label>
        <div className="flex space-x-2">
          <Input
            value={shareUrl}
            readOnly
            className="flex-1 text-sm"
          />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="px-3"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Share Options */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Share via</label>
        <div className="grid grid-cols-2 gap-3">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              onClick={option.action}
              variant="ghost"
              className={`${option.color} justify-start space-x-3 h-12 rounded-xl transition-all duration-200 hover:scale-105`}
            >
              <option.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium text-sm">{option.name}</div>
                <div className="text-xs opacity-75">{option.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center space-x-6 pt-4 border-t text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4" />
          <span>{post.likes} likes</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments} comments</span>
        </div>
        <div className="flex items-center space-x-1">
          <Share2 className="w-4 h-4" />
          <span>{post.reposts} shares</span>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Share Post</span>
            </SheetTitle>
          </SheetHeader>
          <ShareContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Post</span>
          </DialogTitle>
        </DialogHeader>
        <ShareContent />
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;