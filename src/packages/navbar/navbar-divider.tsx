import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

@Component({})
export default class VNavbarDivider extends Vue {
  render(h: CreateElement) {
    return <div class="navbar-divider"></div>;
  }
}
