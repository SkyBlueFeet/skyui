<template>
  <transition-group
    :tag="tagName"
    :name="transition"
    style="position: relative;"
    @before-enter="handleBeforeEntry"
    @before-leave="handleBeforeLeave"
    @after-enter="handleAfterEntry"
    @after-leave="handleAfterLeave"
  >
    <div v-if="isInit" key="component">
      <slot :loading="loading"></slot>
    </div>
    <div v-else-if="$slots.skeleton" key="skeleton">
      <slot name="skeleton"></slot>
    </div>
    <div v-else key="loading"></div>
  </transition-group>
</template>

<script lang="ts">
import "intersection-observer";
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import { VueObserver } from "../../abstract/intersection-observer";

if (typeof window !== "undefined") {
  window["_lazyObserver"] = null;
}

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[]
) => void;

@Component({})
export default class VLazy extends Mixins(VueObserver) {
  @Prop(Number) timeout;
  @Prop({
    type: String,
    default: "div"
  })
  tagName: string;

  @Prop({
    type: typeof window === "undefined" ? Object : Element,
    default: null
  })
  viewport: Element;

  @Prop({
    type: String,
    default: "0px"
  })
  threshold: string;

  @Prop({
    type: String,
    default: "vertical"
  })
  direction: string;

  @Prop({
    type: Number,
    default: 50
  })
  maxWaitingTime: string;

  @Prop({
    type: String,
    default: "fade"
  })
  transition: string;

  isInit = false;
  timer = null;
  status: "loading" | "error" | "ok" = "loading";
  loading = false;

  created() {
    // 如果指定timeout则无论可见与否都是在timeout之后初始化

    if (this.timeout) {
      this.timer = setTimeout(() => {
        this.init();
      }, this.timeout);
    }

    this._handler = this.handleEntry();
    const { rootMargin, viewport = null } = this;
    this._options = {
      rootMargin,
      root: viewport,
      threshold: [0, Number.MIN_VALUE, 0.01]
    };
  }

  get rootMargin() {
    return this.direction == "vertical" // 根据滚动方向来构造视口外边距，用于提前加载
      ? `${this.threshold} 0px`
      : `0px ${this.threshold}`;
  }

  mounted() {
    const _this = this;
    if (!_this.timeout) {
      _this.observe(_this.$el);
    }
  }

  handleBeforeEntry(el) {
    this.$emit("before-enter", el);
  }

  handleBeforeLeave(el) {
    this.$emit("before-leave", el);
  }

  handleAfterEntry(el) {
    this.$emit("before-enter", el);
  }

  handleAfterLeave(el) {
    this.$emit("before-leave", el);
  }

  handleEntry(): IntersectionObserverCallback {
    const _this = this;
    return function(entries: IntersectionObserverEntry[]) {
      if (
        // 正在交叉
        entries[0].isIntersecting ||
        // 交叉率大于0
        entries[0].intersectionRatio
      ) {
        _this.init();
        Vue.nextTick().then(res => {
          _this.$emit("inited", _this.$el);
          _this.status = "ok";
          _this.unobserve(_this.$el);
        });
      }
    };
  }

  // 处理组件和骨架组件的切换
  init() {
    // 此时说明骨架组件即将被切换

    // 此时可以准备加载懒加载组件的资源
    this.loading = true;
    this.status = "loading";

    // 由于函数会在主线程中执行，加载懒加载组件非常耗时，容易卡顿
    // 所以在requestAnimationFrame回调中延后执行
    this.requestAnimationFrame(() => {
      this.isInit = true;
      this.$emit("before-init");
    });
  }

  requestAnimationFrame(callback) {
    // 防止等待太久没有执行回调
    // 设置最大等待时间
    setTimeout(() => {
      if (this.isInit) return;
      callback();
    }, Number(this.maxWaitingTime));

    // 兼容不支持requestAnimationFrame 的浏览器
    try {
      return requestAnimationFrame(callback);
    } catch (error) {
      (callback => setTimeout(callback, 1000 / 60))(callback);
    }
  }

  beforeDestroy() {
    // 在组件销毁前取消观察
    this._instance && this.unobserve(this.$el);
  }
}
</script>
