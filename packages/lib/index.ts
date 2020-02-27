import VButton from "./button";
import { VueConstructor } from "vue/types/umd";

const components = [VButton];

const install = function(Vue: VueConstructor<Vue>): void {
  components.map(component => Vue.component(component.name, component));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  VButton
};
