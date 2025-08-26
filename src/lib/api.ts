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
  // Legacy fields for backward compatibility
  media?: string;
  mediaType?: 'image' | 'video';
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
    return this.request<{ liked: boolean; likesCount: number }>(`/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  async repostPost(postId: string): Promise<{ reposted: boolean; repostsCount: number }> {
    return this.request<{ reposted: boolean; repostsCount: number }>(`/posts/${postId}/repost`, {
      method: 'POST',
    });
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
    onSuccess: (_, postId) => {
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