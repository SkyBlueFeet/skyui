import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

// @Component({})
// export default class VNavbarBrand extends Vue {
//   @Prop({
//     type: String,
//     default: "div",
//     required: false
//   })
//   tag: string;

//   render(h: CreateElement) {
//     const tag = h(this.tag, { class: ["navbar-brand"] }, this.$slots.default);
//     console.log(tag);
//     const tabletIcon = <div class="navbar-burger"></div>;
//     return (
//       <client-only>
//         <tag>
//           {this.$slots.default}
//           <tabletIcon />
//         </tag>
//       </client-only>
//     );
//   }
// }

export default {
  name: "VNavbarBrand",
  props: {
    tag: {
      type: String,
      default: "div",
      required: false
    }
  },
  render(h: CreateElement) {
    const tag = h(this.tag, { class: ["navbar-brand"] }, this.$slots.default);
    console.log(tag);
    const tabletIcon = <div class="navbar-burger"></div>;
    return (
      <div class="navbar-brand">
        {this.$slots.default}
        <tabletIcon />
      </div>
    );
  }
};
