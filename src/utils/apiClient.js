// @flow
import axios from 'axios';
import store from '../redux/createStore';
import {
  sessionLoggedInSelector,
  sessionSelector,
} from '../redux/selectors/session';

const apiClient: Object = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

apiClient.interceptors.request.use((config) => {
  const state = store.getState();

  const isLoggedIn = sessionLoggedInSelector(state);

  if (isLoggedIn) {
    const { token } = sessionSelector(state);

    return {
      ...config,
      headers: {
        Authorization: token,
      },
    };
  }
  return config;
}, Promise.reject);

export default apiClient;
