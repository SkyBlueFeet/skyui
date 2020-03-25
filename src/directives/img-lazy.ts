/*
 * @Date: 2020-03-20 21:34:15
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-23 00:07:30
 * @repository: https://github.com/SkyBlueFeet
 */
import Observer, {
  IntersectionObserverCallback
} from "../abstract/intersection-observer";
import { DirectiveOptions } from "vue";
import Vue from "vue";
import { DirectiveBinding, DirectiveFunction } from "vue/types/options";

let instance: Observer;

if (typeof window !== "undefined") {
  const handler: IntersectionObserverCallback = entries => {
    entries.forEach(function(entry: IntersectionObserverEntry) {
      if (entry.isIntersecting || entry.intersectionRatio) {
        const target: HTMLImageElement = entry.target as any;
        target.className = "fadeIn";

        // 预加载
        const image = document.createElement("img");
        image.src = target.getAttribute("data-src");

        image.addEventListener("error", function(ev: ErrorEvent) {
          target.src = "" || target.getAttribute("error-src");
          console.log("图片加载错误，但是你没有设置加载错误时的占位图");
        });

        image.addEventListener("load", function(ev: Event) {
          // 设置正确的src并移除无用的attrs
          target.removeAttribute("data-src");
          target.removeAttribute("error-src");
          target.removeAttribute("loading-src");
          target.src = image.src;
        });

        Vue.nextTick().then(val => {
          // 渲染完成后不再观察该元素
          instance.unobserve(target);
          const initedProp: Function = target.getAttribute("inited") as any;

          if (typeof initedProp === "function") initedProp.apply({}, target);
        });
      }
    });
  };
  instance = new Observer(handler.bind(instance), {});
}

const inserted: DirectiveFunction = function(
  this: Observer,
  el: HTMLElement,
  bindVal: DirectiveBinding
) {
  if (el.tagName.toLowerCase() != "img") return;

  if (el.getAttribute("loading-src")) {
    el.setAttribute("src", el.getAttribute("loading-src"));
  }
  if (!el.getAttribute("data-src")) {
    el.setAttribute("data-src", bindVal.value);
  }

  this.observe(el);
};

const VLazyDirective: DirectiveOptions = {
  inserted: inserted.bind(instance)
};

export default VLazyDirective;
