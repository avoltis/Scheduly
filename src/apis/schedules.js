import axios from 'axios';

export default axios.create({
  baseURL: 'https://hours-1.apphb.com/api'
  // baseURL: 'http://localhost:41343/api'
});
