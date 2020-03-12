<!--
 * @Author: skybluefeet
 * @Date: 2020-03-03 15:46:08
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-03 16:00:14
 -->
<template>
  <div class="buttons" :class="{ 'has-addons': addons }">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component({})
export default class ButtonGroup extends Vue {
  @Prop({
    type: Boolean,
    default: true
  })
  addons: boolean;
}
</script>
