<!--
 * @Date: 2020-03-15 18:38:01
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-19 22:21:09
 * @repository: https://github.com/SkyBlueFeet
 -->
<template>
  <div class="image">
    <template v-if="status !== 'ok'">
      <slot v-if="status && $slots[status]" :name="status"></slot>
      <div v-else-if="status && !$slots[status]" class="image-error">
        {{ alt }} {{ status == "error" ? "加载错误" : "正在加载" }}
      </div>
    </template>

    <img
      ref="imageEl"
      v-show="status == 'ok'"
      v-bind="attrs"
      :class="['image-content', fitProp]"
    />
  </div>
</template>
<script lang="tsx">
import {
  Component,
  Prop,
  Vue,
  Mixins,
  Ref,
  Watch
} from "vue-property-decorator";

import { CreateElement } from "vue";
import utils from "../../utils/utils";
import publicProp from "../../minixs/PublicPropMixin";
import { isInView, loadImg, scrollHandler } from "./lazy";
// import LazyLoadComponents from "vue-lazy-component/src/vue-lazy-component";

// Vue.use(LazyLoadComponents);

@Component({
  inheritAttrs: false
})
export default class VImage extends Mixins(publicProp) {
  @Prop({
    type: String,
    required: true,
    validator(value) {
      return !!value;
    }
  })
  // 图片路径
  src: string;

  @Prop({
    type: String,
    default: "",
    validator(value) {
      let fitValue = ["scale-down", "fill", "cover", "contain", "none", ""];
      return fitValue.indexOf(value) !== -1;
    }
  })
  // object-fit
  fit: string;

  // 原生 alt
  @Prop(String) alt: string;

  @Prop(String) referrerPolicy: string;

  @Prop([String, Number]) height: number | string;

  @Prop([String, Number]) width: number | string;

  @Prop({
    type: Boolean,
    default: false
  })
  lazy: boolean;

  @Prop({
    type: String,
    default: ""
  })
  errorSrc: string;

  @Prop({
    type: String,
    default: ""
  })
  loadingSrc: string;

  @Prop({
    type: String,
    default: ""
  })
  loadings: string;

  @Ref() imageEl: HTMLImageElement;

  get fitProp() {
    return this.fit ? "is-" + this.fit : "";
  }

  get attrs() {
    return utils.filterProps(this.$props, ["src"]);
  }

  status: "error" | "ok" | "loading" = "loading";
  slot: "error" | "loading" | false;

  dataSrc: string = "";

  error: boolean = false;

  loading: boolean = false;

  timeOut = 10000;

  @Watch("src")
  handleSrcChange(val) {
    this.loadImg();
  }

  created() {
    this.loading = true;
  }

  mounted() {
    let rect = this.$el.getBoundingClientRect();
    // console.log(this.$el.tagName, this.$el.scrollHeight, rect.y, rect.top);
    if (this.lazy) this.handleLazy();
    else this.handleSync();
  }

  initEvent(el: HTMLImageElement) {
    let $this = this;

    function handleError(e: Event) {
      let _this: HTMLImageElement = this;
      $this.status = "error";
      $this.$emit("error", e);
    }

    function handleLoad(e: Event) {
      $this.status = "ok";
      $this.$emit("load", e);
    }

    el.addEventListener("load", handleLoad);

    el.addEventListener("error", handleError, { once: true });
  }

  handleSync() {
    this.initEvent(this.imageEl);
    this.loadImg();
  }

  loadImg(): void {
    this.imageEl.src = this.src;
  }

  handleScroll(e) {
    console.log(e);
  }

  handleLazy() {
    const imageEl: HTMLImageElement = this.imageEl;
    const $el = utils.typeConvert<Element, HTMLElement>(this.$el);

    const $this = this;

    const isInView = (el: HTMLElement): boolean => {
      const rect = el.getBoundingClientRect();
      const clientHight = window.innerHeight;
      return rect.y <= 10 || rect.y < clientHight;
    };

    console.log(isInView($el));

    if (isInView($el)) $this.loadImg();

    $this.initEvent(this.imageEl);

    window.addEventListener("scroll", e => {
      if (isInView($el) && $this.status == "loading") {
        let rect = $el.getBoundingClientRect();
        $this.loadImg.call($this);
      }
    });
  }
}
</script>
