
import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'poor' | 'offline'>('good');
  const { toast } = useToast();

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      checkConnectionQuality();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setConnectionQuality('offline');
      toast({
        title: "Network Disconnected",
        description: "You are currently offline. Some features may be unavailable.",
        variant: "destructive",
      });
    };

    // Check connection quality using performance API
    const checkConnectionQuality = () => {
      if (!navigator.onLine) {
        setConnectionQuality('offline');
        return;
      }

      // Use Navigation Timing API to estimate connection speed
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        
        if (conn) {
          if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
            setConnectionQuality('poor');
            toast({
              title: "Poor Connection",
              description: "Your network connection is slow. Some content may take longer to load.",
              variant: "destructive",
            });
          } else {
            setConnectionQuality('good');
          }
        }
      }
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check connection quality on mount and periodically
    checkConnectionQuality();
    const interval = setInterval(checkConnectionQuality, 30000); // Check every 30 seconds
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [toast]);

  // Only show when connection is poor or offline
  if (connectionQuality === 'good') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs">
      <Alert variant="destructive" className="bg-opacity-90 shadow-lg">
        <WifiOff className="h-4 w-4 mr-2" />
        <AlertDescription>
          {connectionQuality === 'offline' 
            ? "You're offline. Please check your connection." 
            : "Your connection is poor. Some features may be limited."}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NetworkStatus;
