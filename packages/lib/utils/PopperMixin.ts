import Popper from "popper.js";
// import Poppers, { createPopper, Instance } from "@popperjs/core";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({})
export default class PopperMixin extends Vue {
  @Prop({ type: Boolean, default: false })
  always: boolean;

  @Prop({ type: String, default: "hover" })
  trigger: string;

  @Prop({ type: Boolean, default: true })
  appendToBody: boolean;

  @Prop({ type: String, default: "" })
  content: string;

  @Prop({ type: String, default: "top" })
  placement: string;

  @Prop({ type: Boolean, default: false })
  disabled: boolean;

  reference: Element = null;
  popper: Popper;
  isShow = false;

  timer: any;
  popperTimer: any;

  @Watch("disabled", { immediate: true, deep: true })
  onDisabledChange(disabled: boolean): void {
    disabled ? this.destroy() : this.runPopper();
  }

  mounted(): void {
    // todo disabled,
    this.runPopper();
  }

  beforeDestroy(): void {
    this.removeEvent();
    (this.$refs.popper as Element).remove();
    this.destroy();
  }

  toggle(): void {
    this.isShow = !this.isShow;
    if (!this.isShow) {
      this.timer = setTimeout(() => {
        this.popper.destroy();
        this.popper = null;
      }, 300);
    }
  }
  // add delay
  hidePopper(): void {
    this.isShow = false;
    this.timer = setTimeout(() => {
      this.popper.destroy(); // destroy popper when hide
      this.popper = null;
    }, 300);
  }
  showPopper(): void {
    this.isShow = true;
    if (this.timer) clearTimeout(this.timer);
    if (this.popperTimer) clearTimeout(this.popperTimer);
  }

  createInstance(): void {
    this.showPopper();
    if (this.popper) {
      this.popper.update();
      return;
    }
    const placementMapper = {
      top: "top",
      left: "left",
      right: "right",
      bottom: "bottom",
      topLeft: "top-end",
      topRight: "top-start",
      leftTop: "left-end",
      leftBottom: "left-start",
      bottomLeft: "bottom-end",
      bottomRight: "bottom-start",
      rightTop: "right-end",
      rightBottom: "right-start"
    };
    const placement = placementMapper[this.placement]
      ? placementMapper[this.placement]
      : "bottom";
    const $el = this.$el ? this.$el.children[0] : null;
    const reference = (this.reference = this.reference || $el);
    const popperEl = this.$refs.popper as HTMLElement;
    const options = {
      placement
    };
    if (this.appendToBody) document.body.appendChild(popperEl);
    // this.popper = createPopper(reference, popperEl, options);
    this.popper = new Popper(reference, popperEl, options);
  }

  handleClick(e: MouseEvent): void {
    e.stopPropagation();
    if (this.$el.contains(e.target as Node)) {
      if (this.isShow) {
        this.hidePopper();
      } else {
        this.createInstance();
      }
    } else if (this.$refs.popper["contains"](e.target)) {
      this.showPopper();
    } else {
      if (this.isShow) this.hidePopper();
    }
  }

  bindEvent(): void {
    const $el = this.$el ? this.$el.children[0] : null;
    const reference = (this.reference = this.reference || $el);
    const popper = this.$refs.popper;
    if (!reference || !popper) return;

    if (this.trigger === "hover") {
      reference.addEventListener("mouseenter", this.createInstance);
      reference.addEventListener("mouseleave", this.hidePopper);
      popper["addEventListener"]("mouseenter", this.showPopper);
      popper["addEventListener"]("mouseleave", this.hidePopper);
    } else {
      reference.addEventListener("click", this.handleClick);
      popper["addEventListener"]("click", this.showPopper);
      document.documentElement.addEventListener("click", this.handleClick);
    }
  }

  runPopper(): void {
    if (this.disabled) return;
    if (this.always) {
      this.createInstance();
    } else {
      this.bindEvent();
    }
  }

  destroy(): void {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }

  removeEvent(): void {
    if (!this.reference) return;
    const popper = this.$refs.popper;
    if (this.trigger === "focus") {
      this.reference.removeEventListener("focus", this.createInstance);
      this.reference.removeEventListener("blur", this.toggle);
    } else if (this.trigger === "click") {
      this.reference.removeEventListener("click", this.handleClick);
      popper["removeEventListener"]("click", this.showPopper);
      document.documentElement.removeEventListener("click", this.handleClick);
    } else {
      this.reference.removeEventListener("mouseenter", this.createInstance);
      this.reference.removeEventListener("mouseleave", this.toggle);
    }
  }
}
