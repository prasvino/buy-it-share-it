# Buy It Share It - Project Download Guide

## 📦 Project Overview

This is the complete Buy It Share It social e-commerce platform with full backend integration and real-time features. The project has been transformed from a static demo into a production-ready application.

## 🛠️ Recent Fixes

### ✅ Import Issues Resolved
- **Fixed**: Import errors for `useRealTimePosts`, `useRealTimeTrending`, and `useRealTimeStats` hooks
- **Solution**: These hooks are now correctly imported from `@/lib/websocket` instead of `@/lib/api`
- **Files Updated**: 
  - `src/pages/Index.tsx` - Fixed `useRealTimePosts` import
  - `src/components/TrendingSidebar.tsx` - Fixed `useRealTimeTrending` and `useRealTimeStats` imports

### ✅ QueryClientProvider Issue Fixed
- **Fixed**: "No QueryClient set, use QueryClientProvider to set one" error
- **Problem**: `useWebSocket()` was called outside of `QueryClientProvider` context
- **Solution**: Created `WebSocketInitializer` component and moved `useWebSocket()` call inside `QueryClientProvider`
- **Files Updated**:
  - `src/App.tsx` - Removed direct `useWebSocket()` call, added `WebSocketInitializer` component
  - `src/components/WebSocketInitializer.tsx` - New component to handle WebSocket initialization

### ✅ WebSocket Connection Issues Fixed
- **Fixed**: WebSocket connection errors and timeouts
- **Problem**: WebSocket service was not resilient to connection failures
- **Solution**: Added error handling, timeouts, and graceful degradation
- **Files Updated**:
  - `src/lib/websocket.ts` - Enhanced error handling, timeout support, and connection resilience
  - `src/components/WebSocketInitializer.tsx` - Added error state logging and handling

## 🗂️ File Structure

### Core Files Included:

#### 🔧 Backend Integration
- **`src/lib/api.ts`** - Complete REST API client with React Query hooks
- **`src/lib/websocket.ts`** - Real-time WebSocket service with event handling

#### 🎨 Updated Components
- **`src/App.tsx`** - Main app component with QueryClientProvider and WebSocketInitializer (FIXED)
- **`src/components/PostCard.tsx`** - Enhanced with real data, interactions, and optimistic updates
- **`src/pages/Index.tsx`** - Main feed with pagination, loading states, and error handling (FIXED)
- **`src/components/CreatePost.tsx`** - Full-featured post creation with validation and file upload
- **`src/components/UserProfile.tsx`** - Real user data with follow system and statistics
- **`src/components/TrendingSidebar.tsx`** - Real-time trending items and live stats (FIXED)

#### 🛡️ Error Handling & Performance
- **`src/components/ErrorBoundary.tsx`** - Global error boundary with graceful fallbacks
- **`src/components/WebSocketInitializer.tsx`** - WebSocket connection initializer (NEW)

#### 📚 Documentation
- **`BACKEND_INTEGRATION.md`** - Backend integration guide and API specifications
- **`INTEGRATION_SUMMARY.md`** - Complete integration summary and feature overview
- **`PROJECT_DOWNLOAD_GUIDE.md`** - This file - usage instructions

#### ⚙️ Configuration
- **`package.json`** - Updated dependencies and scripts

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Backend Setup
The project expects a Java Spring Boot backend running on `http://localhost:8080`. Refer to `BACKEND_INTEGRATION.md` for API specifications.

## 🔧 Key Features

### Real-time Features
- ✅ Live post updates via WebSocket
- ✅ Real-time notifications
- ✅ Instant like/repost feedback
- ✅ Live trending data updates
- ✅ Real-time statistics

### Advanced Functionality
- ✅ Complete CRUD operations
- ✅ JWT authentication integration
- ✅ File upload support
- ✅ Form validation
- ✅ Error boundaries
- ✅ Loading states
- ✅ Pagination
- ✅ Responsive design

### Performance Optimizations
- ✅ React Query caching
- ✅ Optimistic updates
- ✅ Skeleton loading states
- ✅ Connection management
- ✅ Automatic reconnection

## 📱 Technology Stack

### Frontend
- **React 18.3.1** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for data fetching
- **WebSocket** for real-time features

### Backend Integration
- **REST API** with full CRUD support
- **JWT Authentication**
- **WebSocket** for real-time updates
- **File Upload** capabilities

## 🔄 Integration Points

### API Endpoints
- `GET /api/posts` - Fetch posts with pagination
- `POST /api/posts` - Create new posts
- `POST /api/posts/{id}/like` - Like/unlike posts
- `POST /api/posts/{id}/repost` - Repost posts
- `GET /api/users/me` - Get current user
- `GET /api/users/{username}` - Get user profile
- `POST /api/users/{id}/follow` - Follow/unfollow users
- `GET /api/trending` - Get trending items
- `GET /api/stats` - Get platform statistics
- `GET /api/platforms` - Get available platforms

### WebSocket Events
- `NEW_POST` - New post created
- `POST_LIKED` - Post liked/unliked
- `POST_REPOSTED` - Post reposted
- `USER_FOLLOWED` - User followed/unfollowed
- `TRENDING_UPDATED` - Trending data updated
- `STATS_UPDATED` - Platform statistics updated

## 🛠️ Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 🎯 Usage Examples

### Creating a Post
```typescript
import { useCreatePost } from '@/lib/api';

const { mutate: createPost } = useCreatePost();

const handleSubmit = async (postData) => {
  await createPost(postData);
  // Post created successfully with real-time updates
};
```

### Real-time Updates
```typescript
import { useRealTimePosts } from '@/lib/websocket';

// Enable real-time post updates
useRealTimePosts();

// Posts will automatically update when new ones are created
```

### Error Handling
```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## 🔍 Troubleshooting

### Common Issues

1. **Backend Not Running**
   - Ensure Spring Boot backend is running on port 8080
   - Check API_BASE_URL in environment variables

2. **WebSocket Connection Failed**
   - Verify WebSocket server is running
   - Check firewall settings
   - Ensure correct WS_URL in environment
   - **Note**: WebSocket errors are now handled gracefully and won't break the app

3. **Authentication Issues**
   - Check JWT token in localStorage
   - Verify backend authentication endpoints

4. **Build Errors**
   - Run `npm install` to ensure all dependencies
   - Check TypeScript configuration
   - Verify all imports are correct

5. **Preview Not Loading**
   - **Dependencies**: Ensure you've run `npm install`
   - **Port conflicts**: The dev server will automatically find an available port (usually 8080, 8081, or 8082)
   - **WebSocket errors**: These are now handled gracefully and won't prevent the app from loading
   - **Console errors**: Open browser dev tools and check for specific error messages
   - **Try**: Clear browser cache and reload the page
   - **Try**: Stop the server (`Ctrl+C`) and restart with `npm run dev`

## 📞 Support

For issues and questions:
1. Check the documentation files
2. Review the integration guides
3. Check console for error messages
4. Verify backend connectivity

## 🎉 Next Steps

1. **Deploy Backend**: Set up the Spring Boot backend
2. **Configure Environment**: Set up production environment variables
3. **Test Integration**: Verify all API endpoints work correctly
4. **Deploy Frontend**: Build and deploy the React application
5. **Monitor Performance**: Set up monitoring for real-time features

---

**Happy Coding! 🚀**

This project represents a complete transformation from a static demo to a production-ready social e-commerce platform with real-time features and robust backend integration.