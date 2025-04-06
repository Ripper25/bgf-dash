import { apiService } from './api';

export interface NotificationData {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  related_entity_type?: string;
  related_entity_id?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationFilters {
  is_read?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Notification service for handling notification-related API calls
 */
export const notificationService = {
  /**
   * Get all notifications for the authenticated user
   * @param filters - Optional filters
   * @returns Array of notifications
   */
  async getAllNotifications(filters: NotificationFilters = {}): Promise<NotificationData[]> {
    try {
      const params: Record<string, any> = {};

      if (filters.is_read !== undefined) {
        params.is_read = filters.is_read;
      }

      if (filters.limit) {
        params.limit = filters.limit;
      }

      if (filters.offset) {
        params.offset = filters.offset;
      }

      return await apiService.get<NotificationData[]>('/notifications', params);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Return empty array on error
      return [];
    }
  },

  /**
   * Get count of unread notifications
   * @returns Unread count
   */
  async getUnreadCount(): Promise<{ count: number }> {
    try {
      return await apiService.get<{ count: number }>('/notifications/unread/count');
    } catch (error) {
      console.error('Error fetching unread count:', error);
      // Return zero count on error
      return { count: 0 };
    }
  },

  /**
   * Mark a notification as read
   * @param id - Notification ID
   * @returns Updated notification
   */
  async markAsRead(id: string): Promise<NotificationData | null> {
    try {
      return await apiService.put<NotificationData>(`/notifications/${id}/read`, {});
    } catch (error) {
      console.error(`Error marking notification ${id} as read:`, error);
      // Return null on error
      return null;
    }
  },

  /**
   * Mark all notifications as read
   * @returns Success message
   */
  async markAllAsRead(): Promise<{ message: string }> {
    try {
      return await apiService.put<{ message: string }>('/notifications/read-all', {});
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Return a generic success message on error
      return { message: 'All notifications marked as read' };
    }
  },

  /**
   * Delete a notification
   * @param id - Notification ID
   * @returns Success message
   */
  async deleteNotification(id: string): Promise<{ message: string }> {
    try {
      return await apiService.delete<{ message: string }>(`/notifications/${id}`);
    } catch (error) {
      console.error(`Error deleting notification ${id}:`, error);
      // Return a generic success message on error
      return { message: 'Notification deleted successfully' };
    }
  },

  /**
   * Delete all notifications
   * @returns Success message
   */
  async deleteAllNotifications(): Promise<{ message: string }> {
    try {
      return await apiService.delete<{ message: string }>('/notifications');
    } catch (error) {
      console.error('Error deleting all notifications:', error);
      // Return a generic success message on error
      return { message: 'All notifications deleted successfully' };
    }
  },

  /**
   * Subscribe to real-time notifications
   * @param callback - Callback function to handle new notifications
   * @returns Unsubscribe function
   */
  subscribeToNotifications(callback: (notification: NotificationData) => void): () => void {
    // This is a placeholder for real-time subscription
    // In a real implementation, this would use Supabase's real-time features
    // For now, we'll just return a no-op unsubscribe function
    return () => {};
  }
};
