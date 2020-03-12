<!--
 * @Author: skybluefeet
 * @Date: 2020-03-03 17:30:11
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-04 10:47:38
 -->
<template>
  <div :class="['divider', `is-${direction}`]">
    <div
      v-if="$slots.default && direction !== 'vertical'"
      :class="['is-text', `is-${position}`]"
    >
      <!-- 分割线内嵌文本 -->
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export type Position = "left" | "right" | "center";

export type Direction = "vertical" | "horizontal";

@Component({})
export default class VDivider extends Vue {
  name: string = "VDivider";

  // 分割线内嵌文本位置
  @Prop({
    // `left` / `right` / `center`
    type: String,
    default: "left"
  })
  position: Position;

  // 分割线类型
  @Prop({
    // `horizontal`|`vertical`
    type: String,
    default: "horizontal"
  })
  direction: Direction;
}
</script>
