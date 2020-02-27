import axios from 'axios';
const PRIDERAISER_ADDRESS = 'https://www.prideraiser.org';

let prideraiserAPI = axios.create({
    baseURL: PRIDERAISER_ADDRESS.replace(/\/$/, ""),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export const getCampaign = (campaignId) =>
    prideraiserAPI.get('/api/campaigns/' + campaignId).then(response => response.data);