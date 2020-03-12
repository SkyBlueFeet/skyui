/*
 * @Author: skybluefeet
 * @Date: 2020-02-28 14:13:49
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-03 12:46:04
 */
import Vue from "vue";
import MessageModal from "./MessageModal.vue";
import { CombinedVueInstance } from "vue/types/vue";

type Instance = CombinedVueInstance<
  Record<never, any> & Vue,
  object,
  object,
  object,
  object
>;

function open(propsData: object): Instance {
  const ModalComponent = Vue.extend(MessageModal);
  return new ModalComponent({
    el: document.createElement("div"),
    propsData
  });
}

export default {
  open(params: object): Instance {
    const defaultParam = { title: "消息", content: "" };
    const propsData = Object.assign(defaultParam, params);
    return open(propsData);
  },

  confirm(params: object): Instance {
    const defaultParam = {
      title: "提示",
      content: "",
      icon: "question-circle-o",
      type: "warning"
    };
    const propsData = Object.assign(defaultParam, params);
    return open(propsData);
  },

  alert(params: object): Instance {
    const defaultParam = {
      title: "提示",
      type: "danger",
      icon: "exclamation-triangle",
      content: "",
      showCancel: false
    };
    const propsData = Object.assign(defaultParam, params);
    return open(propsData);
  }
};
