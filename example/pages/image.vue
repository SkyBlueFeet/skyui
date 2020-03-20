<!--
 * @Date: 2020-03-19 14:49:21
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-19 22:18:57
 * @repository: https://github.com/SkyBlueFeet
 -->
<template>
  <div>
    <div>
      <v-image title="图片" lazy :src="require(`@/assets/image/1.jpg`)">
      </v-image>
    </div>
    <div>
      <v-image title="图片" lazy :src="require(`@/assets/image/3.jpg`)">
      </v-image>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { Component as VueLazy } from "@xunlei/vue-lazy-component";

@Component({
  components: {
    // VueLazy
  }
})
export default class New extends Vue {
  src: string = "123456";
  fits = ["fill", "cover", "contain", "none", "scale-down"];
  handleClick() {
    this.src =
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
    console.log("123456");
  }
  test(index) {
    console.log(index);
  }
  mounted() {}
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
  /* margin: 2rem 0; */
}
.show-box {
  margin: 1rem 0;
}
.boxs {
  padding: 0 2rem;
}
.img {
  width: 100px;
  height: 100px;
}
</style>
