/*
 * @Date: 2020-03-14 17:36:24
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-02 20:17:05
 * @repository: https://github.com/SkyBlueFeet
 */
const path = require("path");

module.exports = {
  server: {
    port: 8085
  },
  dev: true,
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    // "vuesax/dist/vuesax.css",
    path.resolve(process.cwd(), "src/scss/main.scss")
    // "element-ui/lib/theme-chalk/index.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vuesax", "@/plugins/skyui"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://github.com/nuxt-community/stylelint-module
    "@nuxtjs/stylelint-module"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxt/typescript-build"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  },
  srcDir: "./example"
};
