# Backend Integration Guide

This document outlines the backend integration for the Buy It Share It frontend application with a Java Spring Boot backend.

## Overview

The frontend has been fully integrated to work with a real backend API, replacing all mock data with live data fetching and real-time updates through WebSockets.

## Features Implemented

### 1. API Service Layer (`src/lib/api.ts`)
- **REST API Client**: Complete HTTP client for backend communication
- **React Query Integration**: Efficient data fetching, caching, and state management
- **TypeScript Types**: Strong typing for all API responses and requests
- **Authentication**: JWT token-based authentication support
- **Error Handling**: Comprehensive error handling and retry mechanisms

### 2. WebSocket Service (`src/lib/websocket.ts`)
- **Real-time Updates**: Live updates for posts, likes, reposts, and follows
- **Event-driven Architecture**: Message-based communication
- **Auto-reconnection**: Automatic reconnection with exponential backoff
- **React Integration**: Custom hooks for easy WebSocket usage

### 3. Component Updates

#### PostCard Component
- **Real Data**: Displays actual post data from backend
- **Interactive Actions**: Like and repost functionality with real-time updates
- **Optimistic Updates**: Immediate UI updates with server synchronization
- **Loading States**: Proper loading indicators for async actions

#### Index Page
- **Pagination**: Infinite scroll with load more functionality
- **Loading States**: Skeleton loaders during data fetching
- **Error Handling**: Graceful error states with retry options
- **Empty States**: Proper empty state handling

#### CreatePost Component
- **Form Validation**: Client-side validation with error messages
- **File Upload**: Media upload support with preview
- **Platform Integration**: Dynamic platform selection from backend
- **Success Feedback**: Toast notifications for successful posts

#### UserProfile Component
- **Real User Data**: Displays actual user profile information
- **Follow System**: Follow/unfollow functionality with real-time updates
- **Stats Display**: User statistics and activity tracking
- **Loading States**: Skeleton loaders during data fetching

#### TrendingSidebar Component
- **Live Stats**: Real-time platform statistics
- **Trending Items**: Dynamic trending products with rankings
- **Auto-refresh**: Periodic data refresh with WebSocket updates
- **Responsive Design**: Mobile-optimized layout

## API Endpoints

### Authentication
```typescript
POST /auth/login - User login
POST /auth/register - User registration
GET /users/me - Get current user profile
```

### Posts
```typescript
GET /posts - Get posts with pagination
POST /posts - Create new post
POST /posts/{id}/like - Like/unlike a post
POST /posts/{id}/repost - Repost/unrepost a post
```

### Users
```typescript
GET /users/{username} - Get user profile
POST /users/{id}/follow - Follow/unfollow user
```

### Platform Data
```typescript
GET /platforms - Get available platforms
GET /trending - Get trending items
GET /stats - Get platform statistics
```

## WebSocket Events

### Client to Server
- User authentication
- Post interactions (likes, reposts)
- Follow actions

### Server to Client
- `NEW_POST` - New post created
- `POST_LIKED` - Post liked/unliked
- `POST_REPOSTED` - Post reposted/unreposted
- `USER_FOLLOWED` - User followed/unfollowed
- `TRENDING_UPDATED` - Trending items updated
- `STATS_UPDATED` - Platform statistics updated

## Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8081/api
VITE_WS_URL=ws://localhost:8081/ws
VITE_APP_ENV=development
```

## Backend Requirements

### Spring Boot API Structure

The backend should provide the following endpoints:

#### Authentication Controller
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Login logic
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Registration logic
    }
}
```

#### Post Controller
```java
@RestController
@RequestMapping("/api/posts")
public class PostController {
    
    @GetMapping
    public ResponseEntity<Page<Post>> getPosts(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size) {
        // Get posts with pagination
    }
    
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody CreatePostRequest request) {
        // Create new post
    }
    
    @PostMapping("/{id}/like")
    public ResponseEntity<LikeResponse> toggleLike(@PathVariable String id) {
        // Like/unlike post
    }
    
    @PostMapping("/{id}/repost")
    public ResponseEntity<RepostResponse> toggleRepost(@PathVariable String id) {
        // Repost/unrepost post
    }
}
```

#### User Controller
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        // Get current user profile
    }
    
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserProfile(@PathVariable String username) {
        // Get user profile by username
    }
    
    @PostMapping("/{id}/follow")
    public ResponseEntity<FollowResponse> toggleFollow(@PathVariable String id) {
        // Follow/unfollow user
    }
}
```

#### WebSocket Configuration
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
```

#### WebSocket Event Handlers
```java
@Controller
public class WebSocketEventHandler {
    
    @MessageMapping("/post/like")
    @SendTo("/topic/posts")
    public PostEvent handlePostLike(LikeEvent event) {
        // Handle post like event
    }
    
    @MessageMapping("/post/repost")
    @SendTo("/topic/posts")
    public PostEvent handlePostRepost(RepostEvent event) {
        // Handle post repost event
    }
    
    @MessageMapping("/user/follow")
    @SendTo("/topic/users")
    public UserEvent handleUserFollow(FollowEvent event) {
        // Handle user follow event
    }
}
```

## Data Models

### User Model
```java
public class User {
    private String id;
    private String name;
    private String username;
    private String avatar;
    private String bio;
    private String location;
    private String website;
    private LocalDateTime joinedAt;
    private boolean isVerified;
    private boolean isOnline;
    private int followersCount;
    private int followingCount;
    private int postsCount;
    private BigDecimal totalSpent;
    private double avgRating;
}
```

### Post Model
```java
public class Post {
    private String id;
    private User user;
    private String content;
    private Platform platform;
    private BigDecimal price;
    private String currency;
    private String media;
    private String mediaType;
    private String location;
    private List<String> tags;
    private LocalDateTime timestamp;
    private int likes;
    private int comments;
    private int reposts;
    private boolean isLiked;
    private boolean isReposted;
}
```

### Platform Model
```java
public class Platform {
    private String id;
    private String name;
    private String icon;
    private String color;
}
```

## Security Considerations

### Authentication
- JWT-based authentication
- Token refresh mechanism
- Secure token storage (httpOnly cookies recommended)

### CORS Configuration
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:8080") // Vite dev server and alternate frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### WebSocket Security
- STOMP authentication
- User-specific subscriptions
- Message validation and sanitization

## Performance Optimizations

### Caching
- Redis for session management
- Database query caching
- Static asset caching

### Database
- Connection pooling
- Query optimization
- Indexing strategies

### WebSocket
- Connection pooling
- Message batching
- Event throttling

## Testing

### Frontend Testing
- Component testing with React Testing Library
- API mocking with MSW
- Integration testing

### Backend Testing
- Unit testing with JUnit
- Integration testing with Spring Boot Test
- WebSocket testing with Spring WebSocket Test

## Deployment

### Frontend
```bash
npm run build
# Deploy dist folder to static hosting
```

### Backend
```bash
mvn clean package
# Run with Java 17+
java -jar target/backend.jar
```

## Monitoring

### Frontend
- Error tracking with Sentry
- Performance monitoring
- User analytics

### Backend
- Application metrics with Micrometer
- Health checks
- Log aggregation

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS is properly configured in Spring Boot
   - Check frontend and backend URLs match

2. **WebSocket Connection Issues**
   - Verify WebSocket endpoint is accessible
   - Check firewall and proxy settings

3. **Authentication Problems**
   - Verify JWT token is properly set
   - Check token expiration and refresh logic

4. **Performance Issues**
   - Monitor database query performance
   - Check WebSocket connection count
   - Review caching strategies

### Debug Mode

Enable debug logging:
```env
VITE_APP_ENV=development
```

Backend logging:
```properties
logging.level.com.yourpackage=DEBUG
```

## Future Enhancements

1. **Real-time Notifications**
   - Push notifications
   - Email notifications
   - In-app notifications

2. **Advanced Features**
   - Post scheduling
   - Content moderation
   - Analytics dashboard

3. **Performance**
   - Server-side rendering
   - Progressive Web App
   - Offline support

4. **Security**
   - Two-factor authentication
   - Rate limiting
   - Content filtering

This integration provides a solid foundation for a production-ready social commerce platform with real-time capabilities and robust backend integration.