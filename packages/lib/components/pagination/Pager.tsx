import { Component, Vue, Prop } from "vue-property-decorator";
import { VNode, CreateElement } from "vue/types/umd";

@Component({})
export default class Pager extends Vue {
  @Prop({ type: String, required: true }) size: string;
  @Prop({ type: Number, required: true }) pageNo: number;
  @Prop({ type: Boolean, required: true }) active: boolean;

  render(h: CreateElement): VNode {
    // eslint-disable-line
    const activeClass = this.active
      ? `button is-primary ${this.size}`
      : `button ${this.size}`;
    return (
      <li>
        <a
          class={activeClass}
          onClick={this.$parent["handleChangePage"].bind(this, this.pageNo)}
        >
          {this.pageNo}
        </a>
      </li>
    );
  }
}
