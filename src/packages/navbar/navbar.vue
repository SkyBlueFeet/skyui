<!--
 * @Date: 2020-04-02 15:04:28
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-04 15:34:46
 * @repository: https://github.com/SkyBlueFeet
 -->
<template>
  <div class="v-navbar">
    <slot></slot>
    <div class="navbar-menu">
      <div class="navbar-menu-start">
        <div class="navbar-item">12306</div>
        <a class="navbar-item">12306</a>
        <div
          @mouseleave="handleMouseLeave"
          @mouseenter="handleMouseEnter"
          @click="test"
          class="navbar-item has-dropdown"
        >
          <a class="navbar-link">More</a>
          <template v-if="isTablet()">
            <v-collapse-transition>
              <ul v-if="dropdown" class="navbar-dropdown">
                <li class="navbar-item">12306</li>
                <li class="navbar-divider"></li>
                <li class="navbar-item">12306</li>
                <li class="navbar-item">12306</li>
              </ul>
            </v-collapse-transition>
          </template>
          <template v-else>
            <transition name="nav-slide">
              <ul v-if="dropdown" class="navbar-dropdown">
                <li class="navbar-item">12306</li>
                <li class="navbar-divider"></li>
                <li class="navbar-item">12306</li>
                <li class="navbar-item">12306</li>
              </ul>
            </transition>
          </template>
        </div>
      </div>
      <div class="navbar-menu-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VCollapseTransition from "../../transitions/collope";
import { isTablet } from "../../utils/device";
// import VBrand from "./navbar-brand";

@Component({
  components: {
    // VBrand,
    VCollapseTransition
  }
})
export default class VNavbar extends Vue {
  @Prop({
    type: [String, Number],
    default: 0,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  active: string | number = 0;
  dropdown: boolean = false;
  created() {}
  mounted() {
    console.log(this.$slots.dropdown);
  }
  handleMouseEnter(e: MouseEvent) {
    this.dropdown = true;
  }
  handleMouseLeave(e: MouseEvent) {
    this.dropdown = false;
  }
  test() {
    this.dropdown = !this.dropdown;
  }
  isTablet() {
    if (this.$isServer) return false;
    return isTablet(window);
  }
}
</script>
