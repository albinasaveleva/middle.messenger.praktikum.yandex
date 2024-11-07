type PlainObject<T = any> = {
    [k in string]: T;
};
type Indexed<T = any> = {
    [key in string]: T;
};

const isPlainObject = (value: unknown): value is PlainObject => {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

const isArray = (value: unknown): value is [] => {
    return Array.isArray(value);
}

const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
    return isPlainObject(value) || isArray(value);
}

const isEqual = (lhs: PlainObject, rhs: PlainObject) => {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

const trim = (str: string, symb: string = " ") => {
    return str.replace(new RegExp(`[${symb}]+`, "gi"), "");
}

const queryString = (data: Record<string, any>): string => {
    if (typeof data !== "object" || data === null) {
      return '';
    }

    return Object.keys(data)
      .map(key => `${key}=${data[key].toString()}`)
      .join('&')
}

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
    for (let p in rhs) {
      if (!rhs.hasOwnProperty(p)) {
        continue;
      }

      try {
        if (rhs[p].constructor === Object) {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }

    return lhs;
}

const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}


export {
    isEqual,
    trim,
    queryString,
    merge,
    set
}
