<template>
  <transition-group
    :tag="tagName"
    name="lazy-component"
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
import { Component, Prop, Vue } from "vue-property-decorator";
import Observer from "./test";

if (typeof window !== "undefined") {
  window["_lazyObserver"] = null;
  console.log(IntersectionObserver);
}

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[]
) => void;

@Component({})
export default class VLazy extends Vue {
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

  isInit = false;
  timer = null;
  io: IntersectionObserver = null;
  loading = false;

  created() {
    // 如果指定timeout则无论可见与否都是在timeout之后初始化
    if (this.timeout) {
      this.timer = setTimeout(() => {
        this.init();
      }, this.timeout);
    }
  }

  mounted() {
    const _this = this;
    if (!_this.timeout) {
      // 根据滚动方向来构造视口外边距，用于提前加载
      let rootMargin =
        _this.direction == "vertical"
          ? `${_this.threshold} 0px`
          : `0px ${_this.threshold}`;

      // 观察视口与组件容器的交叉情况
      _this.io = _this.instance(_this.handleEntry());
      _this.io.observe(_this.$el);
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
        _this.io.unobserve(_this.$el);
      }
    };
  }

  // 处理组件和骨架组件的切换
  init() {
    // 此时说明骨架组件即将被切换

    this.$emit("before-init");

    // 此时可以准备加载懒加载组件的资源
    this.loading = true;

    // 由于函数会在主线程中执行，加载懒加载组件非常耗时，容易卡顿
    // 所以在requestAnimationFrame回调中延后执行
    this.requestAnimationFrame(() => {
      this.isInit = true;
      this.$emit("init");
    });
  }

  instance(handler: IntersectionObserverCallback): IntersectionObserver {
    const _this = this;
    return new window.IntersectionObserver(handler, {
      rootMargin: "0px",
      root: _this.viewport,
      threshold: [0, Number.MIN_VALUE, 0.01]
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
    if (this.io) {
      this.io.unobserve(this.$el);
    }
  }
}
</script>
