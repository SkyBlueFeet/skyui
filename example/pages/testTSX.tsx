import Vue, { CreateElement, VNode } from "vue";
import { Component } from "vue-property-decorator";
import RC from "../components/renderComponent.vue";
import TestMixin from "../mixins/test-mixin";
import { Getter } from "vuex-class";
import "../components/test.css";

@Component({
  components: {
    RC
  },
  mixins: [TestMixin]
})
export default class HelloWorld extends Vue<TestMixin> {
  @Getter info;

  msg = "Welcome to Vue-TSX App";

  mounted(): void {}
  render(h: CreateElement): VNode {
    return (
      <div class="hello">
        <h3>vue-property-decorator TSX测试</h3>
      </div>
    );
  }
}
