import { Vue } from "vue-property-decorator";
import { VNode, CreateElement } from "vue/types/umd";
export default class Pager extends Vue {
    size: string;
    pageNo: number;
    active: boolean;
    render(h: CreateElement): VNode;
}
