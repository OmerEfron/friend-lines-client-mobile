import { NotificationPermissions } from './notification-permissions';
import { NotificationTokens } from './notification-tokens';
import { NotificationHandlers } from './notification-handlers';
import { NotificationRegistration } from './notification-registration';

export class NotificationService {
  private permissions: NotificationPermissions;
  private tokens: NotificationTokens;
  private handlers: NotificationHandlers;
  private registration: NotificationRegistration;

  constructor() {
    this.permissions = new NotificationPermissions();
    this.tokens = new NotificationTokens();
    this.handlers = new NotificationHandlers();
    this.registration = new NotificationRegistration();
    
    this.handlers.setupNotificationHandler();
  }

  async requestPermissions(): Promise<boolean> {
    return this.permissions.requestPermissions();
  }

  async getDeviceToken(): Promise<string | null> {
    return this.tokens.getDeviceToken();
  }

  async registerDeviceWithServer(deviceToken: string): Promise<boolean> {
    return this.registration.registerDeviceWithServer(deviceToken);
  }

  async scheduleTestNotification() {
    return this.handlers.scheduleTestNotification();
  }

  async handleNotificationReceived(notification: any) {
    return this.handlers.handleNotificationReceived(notification);
  }

  async handleNotificationResponse(response: any) {
    return this.handlers.handleNotificationResponse(response);
  }
}
