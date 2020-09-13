/**
 * @Date: 2020-04-02 15:04:28
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-05 10:15:36
 * @repository: https://github.com/SkyBlueFeet
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import VCollapseTransition from "../../transitions/collapse";
import { isTablet } from "../../utils/device";
import { CreateElement } from "vue";
import { VNode } from "vue/types/umd";
import VNavbarBrand from "./navbar-brand";
import VNavbarItem from "./navbar-item";
import VNarbarMenu from "./navbar-menu";

@Component({
  components: {
    VNavbarBrand,
    VCollapseTransition,
    VNarbarMenu
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

  @Prop({
    type: String,
    default: "light",
    validator(val) {
      const themes = ["light", "dark"];
      return themes.indexOf(val) !== -1;
    }
  })
  type: "light" | "dark";

  @Prop({
    type: String,
    default: "nav-slide"
  })
  transtion: string;

  _tabletMenu: boolean = false;

  menuIsShow: boolean = this.isTablet() ? this._tabletMenu : true;

  isTablet() {
    if (this.$isServer) return false;
    return isTablet(window);
  }

  render(h: CreateElement): VNode {
    const handleClick = () => {
      this.isTablet()
        ? (this.menuIsShow = !this.menuIsShow)
        : (this.menuIsShow = true);
    };

    const tabletIcon = (
      <div class="navbar-burger" slot="burger" onClick={handleClick}></div>
    );

    const defaultSlot = (
      <v-navbar-item tag="div">{this.$slots.brand}</v-navbar-item>
    );

    const customBrand = this.$slots.customBrand;

    const menuClass = {
      "is-active": this.menuIsShow
    };
    const navbarClass = ["v-navbar", "is-" + this.type];
    return (
      <div class={navbarClass}>
        <v-navbar-brand>
          {customBrand ? customBrand : defaultSlot}
          {tabletIcon}
        </v-navbar-brand>
        <transition name={this.transtion}>
          <v-narbar-menu class={menuClass} v-show={this.menuIsShow}>
            <template slot="start">{this.$slots.start}</template>
            <template slot="end">{this.$slots.end}</template>
          </v-narbar-menu>
        </transition>
      </div>
    );
  }
}
