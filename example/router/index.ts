/*
 * @Date: 2020-04-03 12:12:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-04 15:51:58
 * @repository: https://github.com/SkyBlueFeet
 */
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld";
import Test from "../components/jsx.vue";
import Index from "../pages/index.vue";
import New from "../pages/new.vue";
import TSXTest from "../pages/testTSX";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hello",
      component: HelloWorld
    },
    {
      path: "/nuxt",
      name: "nuxt",
      component: Index
    },
    {
      path: "/nuxt/new",
      name: "new",
      component: New
    },
    {
      path: "/test",
      name: "TSXTest",
      component: TSXTest
    }
  ]
});
