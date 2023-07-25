// Import required modules and packages
import axios from "axios";
import { NavigateFunction } from "react-router";
import { notify } from "reapop";
import { USER_TOKEN_KEY } from "src/constants";
import { AppDispatch } from ".";
import { clearUser } from "./auth/authSlice";

// Add a request interceptor to modify outgoing request configurations
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  config.baseURL = process.env.REACT_APP_WEB_SERVICE_BASE_URL
  config.headers['Accept'] = '*/*';
  config.headers['Authorization'] = `Bearer ${token}`
  config.headers['Access-Control-Allow-Origin'] = '*'
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor to handle incoming response data
export const setupAxiosResponseInterceptors = (
  dispatch: AppDispatch, navigate: NavigateFunction) => {
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      dispatch(clearUser())
      dispatch(notify('Session just ended. Kindly login again', 'error'))
      navigate('/auth/login')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
}

// Export the axios instance with request and response interceptors
export default axios;