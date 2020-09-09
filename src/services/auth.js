import axios from 'axios';

require('dotenv').config();

const auth = {};

auth.login = async (data) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/auth/signin`,
      data
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

auth.signup = async (data) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/auth/signup`,
      data
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export default auth;
