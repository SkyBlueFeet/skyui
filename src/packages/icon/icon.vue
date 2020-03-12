<!--
 * @Author: skybluefeet
 * @Date: 2020-03-03 14:07:57
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-03 15:39:00
 -->
<!--  -->
<template>
  <i
    class="fa"
    :class="[
      faProp,
      sizeProp,
      rotateProp,
      flipProp,
      { 'fa-fw': fixed, 'fa-spin': spin }
    ]"
    aria-hidden="true"
  >
  </i>
</template>
<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

type Size = "lg" | "2x" | "3x" | "4x" | "5x";

type Flip = "horizontal" | "vertical";

@Component({})
export default class VIcon extends Vue {
  @Prop({ type: String, default: "" })
  fa: string;

  @Prop({ type: String, default: "lg" })
  size: Size;

  @Prop({ type: Number, default: 0 })
  rotate: number = 0;

  @Prop({ type: Boolean, default: true })
  fixed: boolean;

  @Prop({ type: Boolean, default: false })
  spin: boolean;

  @Prop({ type: String, default: "" }) flip: Flip;

  get sizeProp() {
    return `fa-${this.size}`;
  }
  get rotateProp() {
    return this.rotate > 0 ? `fa-rotate-${this.rotate}` : "";
  }
  get flipProp() {
    return this.flip ? `fa-flip-${this.flip}` : "";
  }

  get faProp() {
    return this.fa ? `fa-${this.fa}` : "";
  }
}
</script>
