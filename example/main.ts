/*
 * @Date: 2019-04-03 12:12:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-04 15:55:20
 * @repository: https://github.com/SkyBlueFeet
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { CreateElement, VNode } from "vue/types/umd";
import SkyUi from "../src";
import "../src/scss/main.scss";
Vue.config.productionTip = false;

Vue.use(SkyUi);
Vue.prototype.$$store = store;

const app = new Vue({
  el: "#app",
  store,
  router,
  render: (h: CreateElement): VNode => h(App)
});

export default app;
