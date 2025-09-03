import * as Notifications from 'expo-notifications';

export class NotificationHandlers {
  setupNotificationHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }

  async scheduleTestNotification() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Friend Lines",
          body: "Welcome to Friend Lines! 🎉",
          data: { type: 'test' },
        },
        trigger: { seconds: 2 } as any,
      });
      console.log('✅ [NotificationHandlers] Test notification scheduled');
    } catch (error) {
      console.error('❌ [NotificationHandlers] Failed to schedule test notification:', error);
    }
  }

  async handleNotificationReceived(notification: any) {
    console.log('🔔 [NotificationHandlers] Notification received:', notification);
    console.log('📱 [NotificationHandlers] Notification details:', {
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
      trigger: notification.request.trigger,
      date: notification.date
    });
    
    const data = notification.request.content.data;
    
    switch (data?.type) {
      case 'newsflash':
        console.log('📰 [NotificationHandlers] Newsflash notification:', data);
        break;
      case 'friend_request':
        console.log('👥 [NotificationHandlers] Friend request notification:', data);
        break;
      case 'group_invitation':
        console.log('🏷️ [NotificationHandlers] Group invitation notification:', data);
        break;
      default:
        console.log('❓ [NotificationHandlers] Unknown notification type:', data?.type);
    }
  }

  async handleNotificationResponse(response: any) {
    console.log('👆 [NotificationHandlers] Notification response:', response);
    
    const data = response.notification.request.content.data;
    
    switch (data?.type) {
      case 'newsflash':
        console.log('📰 [NotificationHandlers] Navigating to newsflash:', data.newsflashId);
        break;
      case 'friend_request':
        console.log('👥 [NotificationHandlers] Navigating to friends screen');
        break;
      case 'group_invitation':
        console.log('🏷️ [NotificationHandlers] Navigating to groups screen');
        break;
      default:
        console.log('❓ [NotificationHandlers] Unknown notification response type:', data?.type);
    }
  }
}
