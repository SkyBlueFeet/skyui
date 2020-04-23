<!--
 * @Date: 2020-03-26 02:07:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-26 20:39:59
 * @repository: https://github.com/SkyBlueFeet
 -->
<script lang="ts">
import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
import { CreateElement } from "vue";
import Cell from "./cell-mixins";
import PublicProp from "../../minixs/PublicPropMixin";

@Component({})
export default class VCell extends Mixins(Cell, PublicProp) {
  @Prop({
    type: [Number, String],
    default: 1,
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  col: number | string;

  render(h: CreateElement) {
    const { tag, $slots, col, commonClass, click } = this;
    const className = ["cell-" + col, ...commonClass].filter(v => v);

    return h(tag, { class: className, on: { click } }, $slots.default);
  }
}
</script>
