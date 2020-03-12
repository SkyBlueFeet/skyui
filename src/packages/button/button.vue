<!--
 * @Author: skybluefeet
 * @Date: 2020-03-03 11:52:49
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-05 13:58:39
 -->
<template>
  <button
    class="button"
    :class="[
      themeProp,
      radiusProp,
      {
        'is-outlined': outlined,
        'is-inverted': inverted,
        'is-light': light,
        'is-fullwidth': blocked
      },
      sizeProp
    ]"
    @click="handleClick"
    :type="nativeType"
    :autofocus="autofocus"
    :disabled="disabled || loading"
  >
    <span v-if="loading">
      <v-icon spin fa="spinner"></v-icon>
    </span>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import VIcon from "../icon";

export type Radius = "default" | "squared" | "rounded";
export type Size = "small" | "normal" | "medium" | "large";
export type NativeType = "button" | "submit" | "menu" | "reset";
export type Theme =
  | "default"
  | "primary"
  | "danger"
  | "success"
  | "info"
  | "link"
  | "warning"
  | "text";

@Component({ components: { VIcon } })
export default class VButton extends Vue {
  name: string = "VButton";
  @Prop({
    type: String,
    default: "default"
  })
  radius: Radius;

  @Prop({ type: Boolean, default: false })
  inverted: boolean;

  @Prop({
    type: String,
    default: "button"
  })
  nativeType: NativeType;

  @Prop({ type: String, default: "default" })
  type: Theme;

  @Prop({ type: String, default: "" })
  icon: string;

  @Prop({ type: Boolean, default: false })
  outlined: boolean;

  @Prop({ type: Boolean, default: false })
  blocked: boolean;

  @Prop({ type: Boolean, default: false })
  light: boolean;

  @Prop({ type: String, default: "normal" })
  size: Size;

  @Prop({ type: Boolean, default: false })
  loading: boolean;

  @Prop({ type: Boolean, default: false })
  disabled: boolean;

  @Prop({ type: Boolean, default: false })
  autofocus: boolean;

  get themeProp() {
    return this.type == "default" ? "" : `is-${this.type}`;
  }

  get radiusProp() {
    return this.radius == "default" ? "" : `is-${this.radius}`;
  }

  get sizeProp() {
    return this.size == "normal" ? "" : `is-${this.size}`;
  }

  handleClick(evt) {
    this.$emit("click", evt);
  }
}
</script>
