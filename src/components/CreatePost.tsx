
import { useState, useEffect, useRef } from "react";
import { Image, MapPin, DollarSign, Tag, Smile, Camera, Globe, Sparkles, Zap, AlertCircle, CheckCircle, X, Plus, Calendar, Link, Eye, EyeOff, Users } from "lucide-react";
import { useCreatePost, usePlatforms } from "@/lib/api";
import { CreatePostRequest, Platform } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CreatePost = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE" | "FRIENDS">("PUBLIC");
  const [media, setMedia] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | "">("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: platforms, isLoading: platformsLoading } = usePlatforms();
  const createPostMutation = useCreatePost();
  const { toast } = useToast();

  // Cleanup media URL on unmount to prevent memory leaks
  useEffect(() => {
    // Set today's date as default
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    
    return () => {
      if (media && media.startsWith('blob:')) {
        URL.revokeObjectURL(media);
      }
    };
  }, [media]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!postContent.trim()) {
      newErrors.content = "Please add some content to your post";
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    // Validate product URL if provided
    if (productUrl.trim()) {
      try {
        new URL(productUrl);
      } catch {
        newErrors.productUrl = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const postData: CreatePostRequest = {
        text: postContent.trim(), // Backend expects 'text' field
        platformId: selectedPlatform || null,
        price: parseFloat(price),
        currency: "USD", // Default currency, can be made configurable
        purchaseDate: purchaseDate || new Date().toISOString().split('T')[0], // Use today if not specified
        productUrl: productUrl.trim() || undefined,
        visibility: visibility,
        mediaIds: [], // TODO: Handle media upload to get actual media IDs
        // Legacy fields for backward compatibility
        media: media || undefined,
        mediaType: mediaType || undefined,
        location: location.trim() || undefined,
        tags: tagsList.length > 0 ? tagsList : (tags.trim() ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : undefined),
      };

      await createPostMutation.mutateAsync(postData);
      
      // Reset form
      setPostContent("");
      setSelectedPlatform("");
      setPrice("");
      setPurchaseDate("");
      setProductUrl("");
      setVisibility("PUBLIC");
      if (media && media.startsWith('blob:')) {
        URL.revokeObjectURL(media);
      }
      setMedia("");
      setMediaFile(null);
      setMediaType("");
      setLocation("");
      setTags("");
      setTagsList([]);
      setCurrentTag("");
      setErrors({});
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      // Show success toast
      toast({
        title: "Post created successfully!",
        description: "Your purchase has been shared with the community.",
        variant: "default",
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Failed to create post",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select an image (JPEG, PNG, GIF, WebP) or video (MP4, WebM, OGG) file",
          variant: "destructive",
        });
        return;
      }

      // Clean up previous media URL
      if (media && media.startsWith('blob:')) {
        URL.revokeObjectURL(media);
      }

      // Create new URL and set media
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaFile(file);
      setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
      
      toast({
        title: "Media uploaded",
        description: `${file.type.startsWith('video/') ? 'Video' : 'Image'} ready to share!`,
      });
    }
  };

  const formatPrice = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return numericValue;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPrice(e.target.value);
    setPrice(formattedValue);
  };

  // Tag management functions
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tagsList.includes(trimmedTag) && tagsList.length < 10) {
      setTagsList([...tagsList, trimmedTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagsList(tagsList.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(currentTag);
    }
  };

  // Location functions
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you would use a reverse geocoding service
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          toast({
            title: "Location added",
            description: "Your current location has been added to the post",
          });
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please enable location access or enter manually",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Please enter your location manually",
        variant: "destructive",
      });
    }
  };

  if (platformsLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-2xl shadow-gray-100/50 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-2xl shadow-gray-100/50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-gray-100/50">
        <div className="flex items-center space-x-4">
          {/* Enhanced User Avatar */}
          <div className="relative group">
            <div className="w-14 h-14 rounded-3xl overflow-hidden border-3 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                alt="Your avatar"
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Share Your Purchase</h3>
            <p className="text-sm text-gray-500">What did you buy today?</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Textarea */}
        <div className="mb-6">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your purchase experience, thoughts, and recommendations... *"
            className={`w-full resize-none border-none outline-none text-base placeholder-gray-400 bg-transparent leading-relaxed min-h-[100px] focus:placeholder-gray-300 transition-colors duration-200 ${
              errors.content ? 'text-red-600' : ''
            }`}
            rows={4}
          />
          {errors.content && (
            <div className="flex items-center mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.content}
            </div>
          )}
        </div>

        {/* Media Upload */}
        {media && (
          <div className="mb-6">
            <div className="relative rounded-3xl overflow-hidden">
              {mediaType === 'video' ? (
                <video src={media} className="w-full h-72 object-cover" controls />
              ) : (
                <img src={media} alt="Upload preview" className="w-full h-72 object-cover" />
              )}
              <button
                type="button"
                onClick={() => {
                  if (media && media.startsWith('blob:')) {
                    URL.revokeObjectURL(media);
                  }
                  setMedia("");
                  setMediaFile(null);
                  setMediaType("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Purchase Details Card */}
        <div className="bg-gradient-to-br from-gray-50/80 to-blue-50/50 rounded-3xl p-6 mb-6 border border-gray-100/50 hover:shadow-lg transition-all duration-300">
          <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
            Purchase Details
            <Zap className="w-4 h-4 ml-2 text-yellow-500" />
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Platform Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Where did you shop?
              </label>
              <div className="relative group">
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className={`w-full p-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md appearance-none cursor-pointer ${
                    errors.platform ? 'border-red-300 focus:ring-red-500/30 focus:border-red-400/50' : ''
                  }`}
                >
                  <option value="">Choose a platform (optional)</option>
                  {platforms?.map((platform: Platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.icon} {platform.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>
              {errors.platform && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.platform}
                </div>
              )}
            </div>

            {/* Enhanced Price Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                How much did you spend? *
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                  className={`w-full pl-16 pr-4 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-green-500/30 focus:border-green-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md ${
                    errors.price ? 'border-red-300 focus:ring-red-500/30 focus:border-red-400/50' : ''
                  }`}
                />
              </div>
              {errors.price && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.price}
                </div>
              )}
            </div>
          </div>

          {/* Purchase Date and Product URL */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Purchase Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                When did you buy it?
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                </div>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]} // Can't select future dates
                  className="w-full pl-16 pr-4 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md"
                />
              </div>
              <p className="text-xs text-gray-500">Leave empty for today's date</p>
            </div>

            {/* Product URL */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Product Link (optional)
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Link className="w-4 h-4 text-white" />
                  </div>
                </div>
                <input
                  type="url"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="https://example.com/product"
                  className={`w-full pl-16 pr-4 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md ${
                    errors.productUrl ? 'border-red-300 focus:ring-red-500/30 focus:border-red-400/50' : ''
                  }`}
                />
              </div>
              {errors.productUrl && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.productUrl}
                </div>
              )}
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Location (optional)
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location or click 'Add Location' for GPS"
                  className="w-full pl-16 pr-4 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tags (optional)
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Add tags (press Enter or comma to add)"
                  className="w-full pl-16 pr-4 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 outline-none transition-all duration-300 text-sm font-medium hover:bg-white hover:shadow-md"
                />
                {currentTag.trim() && (
                  <button
                    type="button"
                    onClick={() => addTag(currentTag)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white rounded-lg px-3 py-1 text-xs font-medium hover:bg-purple-600 transition-colors"
                  >
                    Add
                  </button>
                )}
              </div>
              
              {/* Display added tags */}
              {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tagsList.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium border border-purple-200"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-purple-200 rounded-full p-1 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {tagsList.length >= 10 && (
                    <span className="text-xs text-gray-500 italic">Max 10 tags</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visibility Selector */}
        <div className="bg-gradient-to-br from-gray-50/80 to-purple-50/50 rounded-3xl p-6 mb-6 border border-gray-100/50">
          <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 animate-pulse"></div>
            Who can see this post?
            <Eye className="w-4 h-4 ml-2 text-purple-500" />
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setVisibility("PUBLIC")}
              className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                visibility === "PUBLIC"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white/80 text-gray-600 hover:border-green-300 hover:bg-green-50/50"
              }`}
            >
              <Globe className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold text-sm">Public</div>
                <div className="text-xs opacity-75">Everyone can see</div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setVisibility("FRIENDS")}
              className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                visibility === "FRIENDS"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white/80 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <Users className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold text-sm">Friends</div>
                <div className="text-xs opacity-75">Friends only</div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setVisibility("PRIVATE")}
              className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                visibility === "PRIVATE"
                  ? "border-gray-500 bg-gray-50 text-gray-700"
                  : "border-gray-200 bg-white/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/50"
              }`}
            >
              <EyeOff className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold text-sm">Private</div>
                <div className="text-xs opacity-75">Only you</div>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
          <div className="flex items-center space-x-1 overflow-x-auto">
            <label className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
              />
              <Camera className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden sm:inline">
                {media ? 'Change Media' : 'Photo/Video'}
              </span>
            </label>
            
            <button 
              type="button" 
              onClick={getCurrentLocation}
              className="flex items-center space-x-2 text-green-600 hover:bg-green-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md"
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden sm:inline">
                {location ? 'Update Location' : 'Add Location'}
              </span>
            </button>
            
            <button 
              type="button" 
              onClick={() => {
                // Focus on the tag input
                const tagInput = document.querySelector('input[placeholder*="Add tags"]') as HTMLInputElement;
                tagInput?.focus();
              }}
              className="flex items-center space-x-2 text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md"
            >
              <Tag className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden sm:inline">
                {tagsList.length > 0 ? `${tagsList.length} Tags` : 'Add Tags'}
              </span>
            </button>
            
            <button type="button" className="flex items-center space-x-2 text-yellow-600 hover:bg-yellow-50 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 group hover:shadow-md">
              <Smile className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Enhanced Share Button */}
          <Button
            type="submit"
            disabled={createPostMutation.isPending}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-2">
              {createPostMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Share Purchase</span>
                  <CheckCircle className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                </>
              )}
            </div>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
