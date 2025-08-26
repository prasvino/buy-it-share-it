import { useEffect, useRef, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// WebSocket Event Types
export interface WebSocketMessage {
  type: 'NEW_POST' | 'POST_LIKED' | 'POST_REPOSTED' | 'USER_FOLLOWED' | 'TRENDING_UPDATED' | 'STATS_UPDATED';
  payload: any;
  timestamp: string;
}

export interface NewPostPayload {
  post: any;
}

export interface PostLikedPayload {
  postId: string;
  userId: string;
  likesCount: number;
}

export interface PostRepostedPayload {
  postId: string;
  userId: string;
  repostsCount: number;
}

export interface UserFollowedPayload {
  followerId: string;
  followedId: string;
  followersCount: number;
}

export interface TrendingUpdatedPayload {
  trendingItems: any[];
}

export interface StatsUpdatedPayload {
  stats: any;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, ((message: WebSocketMessage) => void)[]> = new Map();
  private isConnected = false;

  constructor(private url: string = import.meta.env.VITE_WS_URL || 'ws://localhost:8081/ws') {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Check if WebSocket is supported
        if (typeof WebSocket === 'undefined') {
          throw new Error('WebSocket is not supported in this environment');
        }

        this.ws = new WebSocket(this.url);
        
        // Set a timeout for connection
        const timeout = setTimeout(() => {
          if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
            this.ws.close();
            reject(new Error('WebSocket connection timeout'));
          }
        }, 5000);

        this.ws.onopen = () => {
          clearTimeout(timeout);
          console.log('WebSocket connected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.isConnected = false;
          // Don't attempt to reconnect in this context, let the application handle it
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnected = false;
          reject(new Error('WebSocket connection failed'));
        };

        // Set a timeout for connection
        const timeout1 = setTimeout(() => {
          if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
            this.ws.close();
            reject(new Error('WebSocket connection timeout'));
          }
        }, 5000);

        // Clear timeout if connection succeeds
        this.ws.onopen = () => {
          clearTimeout(timeout1);
          console.log('WebSocket connected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve();
        };

      } catch (error) {
        console.error('WebSocket connection error:', error);
        reject(error);
      }
    });
  }

  private handleMessage(message: WebSocketMessage): void {
    // Notify all listeners for this message type
    const listeners = this.listeners.get(message.type);
    if (listeners) {
      listeners.forEach(listener => listener(message));
    }

    // Also notify general listeners
    const generalListeners = this.listeners.get('*');
    if (generalListeners) {
      generalListeners.forEach(listener => listener(message));
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      this.connect().catch(error => {
        console.error('Reconnection failed:', error);
      });
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  subscribe(type: string, callback: (message: WebSocketMessage) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(type);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  send(message: any): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  get connected(): boolean {
    return this.isConnected;
  }
}

// Global WebSocket service instance
export const websocketService = new WebSocketService();

// React Hook for WebSocket
export const useWebSocket = () => {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocketService | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // TEMPORARILY DISABLED - Enable after backend WebSocket is configured
    console.log('WebSocket connection temporarily disabled - configure backend WebSocket endpoint first');
    console.log('To enable: Uncomment the code below and restart the frontend');
    
    // Uncomment the code below once your Java backend has WebSocket configured:
    
    // Connect to WebSocket when component mounts
    const connectWebSocket = async () => {
      try {
        await websocketService.connect();
        wsRef.current = websocketService;
        setError(null);

        // Set up message handlers for real-time updates
        setupMessageHandlers();
      } catch (err) {
        console.error('Failed to connect to WebSocket:', err);
        setError(err instanceof Error ? err : new Error('WebSocket connection failed'));
      }
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
    
  }, []);

  const setupMessageHandlers = useCallback(() => {
    // Handle new posts
    websocketService.subscribe('NEW_POST', (message) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    });

    // Handle post likes
    websocketService.subscribe('POST_LIKED', (message) => {
      const payload = message.payload as PostLikedPayload;
      queryClient.setQueryData(['posts'], (oldData: any) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          posts: oldData.posts.map((post: any) => 
            post.id === payload.postId 
              ? { ...post, likes: payload.likesCount, isLiked: true }
              : post
          )
        };
      });
    });

    // Handle post reposts
    websocketService.subscribe('POST_REPOSTED', (message) => {
      const payload = message.payload as PostRepostedPayload;
      queryClient.setQueryData(['posts'], (oldData: any) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          posts: oldData.posts.map((post: any) => 
            post.id === payload.postId 
              ? { ...post, reposts: payload.repostsCount, isReposted: true }
              : post
          )
        };
      });
    });

    // Handle user follows
    websocketService.subscribe('USER_FOLLOWED', (message) => {
      const payload = message.payload as UserFollowedPayload;
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    });

    // Handle trending updates
    websocketService.subscribe('TRENDING_UPDATED', (message) => {
      const payload = message.payload as TrendingUpdatedPayload;
      queryClient.setQueryData(['trending'], payload.trendingItems);
    });

    // Handle stats updates
    websocketService.subscribe('STATS_UPDATED', (message) => {
      const payload = message.payload as StatsUpdatedPayload;
      queryClient.setQueryData(['stats'], payload.stats);
    });
  }, [queryClient]);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current) {
      wsRef.current.send(message);
    }
  }, []);

  return {
    isConnected: websocketService.connected,
    error,
    sendMessage,
    subscribe: websocketService.subscribe.bind(websocketService),
  };
};

// Hook for real-time post updates
export const useRealTimePosts = () => {
  const { subscribe } = useWebSocket();
  
  useEffect(() => {
    const unsubscribe = subscribe('NEW_POST', (message) => {
      // Handle new post notifications
      console.log('New post received:', message.payload);
    });

    return unsubscribe;
  }, [subscribe]);
};

// Hook for real-time notifications
export const useRealTimeNotifications = () => {
  const { subscribe } = useWebSocket();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe('*', (message) => {
      // Handle all types of notifications
      const notification = {
        id: Math.random().toString(36).substr(2, 9),
        type: message.type,
        payload: message.payload,
        timestamp: message.timestamp,
        read: false,
      };

      setNotifications(prev => [notification, ...prev]);
    });

    return unsubscribe;
  }, [subscribe]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    markAsRead,
    clearAll,
    unreadCount: notifications.filter(n => !n.read).length,
  };
};

// Hook for real-time trending updates
export const useRealTimeTrending = () => {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('TRENDING_UPDATED', (message) => {
      console.log('Trending updated:', message.payload);
    });

    return unsubscribe;
  }, [subscribe]);
};

// Hook for real-time stats updates
export const useRealTimeStats = () => {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('STATS_UPDATED', (message) => {
      console.log('Stats updated:', message.payload);
    });

    return unsubscribe;
  }, [subscribe]);
};