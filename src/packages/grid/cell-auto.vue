<!--
 * @Date: 2020-03-26 02:16:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-26 20:36:50
 * @repository: https://github.com/SkyBlueFeet
 -->

<script lang="tsx">
import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
import { CreateElement } from "vue";
import Cell from "./cell-mixins";

@Component({
  inheritAttrs: true
})
export default class VCellAuto extends Mixins(Cell) {
  @Prop({
    type: [Number, String],
    default: "1",
    validator(val) {
      let isVals = ["auto", "initial", "none"].indexOf(val) !== -1;
      let isInteger =
        !isNaN(Number(val)) &&
        Math.round(Number(val)) > 0 &&
        Math.round(Number(val)) < 10;
      return isInteger || isVals;
    }
  })
  flex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "auto" | "initial" | "none";

  render(h: CreateElement) {
    const { flex, commonClass, click } = this;
    const className = [
      flex ? "cell-flex-" + flex : "cell-auto",
      ...commonClass
    ].filter(v => v);
    return h(
      this.tag,
      { class: className, on: { click } },
      this.$slots.default
    );
  }
}
</script>
