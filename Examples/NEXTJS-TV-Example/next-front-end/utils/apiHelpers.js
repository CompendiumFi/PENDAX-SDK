import axios from "axios";
const BASE_URL = "http://localhost:3500";

const postApi = async (url, body, config = {}) => {
  try {
    let { data } = await axios.post(`${BASE_URL}/${url}`, body, config);
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.warn(error.message);
    return null;
  }
};

const putApi = async (url, body, config = {}) => {
  try {
    let { data } = await axios.put(`${BASE_URL}/${url}`, body, config);
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.warn(error.message);
    return null;
  }
};
const getApi = async (url, body, config = {}) => {
  try {
    let { data } = await axios.get(`${BASE_URL}/${url}`, config);
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.warn(error.message);
    return null;
  }
};

export { getApi, postApi, putApi };
