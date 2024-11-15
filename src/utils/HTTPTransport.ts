import { BASE_API_URL } from "../api/base-api";
import { queryString } from "./utils";

enum METHOD {
  GET = 'GET',
  POST =  'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  get(endpoint: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const {data} = options;
    // const url = data ? `${BASE_API_URL}${endpoint}?${queryString(data)}` : `${BASE_API_URL}${endpoint}`;

    return this.request(endpoint, {...options, method: METHOD.GET});
  };

  post(endpoint: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(endpoint, {...options, method: METHOD.POST});
  };

  put(endpoint: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(endpoint, {...options, method: METHOD.PUT});
  };

  delete(endpoint: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(endpoint, {...options, method: METHOD.DELETE});
  };

  request(endpoint: string, options: Options): Promise<XMLHttpRequest> {
    const url = `${BASE_API_URL}${endpoint}`;

    const {method, data, headers = {}} = options;
    console.log(method, data)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        const status = xhr.status || 0;

        if (status >= 200 && status < 300) {
            resolve(xhr);
        } else {
            reject({reason: xhr.response.reason});
        }
      };
      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHOD.GET) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    })
  }
}
