<!--
 * @Author: skybluefeet
 * @Date: 2020-03-04 10:50:37
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-04 14:12:59
 -->

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VNode, CreateElement } from "vue";

export type Theme = "primary" | "info" | "success" | "warning" | "danger";
export type Target = "_self" | "_blank" | "_parent" | "_top";

@Component({})
export default class VLink extends Vue {
  name: string = "VLink";

  @Prop({ type: Boolean, default: false })
  //链接是否停用
  disabled: boolean;

  @Prop({ type: Boolean, default: true })
  //连接下划线
  underlined: boolean;

  @Prop({ type: String, default: "" })
  //a标签原生href
  href: string;

  @Prop({
    //  `primary`/`info`/`success`/`danger`/`warning`
    type: String,
    default: ""
  })
  //链接颜色
  theme: Theme;

  @Prop({ type: String, default: "" })
  //a标签原生href
  target: Target;

  @Prop({ type: String, default: "" })
  //a标签原生download
  download: string;

  render(h: CreateElement): VNode {
    let linkAttrs = {
      class: this.className
    };

    if (!this.disabled) {
      if (this.target) linkAttrs["target"] = this.target;
      if (this.href) linkAttrs["href"] = this.href;
      if (this.download) linkAttrs["target"] = this.download;
    }

    return h(
      this.disabled ? "span" : "a",
      { attrs: linkAttrs },
      this.$slots.default
    );
  }
  get className() {
    let defaultClass = ["link"];

    if (this.underlined) defaultClass.push("is-underlined");
    if (this.disabled) defaultClass.push("is-disabled");
    if (this.theme) defaultClass.push(`is-${this.theme}`);

    return defaultClass.join(" ");
  }
}
</script>
