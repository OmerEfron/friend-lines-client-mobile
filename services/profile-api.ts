import { BaseAPI } from './base-api';
import { UserProfile, UserProfileResponse, UserNewsflashesResponse } from '../types/profile';

export class ProfileAPI extends BaseAPI {
  static async getUserProfile(userId: string): Promise<UserProfileResponse> {
    console.log('👤 [ProfileAPI] Getting user profile:', userId);

    return this.authenticatedRequest<UserProfileResponse>(
      `/users/profile/${userId}`,
      { method: 'GET' }
    );
  }

  static async getCurrentUserProfile(): Promise<UserProfileResponse> {
    console.log('👤 [ProfileAPI] Getting current user profile');

    return this.authenticatedRequest<UserProfileResponse>(
      '/users/profile',
      { method: 'GET' }
    );
  }

  static async getUserNewsflashes(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<UserNewsflashesResponse> {
    console.log('📰 [ProfileAPI] Getting user newsflashes:', { userId, page, limit });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.authenticatedRequest<UserNewsflashesResponse>(
      `/newsflashes/author/${userId}?${params.toString()}`,
      { method: 'GET' }
    );
  }
}
