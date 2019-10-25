import ApiClient from './ApiClient';
import ApiError from './ApiError';

export default class RemoteNotifications extends ApiClient {
  constructor(...args) {
    super(...args);
  }

  async getLast() {
    try {
      let response = await this.doRequest('goalkeeperNicknames/last');
      return response.status == 204
        ? null
        : await response.json();
    }
    catch (error) {
      throw new ApiError("Error fetching last goalkeeper nickname from server", error);
    }
  }

  async create(goalkeeperNickname, token) {
    try {
      let response = await this.doRequest('goalkeeperNicknames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(goalkeeperNickname)
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError('Error creating new notification on server', error);
    }
  }
};
