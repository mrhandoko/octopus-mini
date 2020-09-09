import axios from 'axios';

require('dotenv').config();

const invoice = {};

invoice.getAll = async () => {
  try {
    const response = await axios({
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/invoices/all`
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

invoice.create = async (data) => {
  try {
    const response = await axios({
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/invoices/create`,
      data
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

invoice.getById = async (id) => {
  try {
    const response = await axios({
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/invoices/${id}`
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

invoice.update = async (data) => {
  try {
    const response = await axios({
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'put',
      url: `${process.env.REACT_APP_BASE_URL}/invoices/${data.id}`,
      data
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

invoice.delete = async (id) => {
  try {
    const response = await axios({
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/invoices/${id}`
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export default invoice;
