/**
 * @author skybluefeet
 * Date: 17/11/9
 */
import Button from "./src/button.vue";
import { VueConstructor } from "vue";

Button["install"] = function(Vue: VueConstructor): void {
  Vue.component(Button.name, Button);
};

export default Button;
