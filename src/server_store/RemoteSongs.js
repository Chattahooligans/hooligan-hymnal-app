import ApiClient from './ApiClient';
import ApiError from './ApiError';

export default class RemoteSongs extends ApiClient {
  constructor(...args) {
    super(...args);
  }

  async get(id) {
    let resource = id === undefined ? 'songs' : `songs/${id}`;
    let description = id === undefined ? 'all songs' : `song with id ${id}`;

    try {
      let response = await this.doRequest(resource);
      return await response.json();
    }
    catch (error) {
      throw new ApiError(`Error fetching ${description} from server`, error);
    }
  }

  async create(song) {
    try {
      let response = await this.doRequest('song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError('Error creating new song on server', error);
    }
  }

  async update(id, song) {
    try {
      let response = await this.doRequest(`song/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError(`Error updating song with id ${id} on server`, error);
    }
  }

  async remove(id) {
    try {
      await this.doRequest(`songs/${id}`, { method: 'DELETE' });
    }
    catch (error) {
      throw new ApiError(`Error deleting song with id ${id} from server`, error);
    }
  }
};
