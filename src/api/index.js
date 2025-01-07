import axios from "axios";
import userStore from "@/store/modules/userStore";
import store from "@/store";

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

const refreshToken = async () => {
  const refreshToken = store.state.userStore.refreshToken;
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const res = await axios.get('/api/member/refresh');
    const newAccessToken = res.data.data.accessToken;

    userStore.dispatch('setTokens', {
      accessToken: newAccessToken,
      refreshToken,
    });

    return newAccessToken;
  } catch (error) {
    userStore.dispatch('clearTokens');
    throw error;
  }
}

instance.interceptors.request.use(
  (config) => {
    const token = store.state.userStore.accessToken 

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
)

export default instance;



