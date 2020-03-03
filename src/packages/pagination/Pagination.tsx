import Pager from "./Pager";
import { VNode, CreateElement } from "vue/types/umd";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    VPager: Pager
  }
})
export default class Pagination extends Vue {
  @Prop({
    type: Number,
    default: 10
  })
  pageSize: number;

  @Prop({
    type: Number,
    default: 1
  })
  current: number;

  @Prop(Number) total: number;

  @Prop({
    type: Function,
    default: () => null
  })
  change: Function;

  @Prop({
    type: Function,
    default: () => null
  })
  pageSizeChange: Function;

  @Prop(String) size: string;

  @Prop({
    type: Boolean,
    default: false
  })
  simple: boolean;

  @Prop({
    type: String,
    default: "total, pager, sizer, jumper"
  })
  layout: string;

  @Prop({
    type: Array,
    default() {
      return [10, 20, 30, 40, 50];
    }
  })
  sizeOptions: number[];

  @Prop(String) align: string;

  interCurrent = 1;
  interPageSize: number = this.pageSize;

  totalPage: number;

  // get totalPage() {
  //   return this.calcTotalPage(this.total, this.interPageSize);
  // }
  get sizeClass(): string {
    return this.size === "small" ? "is-small" : "";
  }
  get alignClass(): string {
    return this.align ? `is-${this.align}` : "";
  }

  calcTotalPage(total: number, interPageSize: number): number {
    return Math.floor((total - 1) / interPageSize) + 1;
  }
  handleChangePage(p: number): void {
    if (p !== this.interCurrent) {
      this.interCurrent = p;
      this.change(p);
    }
  }
  handleJumpPrev(): void {
    this.handleChangePage(Math.max(1, this.interCurrent - 5));
  }
  handleJumpNext(): void {
    this.handleChangePage(Math.min(this.totalPage, this.interCurrent + 5));
  }
  hasPrev(): boolean {
    return this.interCurrent > 1;
  }
  hasNext(): boolean {
    return this.interCurrent < this.totalPage;
  }
  handlePrev(): void {
    this.handleChangePage(this.interCurrent - 1);
  }
  handleNext(): void {
    this.handleChangePage(this.interCurrent + 1);
  }
  handleQuickJumper(e): void {
    let page = e.target.value;
    page = Number(page);
    if (!page || isNaN(page)) return;

    if (e.keyCode === 13) {
      this.handleChangePage(page);
    }
  }
  handlePageSizeChange(e: MouseEvent): void {
    const pageSize = e.target["value"];
    this.interPageSize = pageSize;
    this.totalPage = this.calcTotalPage(this.total, this.interPageSize);
    if (this.interCurrent > this.totalPage) {
      this.handleChangePage(this.totalPage);
    }
    this.pageSizeChange(this.interCurrent, pageSize);
  }

  @Watch("current", { immediate: true, deep: true })
  onCurrentChange(val: number): void {
    if (val !== this.interCurrent) {
      this.handleChangePage(val);
    }
  }
  @Watch("pageSize")
  onPageSizeChange(val: number): void {
    if (val !== this.interPageSize) {
      // this.handleChangePage(val);
    }
  }

  mounted(): void {
    this.handleChangePage(this.current);
  }

  render(h: CreateElement): VNode {
    // eslint-disable-line
    const alignClass = this.alignClass;
    const sizeClass = this.sizeClass;
    const pagerList = [];
    let total: VNode;
    let jumper: VNode;
    let sizer: VNode;
    let pager = null;
    let prevPager = null;
    let nextPager = null;
    let firstPager = null;
    let lastPager = null;

    const interCurrent = this.interCurrent;

    if (!this.simple) {
      if (this.totalPage <= 6) {
        for (let i = 1; i <= this.totalPage; i++) {
          const active = interCurrent === i;
          pagerList.push(
            <v-pager
              pageNo={i}
              active={active}
              size={sizeClass}
              onClick={this.handleChangePage.bind(this, i)}
            />
          );
        }
      } else {
        prevPager = (
          <li class="btn-jumper">
            <a
              class={`button is-primary is-inverted ${sizeClass}`}
              onClick={this.handleJumpPrev}
            >
              <i class="fa fa-angle-double-left"></i>
            </a>
          </li>
        );
        nextPager = (
          <li class="btn-jumper">
            <a
              class={`button is-primary is-inverted ${sizeClass}`}
              onClick={this.handleJumpNext}
            >
              <i class="fa fa-angle-double-right"></i>
            </a>
          </li>
        );
        firstPager = <v-pager active={false} size={sizeClass} pageNo={1} />;
        lastPager = (
          <v-pager active={false} size={sizeClass} pageNo={this.totalPage} />
        );

        let left = Math.max(1, interCurrent - 2);
        let right = Math.min(interCurrent + 2, this.totalPage);

        if (interCurrent - 1 <= 2) {
          right = 1 + 4;
        }

        if (this.totalPage - interCurrent <= 2) {
          left = this.totalPage - 4;
        }

        for (let i = left; i <= right; i++) {
          const active = interCurrent === i;
          pagerList.push(
            <v-pager
              pageNo={i}
              size={sizeClass}
              active={active}
              onClick={this.handleChangePage.bind(this, i)}
            />
          );
        }

        if (interCurrent - 1 >= 4) {
          pagerList.unshift(prevPager);
        }
        if (this.totalPage - interCurrent >= 4) {
          pagerList.push(nextPager);
        }

        if (left !== 1) {
          pagerList.unshift(firstPager);
        }
        if (right !== this.totalPage) {
          pagerList.push(lastPager);
        }
      }

      total = <span>共 {this.total} 条</span>;
      jumper = (
        <span>
          跳转到{" "}
          <input
            class={`input ${sizeClass}`}
            type="number"
            min="1"
            number="true"
            on-keyup={this.handleQuickJumper}
          />
        </span>
      );
      sizer = (
        <span class={`select ${sizeClass}`}>
          <select onChange={this.handlePageSizeChange}>
            {this["_l"](this.sizeOptions, option => (
              <option value={option}>{option} 条/页</option>
            ))}
          </select>
        </span>
      );

      const prevClass = this.hasPrev()
        ? `button ${sizeClass}`
        : `button is-disabled ${sizeClass}`;
      const nextClass = this.hasNext()
        ? `button ${sizeClass}`
        : `button is-disabled ${sizeClass}`;
      pager = (
        <ul>
          <li>
            <a class={prevClass} onClick={this.handlePrev}>
              <i class="fa fa-angle-left"></i>
            </a>
          </li>
          {this["_l"](pagerList, page => page)}
          <li>
            <a class={nextClass} onClick={this.handleNext}>
              <i class="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      );
    } else {
      const prevClass = this.hasPrev()
        ? `button ${sizeClass}`
        : `button is-disabled ${sizeClass}`;
      const nextClass = this.hasNext()
        ? `button ${sizeClass}`
        : `button is-disabled ${sizeClass}`;
      pager = (
        <ul>
          <li>
            <a class={prevClass} onClick={this.handlePrev}>
              <i class="fa fa-angle-left"></i>
            </a>
          </li>
          <li>
            <input
              class={`input ${sizeClass}`}
              value={this.interCurrent}
              type="number"
              min="1"
              number="true"
              on-keyup={this.handleQuickJumper}
            />
          </li>
          <li>/ {this.total}</li>
          <li>
            <a class={nextClass} onClick={this.handleNext}>
              <i class="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      );
    }

    const items = {
      total,
      sizer,
      pager,
      jumper
    };
    const components = this.layout.split(",");

    return (
      <nav class={`pagination ${sizeClass} ${alignClass}`}>
        {components.map(item => items[item.trim()])}
      </nav>
    );
  }
}
