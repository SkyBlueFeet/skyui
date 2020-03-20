/*
 * @Date: 2020-03-19 20:19:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-20 11:22:28
 * @repository: https://github.com/SkyBlueFeet
 */
// 引入polyfill，解决兼容性问题
// require("intersection-observer");
try {
  IntersectionObserver.prototype["THROTTLE_TIMEOUT"] = 300;
} catch (error) {
  console.log(error);
}

type Option = {
  loading?: string;
  callback: (entry: IntersectionObserverEntry) => void;
  observerOption?: IntersectionObserverInit;
};

export default class LazyLoadImage {
  _observer: IntersectionObserver | null;
  _loadingImage: string;
  _callback: Option["callback"];
  _options: IntersectionObserverInit;

  constructor(option: Option) {
    const { loading = "sddd", callback, observerOption = {} } = option;

    this._observer = null;

    this._loadingImage = loading;
    this._callback = callback;
    this._options = observerOption;
    this.init();
  }

  init(): void {
    try {
      this._observer = new IntersectionObserver(entries => {
        entries.forEach(this._callback);
      }, this._options);
    } catch (error) {
      console.log(error);
    }
  }

  // 让每个img标签自行调用add方法，把自己添加到观察者队列中
  add(target: Element) {
    this._observer && this._observer.observe(target);
  }

  remove(target: Element) {
    this._observer && this._observer.unobserve(target);
  }
}
