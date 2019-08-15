import ApiClient from './ApiClient';
import ApiError from './ApiError';

export default class AuthCheck extends ApiClient {
  constructor(...args) {
    super(...args);
  }
  
  async check(code) {
    try {
      let response = await this.doRequest('authCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(code)
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError('Error creating new notification on server', error);
    }
  }
};
