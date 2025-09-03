// Base API service
export { BaseAPI } from './base-api';

// Authentication service
export { AuthAPI } from './auth-api';
export type { LoginCredentials, AuthResponse, RefreshResponse } from './auth-api';

// Token management
export { TokenManager } from './token-manager';

// Users service
export { UsersAPI } from './users-api';
export type { 
  User, 
  RegisterUserRequest, 
  SearchUsersRequest, 
  SearchUsersResponse, 
  RegisterUserResponse 
} from './users-api';

// Friendships service
export { FriendshipsAPI } from './friendships-api';
export type { 
  FriendshipRequest, 
  SendFriendRequestRequest, 
  AcceptFriendRequestRequest, 
  FriendshipsListResponse, 
  PendingRequestsResponse, 
  SuccessResponse 
} from './friendships-api';

// Groups service
export { GroupsAPI } from './groups-api';
export type { 
  Group, 
  CreateGroupRequest, 
  CreateGroupResponse, 
  GroupsListResponse,
  InviteToGroupRequest
} from './groups-api';

// Newsflashes service
export { NewsflashesAPI } from './newsflashes-api';
export type { 
  Newsflash, 
  NewsflashWithAuthor, 
  CreateNewsflashRequest, 
  CreateNewsflashResponse, 
  MyFeedResponse 
} from './newsflashes-api';

// Profile service
export { ProfileAPI } from './profile-api';

// Notifications service
export { NotificationsAPI } from './notifications-api';
export { NotificationService } from './notification-service';
export { NotificationPermissions } from './notification-permissions';
export { NotificationTokens } from './notification-tokens';
export { NotificationHandlers } from './notification-handlers';
export { NotificationRegistration } from './notification-registration';
export type { 
  RegisterDeviceRequest, 
  RegisterDeviceResponse 
} from './notifications-api';
