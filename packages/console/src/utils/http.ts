import axios, {
  CreateAxiosDefaults,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const requestInterceptor = (req: InternalAxiosRequestConfig) => {
  const __hydra = window.localStorage.getItem('__hydra');
  if (__hydra) {
    const { user } = JSON.parse(__hydra);
    const { token } = user || {};
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      setAuthHeader(token);
    }
  }

  return req;
};

const responseInterceptor = (res: AxiosResponse) => {
  return res.data.data;
};

export const init = () => {
  // axios.defaults.baseURL = '{API_BASE_URL}';
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['X-Request-With'] = 'XMLHTTPRequest';
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseInterceptor);
};

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};

export const resetAuthHeader = () => {
  axios.defaults.headers.Authorization = null;
};

export const create = (args: CreateAxiosDefaults) => axios.create(args);

export const all = <T>(iterable: Array<T | Promise<T>>) =>
  axios.all(iterable).then(axios.spread((...args) => args));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = (options: any) => axios(options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = (url: string, options: any = null) =>
  axios.get(url, options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = (url: string, data: any, options: any = null) =>
  axios.post(url, data, options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = (url: string, data: any, options: any = null) =>
  axios.put(url, data, options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patch = (url: string, data: any, options: any = null) =>
  axios.patch(url, data, options);

export const del = (url: string) => axios.delete(url);
