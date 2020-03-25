/*
 * @Date: 2020-03-20 15:07:02
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-22 23:57:11
 * @repository: https://github.com/SkyBlueFeet
 */
import { Component, Vue } from "vue-property-decorator";

export type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[]
) => void;

export default class Observer {
  private _instance: IntersectionObserver;
  private _handler: IntersectionObserverCallback;
  private _options: IntersectionObserverInit;

  constructor(
    handler: IntersectionObserverCallback,
    options: IntersectionObserverInit
  ) {
    this._handler = handler;
    this._options = options;
    this._instance = new window.IntersectionObserver(
      this._handler.bind(this),
      this._options
    );
  }

  observe(el: Element): void {
    this._instance && this._instance.observe(el);
  }

  unobserve(el: Element): void {
    this._instance && this._instance.unobserve(el);
  }
}

@Component({})
export class VueObserver extends Vue {
  _instance: Observer;
  _handler: IntersectionObserverCallback;
  _options: IntersectionObserverInit;

  mounted(): void {
    this._instance = new Observer(this._handler, this._options);
  }

  observe(el: Element): void {
    this._instance.observe(el);
  }

  unobserve(el: Element): void {
    this._instance.unobserve(el);
  }

  beforeDestroy(): void {
    if (this._instance) this.unobserve(this.$el);
  }
}
