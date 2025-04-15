
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { BellRing, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Notification {
  id: string;
  type: 'fraud-alert' | 'spam-blocked' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  notifications, 
  onMarkAsRead 
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            Notifications
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} New</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No notifications yet. We'll alert you about potential fraud or blocked spam.
          </p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-colors",
                    !notification.isRead ? "bg-muted/50" : "hover:bg-muted/30"
                  )}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {notification.type === 'fraud-alert' ? (
                        <ShieldAlert className="h-5 w-5 mt-0.5 text-fraud-critical" />
                      ) : notification.type === 'spam-blocked' ? (
                        <ShieldAlert className="h-5 w-5 mt-0.5 text-fraud-low" />
                      ) : (
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                      )}
                      <div>
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to format timestamps
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  return date.toLocaleDateString();
};

export default NotificationCenter;
