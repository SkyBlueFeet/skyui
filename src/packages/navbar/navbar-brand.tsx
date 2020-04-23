import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";
import VNavbarItem from "./navbar-item";

@Component({
  components: {
    VNavbarItem
  }
})
export default class VNavbarBrand extends Vue {
  @Prop({
    type: String,
    default: "div",
    required: false
  })
  tag: string;

  render(h: CreateElement) {
    return h(this.tag, { class: ["navbar-brand"] }, [
      this.$slots.default,
      this.$slots.burger
    ]);
  }
}
