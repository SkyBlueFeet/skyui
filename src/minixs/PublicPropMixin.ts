/*
 * @Date: 2020-03-18 13:22:15
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-18 14:13:42
 * @repository: https://github.com/SkyBlueFeet
 */
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class PublicPropMixin extends Vue {
  @Prop(String) title: string;
  @Prop({
    type: String,
    default: "",
    validator(val) {
      return !isNaN(Number(val));
    }
  })
  tabindex: string;
  @Prop({
    type: String,
    required: false,
    validator(val) {
      return ["", "yes", "no"].indexOf(val) !== -1;
    }
  })
  translate: string;
}
