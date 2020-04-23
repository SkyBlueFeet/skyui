import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

@Component({})
export default class VNavbarMenu extends Vue {
  render(h: CreateElement) {
    return (
      <div class="navbar-menu">
        <div class="navbar-menu-start">{this.$slots.start}</div>
        <div class="navbar-menu-end">{this.$slots.end}</div>
      </div>
    );
  }
}
