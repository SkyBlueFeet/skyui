/*
 * @Author: skybluefeet
 * @Date: 2020-02-28 14:13:49
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-18 14:18:31
 */
export default {
  isEmpty(obj: any): boolean {
    if (obj === null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    let flag = true;
    Object.keys(obj).every(key => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        flag = false;
        return false;
      }
      return true;
    });
    return flag;
  },

  isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },

  getScroll(target: Window, top: boolean): number {
    if (typeof window === "undefined") {
      return 0;
    }

    const prop = top ? "pageYOffset" : "pageXOffset";
    const method = top ? "scrollTop" : "scrollLeft";
    const isWindow = target === window;

    let ret: number = isWindow ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow && typeof ret !== "number") {
      ret = window.document.documentElement[method];
    }

    return ret;
  },

  typeConvert<T, K>(type: T): K {
    return type as any;
  },

  filterProps(
    props: Record<string, any>,
    exclude: string[] = []
  ): Record<string, any> {
    const ensureVal = (val: string): boolean =>
      (props[val] || props[val] === false) && !exclude.includes(val);

    const $attrs: Record<string, any> = Object.create(null);
    Object.keys(props)
      .filter(ensureVal)
      .forEach(k => ($attrs[k] = props[k]));
    return $attrs;
  }
};
