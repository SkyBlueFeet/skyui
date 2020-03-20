<!--
 * @Author: skybluefeet
 * @Date: 2020-03-04 15:12:46
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-15 16:31:58
 -->

<template>
  <div class="slide" @click="handleClick">
    <slot />
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>
