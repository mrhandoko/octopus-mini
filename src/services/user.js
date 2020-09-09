import axios from 'axios';

require('dotenv').config();

const user = {};

user.profile = async () => {
  try {
    const response = await axios({
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/user/profile`
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export default user;
