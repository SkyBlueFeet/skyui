import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

@Component({})
export default class VNavbarItem extends Vue {
  @Prop({
    type: String,
    default: "div",
    required: false
  })
  href: string;

  @Prop({
    type: String,
    default: "div",
    required: false
  })
  tag: string;

  @Prop({
    type: String,
    required: false
  })
  index: string;

  render(h: CreateElement) {
    return h(this.tag, { class: ["navbar-link"] }, this.$slots.default);
  }
}
