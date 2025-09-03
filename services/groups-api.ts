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

export interface CreateGroupResponse {
  success: boolean;
  data: {
    group: Group;
  };
}

export interface GroupsListResponse {
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

export interface InviteToGroupRequest {
  groupId: string;
  invitedUserId: string;
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
    console.log('🏷️ [GroupsAPI] Creating group:', groupData);

    return this.authenticatedRequest<CreateGroupResponse>(
      '/groups/create',
      {
        method: 'POST',
        body: JSON.stringify(groupData),
      }
    );
  }

  static async getMyGroups(
    page: number = 1,
    limit: number = 20
  ): Promise<GroupsListResponse> {
    console.log('📋 [GroupsAPI] Getting my groups:', { page, limit });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.authenticatedRequest<GroupsListResponse>(
      `/groups/my-groups?${params.toString()}`,
      { method: 'GET' }
    );
  }

  static async getGroup(groupId: string): Promise<SuccessResponse> {
    console.log('🔍 [GroupsAPI] Getting group:', groupId);

    return this.authenticatedRequest<SuccessResponse>(
      `/groups/${groupId}`,
      { method: 'GET' }
    );
  }

  static async updateGroup(
    groupId: string,
    updateData: Partial<CreateGroupRequest>
  ): Promise<SuccessResponse> {
    console.log('✏️ [GroupsAPI] Updating group:', groupId, updateData);

    return this.authenticatedRequest<SuccessResponse>(
      `/groups/${groupId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updateData),
      }
    );
  }

  static async deleteGroup(groupId: string): Promise<SuccessResponse> {
    console.log('🗑️ [GroupsAPI] Deleting group:', groupId);

    return this.authenticatedRequest<SuccessResponse>(
      `/groups/${groupId}`,
      { method: 'DELETE' }
    );
  }

  static async inviteToGroup(
    requestData: InviteToGroupRequest
  ): Promise<SuccessResponse> {
    console.log('📨 [GroupsAPI] Inviting to group:', requestData);

    return this.authenticatedRequest<SuccessResponse>(
      '/groups/invite',
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    );
  }

  static async getGroupNewsflashes(
    groupId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<SuccessResponse> {
    console.log('📰 [GroupsAPI] Getting group newsflashes:', { groupId, page, limit });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.authenticatedRequest<SuccessResponse>(
      `/newsflashes/group/${groupId}?${params.toString()}`,
      { method: 'GET' }
    );
  }
}