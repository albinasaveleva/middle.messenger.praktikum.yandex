function queryString(data: Record<string, any>): string {
    if (typeof data !== "object" || data === null) {
      return '';
    }

    return Object.keys(data)
      .map(key => `${key}=${data[key].toString()}`)
      .join('&')
  }

export default queryString;
