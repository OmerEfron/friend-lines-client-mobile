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
        
        // Try to parse the error response to extract meaningful messages
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          } else if (errorData.message) {
            throw new Error(errorData.message);
          }
        } catch (parseError) {
          // If parsing fails, use the raw error text
        }
        
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
    options: RequestInit = {}
  ): Promise<T> {
    // Lazy import to avoid circular dependency
    const { TokenManager } = await import('./token-manager');
    const token = await TokenManager.getValidToken();
    
    if (!token) {
      throw new Error('No valid access token available');
    }

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
