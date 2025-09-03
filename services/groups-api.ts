import { BaseAPI } from './base-api';

export interface Group {
  _id: string;
  name: string;
  description?: string;
  creatorId: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
}

export interface InviteUserToGroupRequest {
  groupId: string;
  invitedUserId: string;
}

export interface CreateGroupResponse {
  success: boolean;
  data: {
    group: Group;
  };
}

export interface MyGroupsResponse {
  success: boolean;
  data: {
    groups: Group[];
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

export class GroupsAPI extends BaseAPI {
  static async createGroup(
    groupData: CreateGroupRequest
  ): Promise<CreateGroupResponse> {
    console.log('🏗️ [GroupsAPI] Creating group:', groupData);

    return this.authenticatedRequest<CreateGroupResponse>(
      '/groups/create',
      {
        method: 'POST',
        body: JSON.stringify(groupData),
      }
    );
  }

  static async inviteUserToGroup(
    inviteData: InviteUserToGroupRequest
  ): Promise<SuccessResponse> {
    console.log('📨 [GroupsAPI] Inviting user to group:', inviteData);

    return this.authenticatedRequest<SuccessResponse>(
      '/groups/invite',
      {
        method: 'POST',
        body: JSON.stringify(inviteData),
      }
    );
  }

  static async getMyGroups(
    page: number = 1,
    limit: number = 20
  ): Promise<MyGroupsResponse> {
    console.log('👥 [GroupsAPI] Getting my groups:', { page, limit });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.authenticatedRequest<MyGroupsResponse>(
      `/groups/my-groups?${params.toString()}`,
      { method: 'GET' }
    );
  }
}
