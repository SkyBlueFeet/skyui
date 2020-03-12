<!--
 * @Author: skybluefeet
 * @Date: 2020-03-04 15:12:46
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-04 15:31:32
 -->

<template>
  <div class="slide" @click="clickSlide">
    <slot />
  </div>
</template>
<script>
export default {
  methods: {
    clickSlide() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
.slide {
  width: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  z-index: 10;
  min-height: 100px;
  img {
    display: block;
  }
}
</style>
