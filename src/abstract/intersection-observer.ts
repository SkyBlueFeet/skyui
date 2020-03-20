/*
 * @Date: 2020-03-20 14:29:55
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-20 14:31:15
 * @repository: https://github.com/SkyBlueFeet
 */
/*
 * @Date: 2020-03-19 20:19:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-20 11:22:28
 * @repository: https://github.com/SkyBlueFeet
 */
// 引入polyfill，解决兼容性问题
require("intersection-observer");
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
    const { callback, observerOption = {} } = option;

    this._observer = null;
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
  add(target: Element): void {
    this._observer && this._observer.observe(target);
  }

  remove(target: Element): void {
    this._observer && this._observer.unobserve(target);
  }
}
