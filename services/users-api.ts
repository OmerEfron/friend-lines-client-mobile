import { BaseAPI } from './base-api';

export interface User {
  uuid: string;
  username: string;
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  id?: string;
  __v?: number;
}

export interface RegisterUserRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export interface SearchUsersRequest {
  q: string;
  page?: number;
  limit?: number;
}

export interface SearchUsersResponse {
  success: boolean;
  data: {
    users: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface RegisterUserResponse {
  success: boolean;
  data: {
    user: User;
  };
}

export class UsersAPI extends BaseAPI {
  static async register(userData: RegisterUserRequest): Promise<RegisterUserResponse> {
    console.log('🔐 [UsersAPI] Attempting user registration:', { 
      username: userData.username, 
      fullName: userData.fullName,
      email: userData.email 
    });

    return this.request<RegisterUserResponse>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static async searchUsers(
    searchData: SearchUsersRequest,
    token: string
  ): Promise<SearchUsersResponse> {
    console.log('🔍 [UsersAPI] Searching users:', searchData);

    const params = new URLSearchParams({
      q: searchData.q,
      page: (searchData.page || 1).toString(),
      limit: (searchData.limit || 20).toString(),
    });

    return this.authenticatedRequest<SearchUsersResponse>(
      `/users/search?${params.toString()}`,
      token,
      { method: 'GET' }
    );
  }
}
