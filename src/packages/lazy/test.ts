/*
 * @Date: 2020-03-20 15:07:02
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-20 16:03:42
 * @repository: https://github.com/SkyBlueFeet
 */

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[]
) => void;

export function test(this: Vue): void {
  console.log(IntersectionObserver);
}

export default class Observer {
  _instance: IntersectionObserver;
  _handler: IntersectionObserverCallback;
  _options: IntersectionObserverInit;
  constructor(
    handler: IntersectionObserverCallback,
    options: IntersectionObserver
  ) {
    this._handler = handler;
    this._options = options;
    this.init();
  }

  init(): void {
    this._instance = new window.IntersectionObserver(
      this._handler,
      this._options
    );
  }

  add(el: Element): void {
    this._instance && this._instance.observe(el);
  }

  remove(el: Element): void {
    this._instance && this._instance.unobserve(el);
  }
}
