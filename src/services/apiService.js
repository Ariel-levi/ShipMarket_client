import axios from "axios";

// export const API_URL = "https://wolt-back-end.herokuapp.com";
export const API_URL = "http://localhost:3002";
export const PEXELS_API_KEY =
  "563492ad6f9170000100000139f54184d24b48a3b9e1bfde617c174d";

export const doApiGet = async (_url) => {
  try {
    let data = await axios.get(_url, {
      headers: {
<<<<<<< HEAD
        // send header for authentication when it needed
=======
        // send header for authentication when it needed 
>>>>>>> f1fa0af9128169b9c1e3cd37746aa361126d0a13
        "x-api-key": localStorage["tok"],
        "content-type": "application/json",
      },
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
        "x-api-key": localStorage["tok"],
        "content-type": "application/json",
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
