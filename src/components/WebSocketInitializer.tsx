import { useEffect, useState } from 'react';
import { useWebSocket } from '@/lib/websocket';

const WebSocketInitializer = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { isConnected, error } = useWebSocket();

  useEffect(() => {
    // Mark as initialized when component mounts
    setIsInitialized(true);
    
    // Log WebSocket connection status for debugging
    console.log('WebSocket Initializer - Connection status:', isConnected ? 'Connected' : 'Disconnected');
    if (error) {
      console.log('WebSocket Initializer - Error:', error);
    }
  }, [isConnected, error]);

  // This component doesn't render anything visible
  // It just initializes the WebSocket connection
  return null;
};

export default WebSocketInitializer;