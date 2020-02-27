<template>
  <button
    @click="handleClick"
    class="btn"
    :type="type"
    :disabled="disabled"
    :class="[styleProp, sizeProp, radiusProp, { 'btn-block': block }]"
  >
    <i v-if="icon !== ''" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

type Radius = "square" | "round";

type Theme =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

type nativeType = "button" | "reset" | "menu" | "submit";

@Component({})
export default class VButton extends Vue {
  name = "VButton";

  @Prop({
    // primary / secondary / success / info / warning / danger / light / dark
    type: String,
    required: false,
    default: "primary"
  })
  theme: Theme;

  @Prop({
    // button / reset / menu / submit
    type: String,
    required: false,
    default: "button"
  })
  type: nativeType;

  @Prop({
    type: Boolean,
    required: false,
    //false
    default: false
  })
  outline: boolean;

  @Prop({
    type: String,
    required: false,
    default: ""
  })
  icon: string;

  @Prop({
    type: String,
    required: false,
    default: ""
  })
  size: string;

  @Prop({
    type: Boolean,
    required: false,
    //false
    default: false
  })
  block: boolean;

  @Prop({
    type: String,
    required: false,
    default: ""
  })
  radius: Radius;

  @Prop({
    type: Boolean,
    required: false,
    //false
    default: false
  })
  disabled: boolean;

  get styleProp() {
    return (this.outline ? "btn-outline-" : "btn-") + this.theme;
  }
  get sizeProp() {
    return this.size && "btn-" + this.size;
  }

  get radiusProp() {
    return this.radius && "btn-" + this.radius;
  }

  handleClick(evt) {
    /**
     * @vuese
     * Used to manually clear the form
     * @arg (event)
     */
    this.$emit("click", evt);
  }
}
</script>
