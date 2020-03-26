/*
 * @Date: 2020-03-26 15:06:04
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-26 15:58:56
 * @repository: https://github.com/SkyBlueFeet
 */
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Cell extends Vue {
  @Prop({
    type: [Number, String],
    default: 0,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  gutter: number | string;

  @Prop({
    type: [Number, String],
    default: 0,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  pull: number | string;

  @Prop({
    type: [Number, String],
    default: 0,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  push: number | string;

  @Prop({
    type: [Number, String],
    default: 0,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  offset: number | string;

  @Prop({
    type: String,
    default: "",
    validator(val) {
      const align = ["top", "middle", "bottom", "baseline", "stretch", ""];
      return align.indexOf(val) !== -1;
    }
  })
  align: "top" | "middle" | "bottom" | "baseline" | "stretch" | "";

  @Prop({
    type: String,
    default: "div"
  })
  tag: string;

  get commonClass(): string[] {
    const { gutter, pull, push, align, offset } = this;
    return [
      align ? "flex-align-" + align : "",
      gutter ? "cell-gutter-" + gutter : "",
      offset ? "cell-offset-" + offset : "",
      pull ? "cell-pull-" + pull : "",
      push ? "cell-push-" + push : ""
    ];
  }

  click(e: MouseEvent): void {
    this.$emit("click", e);
  }
}
