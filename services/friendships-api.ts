import { BaseAPI } from './base-api';

export interface FriendshipRequest {
  _id: string;
  user1Id: string;
  user2Id: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface SendFriendRequestRequest {
  friendId: string;
}

export interface AcceptFriendRequestRequest {
  requestId: string; // Changed from friendId to requestId - the API expects the friendship request ID
}

export interface FriendshipsListResponse {
  success: boolean;
  data: {
    friends: Array<{
      uuid: string;
      username: string;
      fullName: string;
      email: string;
      createdAt?: string;
      updatedAt?: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface PendingRequestsResponse {
  success: boolean;
  data: {
    requests: Array<{
      _id: string;
      username: string;
      fullName: string;
      email: string;
      uuid: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      id: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SuccessResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export class FriendshipsAPI extends BaseAPI {
  static async sendFriendRequest(
    requestData: SendFriendRequestRequest,
    token: string
  ): Promise<SuccessResponse> {
    console.log('🤝 [FriendshipsAPI] Sending friend request:', requestData);

    return this.authenticatedRequest<SuccessResponse>(
      '/friendships/request',
      token,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    );
  }

  static async acceptFriendRequest(
    requestData: AcceptFriendRequestRequest,
    token: string
  ): Promise<SuccessResponse> {
    console.log('✅ [FriendshipsAPI] Accepting friend request:', requestData);

    return this.authenticatedRequest<SuccessResponse>(
      '/friendships/accept',
      token,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    );
  }

  static async getFriendsList(
    token: string,
    page: number = 1,
    limit: number = 20
  ): Promise<FriendshipsListResponse> {
    console.log('👥 [FriendshipsAPI] Getting friends list:', { page, limit });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.authenticatedRequest<FriendshipsListResponse>(
      `/friendships/list?${params.toString()}`,
      token,
      { method: 'GET' }
    );
  }

  static async getPendingRequests(
    token: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PendingRequestsResponse> {
    console.log('⏳ [FriendshipsAPI] Getting pending requests:', { page, limit });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.authenticatedRequest<PendingRequestsResponse>(
      `/friendships/requests?${params.toString()}`,
      token,
      { method: 'GET' }
    );
  }
}
