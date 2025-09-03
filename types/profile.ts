export interface UserProfile {
  uuid: string;
  username: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  _id?: string;
}

export interface UserProfileResponse {
  success: boolean;
  data: {
    user: UserProfile;
  };
}

export interface UserNewsflashesResponse {
  success: boolean;
  data: {
    newsflashes: Array<{
      _id: string;
      authorId: string;
      content: string;
      targetType: 'friends' | 'group';
      targetId?: string;
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
      author: UserProfile;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface UserStats {
  friendsCount: number;
  groupsCount: number;
  newsflashesCount: number;
  joinedDate: string;
}
