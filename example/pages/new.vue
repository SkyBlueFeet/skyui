<!--
 * @Author: skybluefeet
 * @Date: 2020-03-03 20:26:17
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-05 10:59:44
 -->
<template>
  <div class="boxs">
    <h2>分割线</h2>
    <div class="show-box">
      <v-divider></v-divider>
      <v-divider>左侧有文本的分割线</v-divider>
      <v-divider position="center">中间有文本的分割线</v-divider>
      <v-divider position="right">右侧有文本的分割线</v-divider>
      <div>
        文本1
        <v-divider direction="vertical"></v-divider>
        文本2
        <v-divider direction="vertical"></v-divider>
        文本3
      </div>
    </div>
    <h2>链接</h2>
    <div class="show-box">
      <v-link>默认链接</v-link>
      <v-link theme="primary">主要链接</v-link>
      <v-link theme="success">成功链接</v-link>
      <v-link>默认链接</v-link>
    </div>
    <div class="show-box">
      <v-link disabled>停用链接</v-link>
      <v-link theme="primary" disabled>停用链接</v-link>
    </div>
    <div class="show-box">
      <v-link>有下划线</v-link>
      <v-link :underlined="false">无下划线</v-link>
    </div>
    <h2>轮播图</h2>
    <div class="columns">
      <div class="column is-4">
        <v-swiper @change="test" v-if="list.length > 0">
          <v-slide v-for="(item, index) in list" :key="index">
            默认轮播{{ item }}
          </v-slide>
        </v-swiper>
      </div>
      <div class="column is-4">
        <v-swiper>
          <v-slide>
            同步加载轮播图情况 1
          </v-slide>
          <v-slide>
            同步加载轮播图情况 2
          </v-slide>
          <v-slide>
            同步加载轮播图情况 3
          </v-slide>
        </v-swiper>
      </div>
      <div class="column is-4">
        <v-swiper
          v-if="slidesReal.length > 0"
          :autoPlay="true"
          :indicator="true"
          :interval="5000"
          :duration="400"
        >
          <v-slide
            @click="clickMe"
            v-for="(item, index) in slidesReal"
            :key="index"
          >
            加一些参数配置 添加click事件 {{ index }}
          </v-slide>
        </v-swiper>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class New extends Vue {
  slidesReal = ["123", "456"];
  list = ["1", "2", "3", "4", "5"];
  clickMe() {
    console.log("点击");
  }
  test(index) {
    // console.log(index);
  }
}
</script>
<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1rem 0;
}
html,
body {
  min-height: 1500px;
  margin: 2rem 0;
}
.show-box {
  margin: 1rem 0;
}
.boxs {
  padding: 0 2rem;
}
</style>
