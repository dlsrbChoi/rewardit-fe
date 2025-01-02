import axios from 'axios';

const axiosHook = async (
  method,
  url,
  params,
  config,
  timeOut,
) => {
  const timeout =
    timeOut || process.env.VUE_APP_HTTP_REQUEST_TIME_OUT;

  let response = null;

  const instance = axios.create({
    timeout: timeout,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });

  try {
    switch (method) {
      case 'put':
        response = await instance.put(url, params, config);
        break;
      case 'patch':
        response = await instance.patch(
          url,
          params,
          config,
        );
        break;
      case 'post':
        response = await instance.post(url, params, config);
        break;
      case 'get':
        response = await instance.get(url, {
          params,
          ...config,
        });
        break;
      case 'delete':
        response = await instance.delete(url, {
          data: { ...params },
          ...config,
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }

  return response?.data ?? {};
};

export default axiosHook;
