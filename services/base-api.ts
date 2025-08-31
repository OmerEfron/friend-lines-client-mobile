export class BaseAPI {
  protected static API_BASE_URL = 'http://192.168.1.154:3000/api';

  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.API_BASE_URL}${endpoint}`;
    
    console.log(`🌐 [BaseAPI] Making request to: ${url}`);
    console.log(`📤 [BaseAPI] Request options:`, options);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      console.log(`📡 [BaseAPI] Response status: ${response.status}`);
      console.log(`📡 [BaseAPI] Response headers:`, response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ [BaseAPI] Request failed: ${errorText}`);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log(`✅ [BaseAPI] Request successful:`, data);
      return data;
    } catch (error) {
      console.error(`💥 [BaseAPI] Request error:`, error);
      throw error;
    }
  }

  protected static async authenticatedRequest<T>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
