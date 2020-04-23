/*
 * @Author: skybluefeet
 * @Date: 2020-02-28 14:13:49
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-07 01:26:09
 */
/* !
 * vue-blu v0.1.9
 * (c) 2017 Chenz <chenz8606@gmail.com>
 * Released under the MIT License.
 * Documentation: https://chenz24.github.io/vue-blu/#/
 */
import "./scss/main.scss";

import Affix from "./packages/affix";
import {
  VNavbar,
  VNavbarBrand,
  VNavbarItem,
  VNavbarDivider,
  VNavbarDropdown,
  VNavbarMenu,
  VNavbarLink
} from "./packages/navbar";
import VLazy from "./packages/lazy";
import VImage from "./packages/image";
import VDivider from "./packages/divider";
import VLink from "./packages/link";
import { VButton, VButtonGroup } from "./packages/button";
import { VCell, VCellAuto, VGrid } from "./packages/grid";
import { VSwiper, VSlide } from "./packages/carousel";
import VIcon from "./packages/icon";
import Tooltip from "./packages/tooltip";
import Popover from "./packages/popover";
import Dropdown from "./packages/dropdown";
import { Timeline, TimelineItem } from "./packages/timeline";
import Tag from "./packages/tag";
import Modal from "./packages/modal";
import ProgressBar from "./packages/progressbar";
import Alert from "./packages/alert";
import { Breadcrumb, BreadcrumbItem } from "./packages/breadcrumb";
import { Collapse, CollapseItem } from "./packages/collapse";
import { Tabs, TabItem } from "./packages/tab";
import { Menus, MenuItem } from "./packages/menu";
import VAside from "./packages/aside";
import PopConfirm from "./packages/pop-confirm";
import ScrollTo from "./packages/scroll-to";
import { DataTable, Column, TableToolbar } from "./packages/data-table";
import { Checkbox, CheckboxGroup } from "./packages/checkbox";
import { Radio, RadioGroup, RadioButton } from "./packages/radio";
import VSwitch from "./packages/switch";
import Pagination from "./packages/pagination";
import { Steps, Step } from "./packages/steps";
import InputNumber from "./packages/input-number";
import VLazyDirective from "./directives/img-lazy";
import VCollapseTransition from "./transitions/collapse";
// import Datepicker from "./components/datepicker";

import Notify from "./packages/notify";
import MessageModal from "./packages/message-modal";
import { VueConstructor } from "vue";

const components = {
  Affix,
  Tooltip,
  Popover,
  Dropdown,
  Timeline,
  TimelineItem,
  Tag,
  Modal,
  ProgressBar,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Collapse,
  CollapseItem,
  Tabs,
  TabItem,
  Menus,
  MenuItem,
  VAside,
  PopConfirm,
  ScrollTo,
  DataTable,
  Column,
  TableToolbar,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  VSwitch,
  Pagination,
  Steps,
  Step,
  InputNumber,
  VButton,
  VButtonGroup,
  VIcon,
  VDivider,
  VLink,
  VSwiper,
  VSlide,
  VImage,
  VLazy,
  VCell,
  VGrid,
  VCellAuto,
  VNavbar,
  VCollapseTransition,
  VNavbarBrand,
  VNavbarItem,
  VNavbarDivider,
  VNavbarDropdown,
  VNavbarMenu,
  VNavbarLink
  // Datepicker
};

const install = function(Vue: VueConstructor): void {
  // eslint-disable-line
  if (install["installed"]) return;

  Object.keys(components).forEach(key => Vue.component(key, components[key]));

  Vue.prototype.$notify = Notify;
  Vue.prototype.$modal = MessageModal;
  Vue.directive("lazy", VLazyDirective);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.1.1",
  install,
  ...components
};
