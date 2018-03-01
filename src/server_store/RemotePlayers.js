import ApiClient from './ApiClient';
import ApiError from './ApiError';

export default class RemotePlayers extends ApiClient {
  constructor(...args) {
    super(...args);
  }

  async get(id) {
    let resource = id === undefined ? 'players' : `player/${id}`;
    try {
      let response = await this.doRequest(resource);
      return await response.json();
    }
    catch (error) {
      throw new ApiError(`Error fetching ${resource} from server`, error);
    }
  }

  async create(player) {
    try {
      let response = await this.doRequest('player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
      });
    }
    catch (error) {
      throw new ApiError('Error creating new player on server', error);
    }
  }

  async update(id, player) {
    try {
      let response = await this.doRequest(`player/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
      });
    }
    catch (error) {
      throw new ApiError(`Error updating player with id ${id} on server`, error);
    }
  }

  async remove(id) {
    try {
      await this.doRequest(`players/${id}`, { method: 'DELETE' });
    }
    catch (error) {
      throw new ApiError(`Error deleting player with id ${id} from server`, error);
    }
  }
};
