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

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if(data instanceof FormData) {
        console.log(data)
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    })
  }
}
