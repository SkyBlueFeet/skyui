import Affix from "./affix.vue";
import Tooltip from "./tooltip.vue";
import { VueConstructor } from "vue";

const components = {
  Affix,
  Tooltip
};

export default {
  install(Vue: VueConstructor): void {
    Object.keys(components).forEach(key => Vue.component(key, components[key]));
  }
};
