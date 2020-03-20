<!--
 * @Date: 2020-03-14 17:36:24
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-15 16:47:40
 * @repository: https://github.com/SkyBlueFeet
 -->
<template>
  <section class="swiper" @touchmove.prevent="preventTouch">
    <div
      :ref="node"
      class="swiper-content"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot />
    </div>

    <div v-if="indicator" class="swiper-indicator">
      <button
        v-for="index in slidesLength"
        :key="index"
        @mouseenter="handleButtonEnter(index - 1)"
        @mouseleave="handleButtonLeave()"
        @click="handleButtonClick(index - 1)"
        :class="['swiper-indicator-item', { 'is-active': active == index }]"
      ></button>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import utils from "../../utils/utils";
import { Style } from "../../utils/define";

@Component({})
export default class VSwiper extends Vue {
  slidesLength: number = 0;
  width: number = 0;
  sliding: boolean = true;
  timer;
  node: string = "";
  slideStyle: Style = {};
  touch = {
    sx: 0,
    s: 0,
    move: 0,
    e: 0
  };

  active: number = 1;

  @Prop({
    type: Boolean,
    default: true
  })
  //自动轮播
  autoPlay: boolean;

  @Prop({
    type: Number,
    default: 400
  })
  //轮播图切换时间
  duration: number;

  @Prop({
    type: Number,
    default: 3000
  })
  // 轮播图停歇间隔
  interval: number;

  @Prop({
    type: Boolean,
    default: true
  })
  // 是否显示指示器
  indicator: boolean;

  @Prop({
    type: String,
    default: "hover"
  })
  trigger: "hover" | "click";

  @Watch("active", { deep: true })
  onSlideIndexChanged(newVal, oldVal) {
    this.$emit("change", newVal + 1, oldVal + 1);
  }

  /**
   * Vue 生命周期钩子
   */
  created() {
    this.node = `swiper-${Math.round(Math.random() * 1000)}`;
  }

  mounted() {
    this.initSwiper();

    this.handleStyle(this.width * -1);

    if (this.autoPlay) this.carouselTimer();
  }

  beforeDestroy() {
    // 清理计时器
    clearTimeout(this.timer);
  }

  /**
   * 移动设备事件： 开始触摸屏幕
   */
  touchStart(x) {
    if (this.sliding) {
      clearTimeout(this.timer);
      this.touch.sx = this.handleStyle().getTransform();
      this.touch.s = x.touches[x.touches.length - 1].clientX;
    }
  }

  /**
   * 移动设备事件： 轮播图开始滑动
   */
  touchMove(x) {
    if (this.sliding && this.touch.s != -1) {
      clearTimeout(this.timer);
      this.touch.move = x.touches[x.touches.length - 1].clientX - this.touch.s;
      this.handleStyle(this.touch.move + this.touch.sx);
    }
  }

  /**
   * 移动设备事件： 轮播图滑动结束
   */
  async touchEnd(x) {
    if (this.sliding && this.touch.s != -1) {
      clearTimeout(this.timer);
      this.handleStyle(this.touch.move + this.touch.sx);
      x = this.handleStyle().getTransform();
      x += this.touch.move > 0 ? this.width * 0.3 : this.width * -0.3;

      await this.swiper(Math.round(x / this.width) * -1, "touch");
    }
  }

  /**
   * 阻止轮播区默认触摸事件
   */
  preventTouch(e: MouseEvent) {
    e.preventDefault();
  }

  /**
   * 按钮事件
   */

  handleButtonEnter(buttonIndex) {
    if (this.trigger == "hover") this.swiper(buttonIndex + 1);
    clearTimeout(this.timer);
  }

  handleButtonLeave() {
    if (this.autoPlay) this.carouselTimer();
    return;
  }

  handleButtonClick(buttonIndex) {
    if (this.trigger == "click") this.swiper(buttonIndex + 1);
  }

  /**
   * 轮播定时器
   */
  carouselTimer(): Promise<number> {
    // 定时器达到`this.interval`后切换下一个轮播图
    const $this = this;
    return new Promise(res => {
      this.timer = setTimeout(() => {
        res(this.swiper(this.active + 1));
      }, this.interval);
    });
  }

  swiper(to: number, type?: string): Promise<number> {
    clearTimeout(this.timer);
    const index = (this.active = this.ensureActive(to));

    this.sliding = false;

    //切换轮播图的动画时间
    let duration = type == "touch" ? 250 : this.duration;

    //设定 style
    this.handleStyle(index * -1 * this.width, duration);

    // 设定触摸
    this.touch.move = 0;
    this.touch.s = -1; //保证下次重新赋值

    if (this.autoPlay) this.carouselTimer();

    return new Promise((res, rej) => {
      setTimeout(() => {
        this.handleStyle(index * -1 * this.width, 0);

        //轮播状态设定为正在进行切换动画
        this.sliding = true;

        //返回轮播索引
        res(index);
      }, duration);
    });
  }

  initSwiper() {
    type Refs = Vue | Element | Vue[] | Element[];
    const $node = utils.typeConvert<Refs, HTMLElement>(this.$refs[this.node]);

    this.slidesLength = $node.children.length;

    if (this.slidesLength > 1) {
      let firstChild = $node.firstElementChild.cloneNode(true); //向最后append
      let lastChild = $node.lastElementChild.cloneNode(true); //向最前append

      $node.insertBefore(lastChild, $node.firstElementChild);

      $node.appendChild(firstChild);

      this.width = $node.offsetWidth;

      this.slideStyle = $node.style;
    }
  }

  handleStyle(trans?: number, duration?: number) {
    if (duration || duration == 0) this.slideStyle.transition = duration + "ms";
    if (trans || trans == 0) {
      this.slideStyle.transform = `translate3d(${trans}px, 0px, 0px)`;
      this.slideStyle[
        "-webkit-transform"
      ] = `translate3d(${trans}px, 0px, 0px)`;
      this.slideStyle["-ms-transform"] = `translate3d(${trans}px, 0px, 0px)`;
    }
    let $this = this;
    return {
      getTransform() {
        let transform =
          $this.slideStyle.transform ||
          $this.slideStyle["-webkit-transform"] ||
          $this.slideStyle["-ms-transform"];
        transform = transform.substring(12);
        transform = transform.match(/(\S*)px/)[1];
        return Number(transform);
      }
    };
  }

  ensureActive($index: number): number {
    if ($index >= this.slidesLength + 1) return 1;
    if ($index <= 0) return this.slidesLength;
    return $index;
  }

  buttonIndexHandler(buttonIndex: number): number {
    this.active = buttonIndex + 1;
    return this.active;
  }
}
</script>
