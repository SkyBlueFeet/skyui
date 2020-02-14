import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/**
 * SSR异步组件报错document is not defined
 * https://github.com/SkyBlueFeet/skyui/issues/6
 */

type vueModule = Promise<typeof import("*.vue")>;

const HomeView = (): vueModule => import("../views/Home.view.vue");
const DetailView = (): vueModule => import("../views/Detail.view.vue");

export function createRouter(): Router {
    return new Router({
        mode: "history",
        base: "/app",
        routes: [
            // { path: "/", redirect: "/app" },
            { path: "/", component: HomeView },
            { path: "/detail", component: DetailView }
        ]
    });
}
