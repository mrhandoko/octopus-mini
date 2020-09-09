import axios from 'axios';

require('dotenv').config();

const role = {};

role.getAll = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/roles/all`
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export default role;
