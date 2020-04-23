import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement, VNode } from "vue/types/umd";
import { isTablet } from "../../utils/device";

@Component({})
export default class VNavbarDropdown extends Vue {
  private dropdown: boolean = false;

  private specificTrans: string = "collapse";

  @Prop({
    type: String,
    default: ""
  })
  text: string;

  @Prop({
    type: String,
    default: "nav-slide"
  })
  transtion: string;

  @Prop({
    type: String,
    default: "collapse"
  })
  _tabletTranstion: string;

  handleMouseEnter(e: MouseEvent) {
    this.dropdown = true;
  }
  handleMouseLeave(e: MouseEvent) {
    this.dropdown = false;
  }

  get isTablet() {
    if (this.$isServer) return false;
    return isTablet(window);
  }

  get _transtion() {
    if (this.$isServer) return this.transtion;
    return isTablet(window) ? this._tabletTranstion : this.transtion;
  }

  transVNode(name: string, content: VNode) {
    const h = this.$createElement;

    if (name == this.specificTrans) {
      return <v-collapse-transition>{content}</v-collapse-transition>;
    } else {
      return <transition name={name}>{content}</transition>;
    }
  }

  dropdownItems(h: CreateElement) {
    const dropdownDOM = (
      <div v-show={this.dropdown} class="navbar-dropdown">
        {this.$slots.default}
      </div>
    );

    return this.transVNode(this._transtion, dropdownDOM);
  }

  setTextSlot(h: CreateElement) {
    let titleVNode: VNode;
    const textSlot = this.$slots.text;

    const defaultSlot = (content: VNode | string) => {
      return <div class="navbar-dropdown-title has-arrow">{content}</div>;
    };

    if (textSlot && textSlot[0].text) {
      titleVNode = defaultSlot(this.$slots.text[0].text);
    } else if (textSlot) {
      titleVNode = textSlot[0];

      if (titleVNode.data) {
        titleVNode.data.class = ["has-arrow"];
      } else {
        titleVNode = defaultSlot(titleVNode);
      }
      titleVNode.data.class = ["has-arrow"];
    }

    return titleVNode;
  }

  render(h: CreateElement) {
    let titleVNode: VNode = this.setTextSlot(h) || (
      <div class="navbar-dropdown-title has-arrow">{this.text}</div>
    );

    return (
      <div
        onmouseleave={this.handleMouseLeave}
        onmouseenter={this.handleMouseEnter}
        class="navbar-item has-dropdown"
      >
        {titleVNode}

        {this.dropdownItems(h)}
      </div>
    );
  }
}
