/*
 * @Date: 2020-04-04 19:45:47
 * @LastEditors: skyblue
 * @LastEditTime: 2020-05-20 20:01:15
 * @repository: https://github.com/SkyBlueFeet
 */

import Vue from "vue";
import VueRouter from "vue-router";
import { Route } from "vue-router";
import { Store as Vuex } from "vuex";
// 全局变量设置
declare global {
  // const _: typeof lodash;
}

// 扩充
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Vuex<any>;
  }
}