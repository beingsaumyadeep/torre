import Axios from "axios";
import qs from "qs";

export function get(path, options) {
      return request(path, "get", options);
}

export function post(path, options) {
      return request(path, "post", options);
}
async function request(path: string, method: any, options: any) {
      const headers = {
            "content-type": "application/json"
      };
      try {
            const response = await Axios.request({
                  ...options,
                  method,
                  url: `${path}`,
                  paramsSerializer: function (params) {
                        return qs.stringify(params, { arrayFormat: "comma" });
                  },
                  headers
            }).finally(() => {
            });

            return response;
      } catch (error) {
            if (error.isAxiosError && error.response.status === 401) {
                  try {
                        // console.log("Err", error.response)
                  } catch (error) {
                        window.location.assign("/");
                  }
            }

            throw error;
      }
}
