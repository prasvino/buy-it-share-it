import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

// Types
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  totalSpent: number;
  avgRating: number;
  isOnline: boolean;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  platform: Platform;
  price: number;
  currency: string;
  media?: string;
  mediaType?: 'image' | 'video';
  location?: string;
  tags?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  isLiked: boolean;
  isReposted: boolean;
}

export interface CreatePostRequest {
  text: string; // Backend expects 'text' instead of 'content'
  platformId: string | null;
  price: number;
  currency: string;
  purchaseDate?: string;
  productUrl?: string;
  mediaIds?: string[];
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  location?: string;
  tags?: string[];
}

export interface TrendingItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  purchasesToday: number;
  rank: number;
  isHot: boolean;
  isRising: boolean;
}

export interface Stats {
  totalPosts: number;
  totalMoneySpent: number;
  activeUsers: number;
}

export interface ShareData {
  url: string;
  title: string;
  text: string;
}

export interface SearchParams {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface SearchResponse {
  posts: Post[];
  total: number;
  page: number;
  size: number;
  hasNext: boolean;
  keyword?: string;
  error?: string;
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    // Debug logging
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
    console.log(`Headers:`, config.headers);
    if (options.body) {
      console.log(`Body:`, options.body);
    }

    try {
      const response = await fetch(url, config);
      
      console.log(`API Response: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error Response:`, errorText);
        
        // Handle authentication errors
        if (response.status === 401) {
          // Clear invalid token
          clearAuthToken();
          throw new Error('Authentication failed. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`API Success Data:`, data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Posts API
  async getPosts(page: number = 1, limit: number = 10): Promise<{ posts: Post[]; total: number }> {
    return this.request<{ posts: Post[]; total: number }>(`/posts?page=${page}&limit=${limit}`);
  }

  async createPost(postData: CreatePostRequest): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async likePost(postId: string): Promise<{ liked: boolean; likesCount: number }> {
    console.log('API: Sending like/unlike request for post:', postId);
    console.log('API: Request URL:', `${this.baseUrl}/posts/${postId}/like`);
    
    const response = await this.request<{ liked: boolean; likesCount: number }>(`/posts/${postId}/like`, {
      method: 'POST',
    });
    
    console.log('API: Like/unlike response received:', {
      postId,
      liked: response.liked,
      likesCount: response.likesCount,
      action: response.liked ? 'liked' : 'unliked'
    });
    
    return response;
  }

  async repostPost(postId: string): Promise<{ reposted: boolean; repostsCount: number }> {
    return this.request<{ reposted: boolean; repostsCount: number }>(`/posts/${postId}/repost`, {
      method: 'POST',
    });
  }

  // Comments API
  async getPostComments(postId: string, page: number = 1, limit: number = 20): Promise<{ comments: Comment[]; total: number }> {
    return this.request<{ comments: Comment[]; total: number }>(`/posts/${postId}/comments?page=${page}&limit=${limit}`);
  }

  async createComment(postId: string, content: string): Promise<Comment> {
    return this.request<Comment>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text: content }),
    });
  }

  async likeComment(commentId: string): Promise<{ liked: boolean; likesCount: number }> {
    console.log('API: Sending like request for comment:', commentId);
    const response = await this.request<{ liked: boolean; likesCount: number }>(`/comments/${commentId}/like`, {
      method: 'POST',
    });
    console.log('API: Comment like response received:', response);
    return response;
  }

  // User API
  async getCurrentUser(): Promise<User> {
    // return this.request<User>('/users/me');
    return this.request<User>('/auth/me');
  }

  async getUserProfile(username: string): Promise<User> {
    return this.request<User>(`/users/${username}`);
  }

  async followUser(userId: string): Promise<{ following: boolean; followersCount: number }> {
    return this.request<{ following: boolean; followersCount: number }>(`/users/${userId}/follow`, {
      method: 'POST',
    });
  }

  // Trending API
  async getTrendingItems(): Promise<TrendingItem[]> {
    return this.request<TrendingItem[]>('/trending');
  }

  async getStats(): Promise<Stats> {
    return this.request<Stats>('/stats');
  }

  // Platforms API
  async getPlatforms(): Promise<Platform[]> {
    return this.request<Platform[]>('/platforms');
  }

  // Search API
  async searchPosts(params: SearchParams = {}): Promise<SearchResponse> {
    const searchParams = new URLSearchParams({
      page: (params.page || 0).toString(),
      size: (params.size || 10).toString()
    });
    
    if (params.keyword && params.keyword.trim().length >= 2) {
      searchParams.append('keyword', params.keyword.trim());
    }
    
    return this.request<SearchResponse>(`/posts/search?${searchParams}`);
  }

  // Media Upload API - Presigned Upload Flow
  async requestSasUpload(file: File): Promise<{ uploadUrl: string; fileUrl: string; mediaId: string }> {
    const requestData = {
      fileName: file.name,
      fileType: file.type,
      size: file.size
    };
    
    console.log('Requesting SAS upload for:', requestData);
    
    return this.request<{ uploadUrl: string; fileUrl: string; mediaId: string }>('/api/v1/media/sas', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  // Auth API
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    return this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    name: string;
    username: string;
    email: string;
    password: string;
  }): Promise<{ token: string; user: User }> {
    return this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
}

export const apiClient = new ApiClient();

// Authentication utilities
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('auth_token');
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new CustomEvent('authChange'));
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new CustomEvent('authChange'));
};

// React Query Hooks
export const usePosts = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => apiClient.getPosts(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchPosts = (params: SearchParams) => {
  return useQuery({
    queryKey: ['posts', 'search', params.keyword, params.page, params.size],
    queryFn: () => apiClient.searchPosts(params),
    enabled: !params.keyword || params.keyword.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postData: CreatePostRequest) => apiClient.createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => apiClient.likePost(postId),
    onSuccess: (response, postId) => {
      console.log('Like mutation success:', { 
        postId, 
        serverResponse: response,
        newState: response.liked ? 'LIKED' : 'UNLIKED',
        newCount: response.likesCount
      });
      
      // Update all posts queries with the authoritative server response
      queryClient.setQueriesData(
        { queryKey: ['posts'] },
        (old: any) => {
          if (!old || !old.posts) return old;
          
          const updated = {
            ...old,
            posts: old.posts.map((post: Post) => {
              if (post.id === postId) {
                const previousState = { isLiked: post.isLiked, likes: post.likes };
                const updatedPost = {
                  ...post,
                  isLiked: response.liked,
                  likes: response.likesCount
                };
                
                console.log('Post state updated:', {
                  postId,
                  previousState,
                  newState: { isLiked: updatedPost.isLiked, likes: updatedPost.likes },
                  serverResponse: response
                });
                
                return updatedPost;
              }
              return post;
            })
          };
          
          return updated;
        }
      );
    },
    onError: (err, postId) => {
      console.error('Like post error:', { postId, error: err });
      // Invalidate queries to refresh from server on error
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useRepostPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => apiClient.repostPost(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.getCurrentUser(),
    enabled: isAuthenticated(), // Only run when token exists
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry if unauthorized
  });
};

export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => apiClient.getUserProfile(username),
    enabled: !!username,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => apiClient.followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useTrendingItems = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: () => apiClient.getTrendingItems(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => apiClient.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export const usePlatforms = () => {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: () => apiClient.getPlatforms(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiClient.login(email, password),
    onSuccess: (data) => {
      setAuthToken(data.token);
      // Invalidate and refetch current user data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: { name: string; username: string; email: string; password: string }) =>
      apiClient.register(userData),
    onSuccess: (data) => {
      setAuthToken(data.token);
      // Invalidate and refetch current user data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Clear the auth token
      clearAuthToken();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
};

// Comments hooks
export const usePostComments = (postId: string, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['comments', postId, page, limit],
    queryFn: () => apiClient.getPostComments(postId, page, limit),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) => 
      apiClient.createComment(postId, content),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (commentId: string) => apiClient.likeComment(commentId),
    onSuccess: (response, commentId) => {
      console.log('Comment server response received:', { commentId, response });
      
      // Update all comments queries with the authoritative server response
      queryClient.setQueriesData(
        { queryKey: ['comments'] },
        (old: any) => {
          if (!old || !old.comments) return old;
          
          return {
            ...old,
            comments: old.comments.map((comment: Comment) => {
              if (comment.id === commentId) {
                const updatedComment = {
                  ...comment,
                  isLiked: response.liked,
                  likes: response.likesCount
                };
                console.log('Updated comment with server data:', { 
                  commentId, 
                  serverLiked: response.liked, 
                  serverCount: response.likesCount 
                });
                return updatedComment;
              }
              return comment;
            })
          };
        }
      );
    },
    onError: (err, commentId) => {
      console.error('Like comment error:', err);
      // Invalidate queries to refresh from server on error
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};