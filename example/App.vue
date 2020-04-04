<!--
 * @Date: 2020-04-03 12:12:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-04 15:48:56
 * @repository: https://github.com/SkyBlueFeet
 -->
<script lang="tsx">
import Vue, { CreateElement, VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";
import README from "@root//README.md";
import logo from "@root/logo.png";

@Component
export default class App extends Vue {
  created(): void {
    this.$$store.state.user.info.data = "sky blue";
    console.log(_.cloneDeep(this.$$store.state.user.info));
    console.log(README);
  }
  render(h: CreateElement): VNode {
    return (
      <div id="app">
        <img src={logo} />
        <h2>Vue TSX template</h2>
        <router-view />
      </div>
    );
  }
}
</script>
<style lang="postcss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
