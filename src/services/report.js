import axios from 'axios';

require('dotenv').config();

const report = {};

report.getAll = async () => {
  try {
    const response = await axios({
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/reports/all`
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export default report;
