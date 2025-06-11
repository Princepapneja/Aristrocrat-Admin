import axios from 'axios';
import { baseUrl } from '../../constants';
import { toast } from 'react-toastify';

const apiHandler = axios.create();

// Custom debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Debounce function to handle logout
const handleLogout = debounce(() => {
  toast.error("Please log in again");
  localStorage.removeItem('token');
  setTimeout(() => {
    window.location.replace('/');
  }, 1000);
}, 300); // 300ms debounce time

apiHandler.interceptors.request.use(
  (config) => {
    const { url, data } = config;
    let apiUrl;
    const trimmedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    // Construct apiUrl based on whether url starts with '/'
    apiUrl = `${trimmedBaseUrl}/api/v1/admin${url.startsWith('/') ? url : `/${url}`}`;

    // Get token from local storage
    const token = localStorage.getItem('token');

    // Add token to headers if it exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Set Content-Type header to JSON
    if (!(data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }


    return {
      ...config,
      url: apiUrl,
      data,
    };
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiHandler.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response.data);

      const { data } = error.response;
      if (data === "TokenExpiredError" || data === "JsonWebTokenError") {
        handleLogout(); // Call debounced logout function
      }
      return Promise.reject(data);
    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Unexpected error:', error.message);
    }

    return Promise.reject(error); // Reject the promise with the error
  }
);

export default apiHandler;
