import axios from 'axios';

export default axios.create({
  baseURL: 'https://reactapi.keystonealves.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
