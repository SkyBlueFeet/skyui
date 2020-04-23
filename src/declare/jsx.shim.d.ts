/*
 * @Date: 2020-04-04 19:45:47
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-05 19:10:58
 * @repository: https://github.com/SkyBlueFeet
 */
import Vue, { VNode } from "vue";
declare global {
  namespace JSX {
    type Element = VNode;
    type ElementClass = Vue;
    type ElementAttribute = any;
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

// declare global {
//   namespace JSX {
//     // tslint:disable no-empty-interface
//     interface Element extends VNode {}
//     // tslint:disable no-empty-interface
//     interface ElementClass extends Vue {}
//     interface IntrinsicElements {
//       [elem: string]: any
//     }
//   }
// }
