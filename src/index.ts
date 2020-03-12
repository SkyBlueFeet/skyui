/*
 * @Author: skybluefeet
 * @Date: 2020-02-28 14:13:49
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-04 15:17:30
 */
/* !
 * vue-blu v0.1.9
 * (c) 2017 Chenz <chenz8606@gmail.com>
 * Released under the MIT License.
 * Documentation: https://chenz24.github.io/vue-blu/#/
 */
import "./scss/main.scss";

import Affix from "./packages/affix";
import VDivider from "./packages/divider";
import VLink from "./packages/link";
import { VButton, VButtonGroup } from "./packages/button";
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
  VSlide
  // Datepicker
};

const install = function(Vue: VueConstructor): void {
  // eslint-disable-line
  if (install["installed"]) return;

  Object.keys(components).forEach(key => Vue.component(key, components[key]));

  Vue.prototype.$notify = Notify;
  Vue.prototype.$modal = MessageModal;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.1.1",
  install
};
