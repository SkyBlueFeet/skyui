/*!
 * skyui.iife.js v1.0.0
 * (c) 2018-2020 skybluefeet <yakun1593@163.com>
 * Released under the MIT License.
 */
var skyui = (function () {
  'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: "v-button",
    props: {
      type: {
        type: String,
        "default": "default"
      },
      size: {
        type: String,
        "default": "default"
      },
      icon: {
        type: String,
        "default": ""
      },
      plain: Boolean,
      disabled: Boolean,
      round: Boolean
    },
    data: function data() {
      return {
        msg: "button"
      };
    }
  };

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
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      staticClass: "v-btn",
      "class": ['v-btn__' + _vm.type, {
        'is-plain': _vm.plain,
        'is-disabled': _vm.disabled,
        'is-round': _vm.round
      }, 'v-btn__size-' + _vm.size],
      attrs: {
        "disabled": _vm.disabled
      },
      on: {
        "click": function click($event) {
          return _vm.$emit('click');
        }
      }
    }, [_vm.icon !== '' ? _c('i', {
      "class": _vm.icon
    }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
  };

  var __vue_staticRenderFns__ = [];
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = normalizeComponent_1({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  /**
   * @author monkeywang
   * Date: 17/11/9
   */

  __vue_component__["install"] = function (Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
  };

  var components = [__vue_component__];

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
    VButton: __vue_component__
  };

  return index;

}());
