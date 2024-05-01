import axios from 'axios'

const token = localStorage.getItem('auth')

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${JSON.parse(token)}`,
    'content-type': 'application/json',
  },
})
console.log(`${process.env.REACT_APP_API_URL}/api/v1`)
export const get = async (url) => axiosInstance.get(url)
export const post = async (url, body, config = {}) => axiosInstance.post(url, body, config)
export const put = async (url, body, config = {}) => axiosInstance.put(url, body, config)
export const deleted = async (url) => axiosInstance.delete(url)

// axiosInstance.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       originalRequest &&
//       !originalRequest._isRetry
//     ) {
//       originalRequest.isRetry = true;
//       try {
//         await get("/refresh");
//         return axiosInstance.request(originalRequest);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     throw error;
//   }
// );
