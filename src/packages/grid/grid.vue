<!--
 * @Date: 2020-03-26 01:03:32
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-26 16:43:35
 * @repository: https://github.com/SkyBlueFeet
 -->
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { CreateElement } from "vue";

@Component({})
export default class VGrid extends Vue {
  @Prop({
    type: [Number, String],
    default: 3,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  gutter: number | string;

  @Prop({
    type: String,
    default: "flex",
    validator(val) {
      return ["float", "flex"].indexOf(val) !== -1;
    }
  })
  type: "float" | "flex";

  @Prop({
    type: String,
    default: "top",
    validator(val) {
      let align = ["top", "middle", "bottom", "baseline", "stretch"];
      return align.indexOf(val) !== -1;
    }
  })
  align: "top" | "middle" | "bottom" | "baseline" | "stretch";

  @Prop({
    type: String,
    default: "start",
    validator(val) {
      let justify = ["start", "end", "center", "around", "between", "evenly"];
      return justify.indexOf(val) !== -1;
    }
  })
  justify: "start" | "end" | "center" | "around" | "between" | "evenly";

  @Prop({
    type: String,
    default: "div"
  })
  tag: string;

  render(h: CreateElement) {
    const { type, justify, align, gutter, $slots, tag } = this;
    const flexClass =
      type == "flex"
        ? [
            justify ? "flex-justify-" + justify : "",
            align ? "flex-align-" + justify : ""
          ]
        : [];
    const className = [
      "grid-" + type,
      ...flexClass,
      gutter ? "cell-gutter-" + gutter : ""
    ]
      .filter(v => v)
      .join(" ");
    return h(
      this.tag,
      { attrs: { class: className }, on: {} },
      this.$slots.default
    );
  }
}
</script>
