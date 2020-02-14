/*!
 * skyui.umd.js v1.0.0
 * (c) 2018-2020 skybluefeet <yakun1593@163.com>
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue-property-decorator')) :
    typeof define === 'function' && define.amd ? define(['vue-property-decorator'], factory) :
    (global = global || self, global.skyui = factory(global['vue-property-decorator']));
}(this, (function (vuePropertyDecorator) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var formatNumber = function formatNumber(n) {
      return ("0" + n.toString()).slice(-2);
    };
    var formatDate = function formatDate(date, format) {
      if (format === void 0) {
        format = "yyyy-MM-dd hh:mm:ss";
      }

      if (!date) return;
      var Y = date.getFullYear();
      var M = date.getMonth() + 1;
      var D = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      var rules = {
        yyyy: Y,
        M: M,
        MM: formatNumber(M),
        d: D,
        dd: formatNumber(D),
        h: h,
        hh: formatNumber(h),
        m: m,
        mm: formatNumber(m),
        s: s,
        ss: formatNumber(s)
      };
      var arr = format.split(/-| |:|\//);
      var formatDate = format;

      for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        formatDate = formatDate.replace(el, rules[el]);
      }

      return formatDate;
    };

    var List =
    /** @class */
    function (_super) {
      __extends(List, _super);

      function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.name = "v-list";
        _this.date = formatDate(new Date());
        return _this;
      }

      List.prototype.render = function (h) {
        return h("div", {
          "class": "v-list"
        }, [this.$slots.default, h("div", {
          "class": "v-list-date"
        }, [h("div", {
          "class": "v-list-date-label"
        }, ["\u5F53\u524D\u65F6\u95F4\uFF1A"]), h("div", {
          "class": "v-list-date-text"
        }, [this.date])])]);
      };

      List = __decorate([vuePropertyDecorator.Component({})], List);
      return List;
    }(vuePropertyDecorator.Vue);

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    /* script */
    var __vue_script__ = List;
    /* template */

    /* style */

    var __vue_inject_styles__ = undefined;
    /* scoped */

    var __vue_scope_id__ = undefined;
    /* module identifier */

    var __vue_module_identifier__ = undefined;
    /* functional template */

    var __vue_is_functional_template__ = undefined;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__ = normalizeComponent_1({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

    __vue_component__["install"] = function (Vue) {
      Vue.component(__vue_component__.name, __vue_component__);
    };

    var VListItem =
    /** @class */
    function (_super) {
      __extends(VListItem, _super);

      function VListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.name = "v-list-item";
        return _this;
      }

      VListItem.prototype.render = function (h) {
        return h("div", [this.list.map(function (item) {
          return h("a", {
            "class": "v-list-item",
            "attrs": {
              "href": item.url
            }
          }, [item.title]);
        })]);
      };

      __decorate([vuePropertyDecorator.Prop({
        // []
        default: [],
        required: true,
        type: Array
      })], VListItem.prototype, "list", void 0);

      VListItem = __decorate([vuePropertyDecorator.Component({})], VListItem);
      return VListItem;
    }(vuePropertyDecorator.Vue);

    /* script */
    var __vue_script__$1 = VListItem;
    /* template */

    /* style */

    var __vue_inject_styles__$1 = undefined;
    /* scoped */

    var __vue_scope_id__$1 = undefined;
    /* module identifier */

    var __vue_module_identifier__$1 = undefined;
    /* functional template */

    var __vue_is_functional_template__$1 = undefined;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$1 = normalizeComponent_1({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

    __vue_component__$1["install"] = function (Vue) {
      Vue.component(__vue_component__$1.name, __vue_component__$1);
    };

    var components = [__vue_component__, __vue_component__$1];

    var install = function install(Vue) {
      components.map(function (component) {
        return Vue.component(component.name, component);
      });
    };

    if (typeof window !== "undefined" && window.Vue) {
      install(window.Vue);
    }

    var index = {
      install: install,
      VList: __vue_component__,
      VListItem: __vue_component__$1
    };

    return index;

})));
