import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;
export const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

export const doApiGet = async (_url, _idStore = null) => {
  try {
    let data = await axios.get(_url, {
      headers: {
        // send header for authentication when it needed
        'id-Store': _idStore,
        'x-api-key': localStorage['tok'],
        'content-type': 'application/json'
      }
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const doApiMethod = async (_url, _method, _body) => {
  try {
    let data = await axios({
      method: _method,
      url: _url,
      data: JSON.stringify(_body),
      headers: {
        'x-api-key': localStorage['tok'],
        'content-type': 'application/json'
      }
    });
    return data;
  } catch (err) {
    throw err;
  }
};
