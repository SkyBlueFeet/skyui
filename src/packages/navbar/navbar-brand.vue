<!--
 * @Date: 2020-04-04 15:24:18
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-04 15:33:16
 * @repository: https://github.com/SkyBlueFeet
 -->
<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

@Component({})
export default class VNavbarBrand extends Vue {
  @Prop({
    type: String,
    default: "div",
    required: false
  })
  tag: string;

  render(h: CreateElement) {
    const tag = h(this.tag, { class: ["navbar-brand"] }, this.$slots.default);
    // console.log(tag);
    const tabletIcon = <div class="navbar-burger"></div>;
    return (
      <div class="navbar-brand">
        {this.$slots.default}
        <tabletIcon />
      </div>
    );
  }
}
</script>
