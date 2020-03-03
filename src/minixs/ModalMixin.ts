import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class ModalMixin extends Vue {
  @Prop({ type: Boolean, default: false })
  isShow: boolean;

  @Prop(String) title: string;

  @Prop({ type: String, default: "OK" })
  okText: string;

  @Prop({ type: String, default: "Cancel" })
  cancelText: string;

  @Prop({ type: Function, default: (): void => undefined })
  onOk: Function;
  @Prop({ type: Function, default: (): void => undefined })
  onCancel: Function;

  @Prop({ type: Boolean, default: true })
  backdrop: boolean;

  @Prop({ type: Boolean, default: true })
  backdropClosable: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  okLoading: boolean;

  @Prop({
    type: Number,
    default: 640
  })
  width: number;

  @Prop({
    type: Boolean,
    default: true
  })
  showOk: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  showCancel: boolean;

  @Prop({
    type: String,
    default: "fade"
  })
  transition: string;

  @Prop({
    type: Boolean,
    default: true
  })
  showHeader: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  showFooter: boolean;

  @Watch("isShow", {})
  onIsShowChange(val: boolean): void {
    this.isActive = val;
    if (!val && this.isLoading) {
      this.isLoading = false;
    }
  }

  mounted(): void {
    this.$nextTick(() => {
      document.body.appendChild(this.$el);
      if (this.isShow) {
        this.active();
      }
    });
  }

  isActive = false;
  isLoading = false;

  get modalWidth(): { width: string } {
    if (this.width !== 640 && this.width !== 0) {
      return { width: `${this.width}px` };
    }
    return null;
  }

  active(): void {
    this.isActive = true;
  }
  handleOk(): void {
    if (this.okLoading) {
      this.isLoading = true;
      this.onOk();
    } else {
      this.onOk();
      this.handleClose();
    }
  }
  handleCancel(): void {
    this.onCancel();
    this.handleClose();
  }
  handleClose(): void {
    this.$emit("close");
  }
  backdropClose(): void {
    if (this.backdropClosable) {
      this.handleCancel();
    }
  }

  beforeDestroy(): void {
    this.$el.remove();
  }
}

// export default ModalMixin;
