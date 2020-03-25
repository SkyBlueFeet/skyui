<!--
 * @Date: 2020-03-15 18:38:01
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-25 17:47:58
 * @repository: https://github.com/SkyBlueFeet
 -->
<template>
  <div class="image">
    <transition name="fade" mode="out-in">
      <img
        v-if="initImage"
        v-show="status == 'ok'"
        key="image"
        @load="handleLoad"
        @error="handleError"
        :src="dataSrc"
        v-bind="attrs"
        :class="['image-content', fitProp]"
      />

      <template v-else-if="showSkeleton">
        <slot v-if="$slots.default"></slot>
        <div key="default" class="image-error">
          {{ alt }} {{ status == "error" ? "加载出错" : "正在加载" }}
        </div>
      </template>
    </transition>
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
import Observer from "../../abstract/intersection-observer";
import VLazy from "../lazy";

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

  @Prop({
    type: [String, Number],
    required: false,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  height: number | string;

  @Prop({
    type: [String, Number],
    required: false,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  width: number | string;

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
    default: "sync",
    validator(val: string) {
      let arr = ["sync", "lazy", "async"];
      return arr.indexOf(val) !== -1;
    }
  })
  loadType: string;

  get fitProp() {
    return this.fit ? "is-" + this.fit : "";
  }

  get attrs() {
    return utils.filterProps(this.$props, [
      "src",
      "loadType",
      "errorSrc",
      "fit"
    ]);
  }

  status: "error" | "ok" | "loading" = "loading";

  dataSrc: string = "";

  slotSrc: string = "";

  initImage: boolean = false;

  showSkeleton: boolean = true;

  _instance: Observer = null;

  @Watch("src")
  handleSrcChange(val: string) {
    this.dataSrc = val;
  }

  created() {}

  mounted() {
    if (this.loadType == "lazy" || this.lazy) {
      this.handleLazy();
    } else if (this.loadType == "async") {
      this.handleAsync();
    } else {
      this.handleSync();
    }
  }

  handleSync() {
    this.dataSrc = this.src;
    this.initImage = true;
  }

  handleAsync(callback?: (string) => void) {
    let image = new Image(Number(this.width), Number(this.height));
    image.src = this.src;

    new Promise<string>((resolve, reject) => {
      image.addEventListener("load", (e: Event) => {
        this.handleLoad(e);
        resolve(this.src);
      });

      image.addEventListener(
        "error",
        (e: Event) => {
          this.handleError(e);
          reject(this.errorSrc);
        },
        { once: true }
      );
    })
      .then(res => {
        if (typeof callback === "function") callback("ok");
        this.initImage = true;
      })
      .catch(errorSrc => {
        if (typeof callback === "function") callback("error");
        this.initImage = false;
      });
  }

  handleEntries(entries: IntersectionObserverEntry[]): void {
    const thisEntry = entries[0];
    if (thisEntry.isIntersecting || thisEntry.intersectionRatio) {
      this.handleAsync(status => {
        this._instance.unobserve(this.$el);
      });
    }
  }

  handleLazy() {
    this._instance = new Observer(this.handleEntries.bind(this), {});
    this._instance.observe(this.$el);
  }

  handleLoad(e) {
    this.status = "ok";
    this.dataSrc = this.src;
    this.$emit("load", e);
  }

  handleError(e) {
    this.status = "error";
    this.errorSrc ? (this.dataSrc = this.errorSrc) : (this.status = "error");
    this.$emit("error", e);
  }
}
</script>
