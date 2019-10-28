import ApiClient from './ApiClient';
import ApiError from './ApiError';

export default class RemoteNotifications extends ApiClient {
  constructor(...args) {
    super(...args);
  }

  async getLast() {
    try {
      let response = await this.doRequest('notifications/last');
      return response.status == 204
        ? null
        : await response.json();
    }
    catch (error) {
      throw new ApiError("Error fetching last notification from server", error);
    }
  }

  async get(id) {
    let resource = id === undefined ? 'notifications' : `notification/${id}`;
    try {
      let response = await this.doRequest(resource);
      return await response.json();
    }
    catch (error) {
      throw new ApiError(`Error fetching ${resource} from server`, error);
    }
  }

  async create(notification, token) {
    try {
      let response = await this.doRequest('notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(notification)
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError('Error creating new notification on server', error);
    }
  }

  async update(id, notification, token) {
    try {
      let response = await this.doRequest(`notification/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(notification)
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError(`Error updating notification with id ${id} on server`, error);
    }
  }

  async remove(id, token) {
    try {
      await this.doRequest(`notifications/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': token
      } });
    }
    catch (error) {
      throw new ApiError(`Error deleting notification with id ${id} from server`, error);
    }
  }
};
