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

function queryStringify(data: Record<string, any>): string {
  if (typeof data !== "object" || data === null) {
    return '';
  }

  return Object.keys(data)
    .map(key => `${key}=${data[key].toString()}`)
    .join('&')
}

export class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const {data} = options;
    const newUrl = data ? `${url}?${queryStringify(data)}` : url;

    return this.request(newUrl, {...options, method: METHOD.GET});
  };

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.POST});
  };

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PUT});
  };

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.DELETE});
  };

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
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

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    })


  }
}
