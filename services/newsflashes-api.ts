import { BaseAPI } from './base-api';

export interface Newsflash {
  _id: string;
  authorId: string;
  content: string;
  targetType: 'friends' | 'group';
  targetId?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsflashWithAuthor extends Newsflash {
  author: {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface CreateNewsflashRequest {
  content: string;
  targetType: 'friends' | 'group';
  targetId?: string;
}

export interface CreateNewsflashResponse {
  success: boolean;
  data: {
    newsflash: Newsflash;
  };
}

export interface MyFeedResponse {
  success: boolean;
  data: {
    newsflashes: NewsflashWithAuthor[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export class NewsflashesAPI extends BaseAPI {
  static async createNewsflash(
    newsflashData: CreateNewsflashRequest
  ): Promise<CreateNewsflashResponse> {
    console.log('📢 [NewsflashesAPI] Creating newsflash:', newsflashData);

    return this.authenticatedRequest<CreateNewsflashResponse>(
      '/newsflashes/create',
      {
        method: 'POST',
        body: JSON.stringify(newsflashData),
      }
    );
  }

  static async getMyFeed(
    page: number = 1,
    limit: number = 20
  ): Promise<MyFeedResponse> {
    console.log('📰 [NewsflashesAPI] Getting my feed:', { page, limit });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.authenticatedRequest<MyFeedResponse>(
      `/newsflashes/my-feed?${params.toString()}`,
      { method: 'GET' }
    );
  }
}
