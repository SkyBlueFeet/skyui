/*!
 * skyui.esm.js v1.0.0
 * (c) 2018-2020 skybluefeet <yakun1593@163.com>
 * Released under the MIT License.
 */
import { Prop, Watch, Component, Vue } from 'vue-property-decorator';
import Vue$1 from 'vue';

//
//
//
//
//
//
//
var script = {
  props: {
    offset: {
      type: Number,
      "default": 0
    },
    onAffix: {
      type: Function,
      "default": function _default() {}
    },
    boundary: {
      type: String,
      "default": ""
    }
  },
  data: function data() {
    return {
      affixed: false,
      styles: {},
      affixedClientHeight: 0,
      wrapStyle: {}
    };
  },
  methods: {
    getScroll: function getScroll(w, top) {
      var ret = w["page".concat(top ? "Y" : "X", "Offset")];
      var method = "scroll".concat(top ? "Top" : "Left");

      if (typeof ret !== "number") {
        var d = w.document; // ie6,7,8 standard mode

        ret = d.documentElement[method];

        if (typeof ret !== "number") {
          // quirks mode
          ret = d.body[method];
        }
      }

      return ret;
    },
    getOffset: function getOffset(element) {
      var rect = element.getBoundingClientRect();
      var body = document.body;
      var clientTop = element.clientTop || body.clientTop || 0;
      var clientLeft = element.clientLeft || body.clientLeft || 0; //      const clientHeight = element.clientHeight || 0;

      var scrollTop = this.getScroll(window, true);
      var scrollLeft = this.getScroll(window);
      return {
        top: rect.bottom + scrollTop - clientTop - this.affixedClientHeight,
        left: rect.left + scrollLeft - clientLeft
      };
    },
    handleScroll: function handleScroll() {
      var scrollTop = this.getScroll(window, true) + this.offsets; // handle setting offset

      var elementOffset = this.getOffset(this.$el);

      if (!this.affixed && scrollTop > elementOffset.top) {
        this.affixed = true;
        this.styles = {
          top: "".concat(this.offsets, "px"),
          left: "".concat(elementOffset.left, "px"),
          width: "".concat(this.$el.offsetWidth, "px")
        };
        this.onAffix(this.affixed);
      } // if setting boundary


      if (this.boundary && scrollTop > elementOffset.top) {
        var el = document.getElementById(this.boundary.slice(1));

        if (el) {
          var boundaryOffset = this.getOffset(el);

          if (scrollTop + this.offsets > boundaryOffset.top) {
            var top = scrollTop - boundaryOffset.top;
            this.styles.top = "-".concat(top, "px");
          }
        }
      }

      if (this.affixed && scrollTop < elementOffset.top) {
        this.affixed = false;
        this.styles = {};
        this.onAffix(this.affixed);
      }

      if (this.affixed && this.boundary) {
        var _el = document.getElementById(this.boundary.slice(1));

        if (_el) {
          var _boundaryOffset = this.getOffset(_el);

          if (scrollTop + this.offsets <= _boundaryOffset.top) {
            this.styles.top = 0;
          }
        }
      }
    }
  },
  computed: {
    offsets: function offsets() {
      if (this.boundary) return 0;
      return this.offset;
    }
  },
  mounted: function mounted() {
    this.affixedClientHeight = this.$el.children[0].clientHeight;
    this.wrapStyle = {
      height: "".concat(this.affixedClientHeight, "px")
    };
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
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

  return _c('div', {
    staticClass: "affix-placeholder",
    style: _vm.wrapStyle
  }, [_c('div', {
    "class": {
      affix: _vm.affixed
    },
    style: _vm.styles
  }, [_vm._t("default")], 2)]);
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

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }

  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;
/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */


function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}
/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */


function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */


function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;

    case '#document':
      return element.body;
  } // Firefox want us to check `-x` and `-y` variations as well


  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}
/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */


function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */

function isIE(version) {
  if (version === 11) {
    return isIE11;
  }

  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */


function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

  var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  } // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...


  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }

  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}
/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */


function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */


function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  } // Here we make sure to give as "start" the element that comes first in the DOM


  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1; // Get common ancestor container

  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  } // one of the nodes is inside shadowDOM, find which one


  var element1root = getRoot(element1);

  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */


function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */


function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */


function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */


function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */


function getBoundingClientRect(element) {
  var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11

  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }; // subtract scrollbar size from sizes

  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons

  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.

  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */


function isFixed(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  var parentNode = getParentNode(element);

  if (!parentNode) {
    return false;
  }

  return isFixed(parentNode);
}
/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */


function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }

  var el = element.parentElement;

  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }

  return el || document.documentElement;
}
/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */


function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference)); // Handle viewport case

  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;

    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));

      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  } // Add paddings


  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return width * height;
}
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? '-' + variation : '');
}
/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */


function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */


function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */


function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */


function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0]; // Get popper node sizes

  var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  }; // depending by the popper placement we have to compute its offsets slightly differently

  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  } // use `filter` to obtain the same behavior of `find`


  return arr.filter(check)[0];
}
/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  } // use `find` + `indexOf` if `findIndex` isn't supported


  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */


function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }

    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */


function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  }; // compute reference element offsets

  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed; // compute the popper offsets

  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

  data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback

  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */


function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */


function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;

    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }

  return null;
}
/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */


function destroy() {
  this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners(); // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it

  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }

  return this;
}
/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */


function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }

  scrollParents.push(target);
}
/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  }); // Scroll event listener on scroll parents

  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */


function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  }); // Reset state

  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */


function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */


function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = ''; // add unit if the value is numeric and is one of the following

    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }

    element.style[prop] = styles[prop] + unit;
  });
}
/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];

    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */


function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element

  setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}
/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */


function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations

  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}
/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */


function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;

  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }

  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed

  var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.

  var left = void 0,
      top = void 0;

  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }

  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }

  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  } // Attributes


  var attributes = {
    'x-placement': data.placement
  }; // Update `data` attributes, styles and arrowStyles

  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */


function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';

    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }

  return isRequired;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function arrow(data, options) {
  var _data$offsets$arrow; // arrow depends on keepTogether in order to work


  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len]; //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //
  // top/left side

  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  } // bottom/right side


  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available

  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}
/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */


function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */


var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

var validPlacements = placements.slice(3);
/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */

function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;

    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;

    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;

    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1; // flips variation if reference element overflows boundaries

    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom); // flips variation if popper content overflows boundaries

    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future

      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }

  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}
/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */


function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2]; // If it's not a number it's an operator, I guess

  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;

    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;

      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;

    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}
/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */


function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one

  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  }); // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space

  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  } // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.


  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []) // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  }); // Loop trough the offsets arrays and execute the operations

  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */


function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var basePlacement = placement.split('-')[0];
  var offsets = void 0;

  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken

  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  } // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself


  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification

  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed

  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];

      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];

      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }

      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */


var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: offset,

    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: preventOverflow,

    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],

    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: arrow,

    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: flip,

    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',

    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',

    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,

    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,

    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,

    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: computeStyle,

    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,

    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',

    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: applyStyle,

    /** @prop {Function} */
    onLoad: applyStyleOnLoad,

    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};
/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */

var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};
/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */
// Utils
// Methods

var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }; // make update() debounced, so that it only runs at most once-per-tick


    this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

    this.options = _extends({}, Popper.Defaults, options); // init state

    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    }; // get reference and popper elements (allow jQuery wrappers)

    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    }); // Refactoring modifiers' list (Object => Array)

    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    }) // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    }); // fire the first update to position the popper in the right place

    this.update();
    var eventsEnabled = this.options.eventsEnabled;

    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  } // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();
/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

var PopperMixin =
/** @class */
function (_super) {
  __extends(PopperMixin, _super);

  function PopperMixin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.reference = null;
    _this.isShow = false;
    return _this;
  }

  PopperMixin.prototype.onDisabledChange = function (disabled) {
    disabled ? this.destroy() : this.runPopper();
  };

  PopperMixin.prototype.mounted = function () {
    // todo disabled,
    this.runPopper();
  };

  PopperMixin.prototype.beforeDestroy = function () {
    this.removeEvent();
    this.$refs.popper.remove();
    this.destroy();
  };

  PopperMixin.prototype.toggle = function () {
    var _this = this;

    this.isShow = !this.isShow;

    if (!this.isShow) {
      this.timer = setTimeout(function () {
        _this.popper.destroy();

        _this.popper = null;
      }, 300);
    }
  }; // add delay


  PopperMixin.prototype.hidePopper = function () {
    var _this = this;

    this.isShow = false;
    this.timer = setTimeout(function () {
      _this.popper.destroy(); // destroy popper when hide


      _this.popper = null;
    }, 300);
  };

  PopperMixin.prototype.showPopper = function () {
    this.isShow = true;
    if (this.timer) clearTimeout(this.timer);
    if (this.popperTimer) clearTimeout(this.popperTimer);
  };

  PopperMixin.prototype.createInstance = function () {
    this.showPopper();

    if (this.popper) {
      this.popper.update();
      return;
    }

    var placementMapper = {
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
    var placement = placementMapper[this.placement] ? placementMapper[this.placement] : "bottom";
    var $el = this.$el ? this.$el.children[0] : null;
    var reference = this.reference = this.reference || $el;
    var popperEl = this.$refs.popper;
    var options = {
      placement: placement
    };
    if (this.appendToBody) document.body.appendChild(popperEl); // this.popper = createPopper(reference, popperEl, options);

    this.popper = new Popper(reference, popperEl, options);
  };

  PopperMixin.prototype.handleClick = function (e) {
    e.stopPropagation();

    if (this.$el.contains(e.target)) {
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
  };

  PopperMixin.prototype.bindEvent = function () {
    var $el = this.$el ? this.$el.children[0] : null;
    var reference = this.reference = this.reference || $el;
    var popper = this.$refs.popper;
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
  };

  PopperMixin.prototype.runPopper = function () {
    if (this.disabled) return;

    if (this.always) {
      this.createInstance();
    } else {
      this.bindEvent();
    }
  };

  PopperMixin.prototype.destroy = function () {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  };

  PopperMixin.prototype.removeEvent = function () {
    if (!this.reference) return;
    var popper = this.$refs.popper;

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
  };

  __decorate([Prop({
    type: Boolean,
    "default": false
  })], PopperMixin.prototype, "always", void 0);

  __decorate([Prop({
    type: String,
    "default": "hover"
  })], PopperMixin.prototype, "trigger", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": true
  })], PopperMixin.prototype, "appendToBody", void 0);

  __decorate([Prop({
    type: String,
    "default": ""
  })], PopperMixin.prototype, "content", void 0);

  __decorate([Prop({
    type: String,
    "default": "top"
  })], PopperMixin.prototype, "placement", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": false
  })], PopperMixin.prototype, "disabled", void 0);

  __decorate([Watch("disabled", {
    immediate: true,
    deep: true
  })], PopperMixin.prototype, "onDisabledChange", null);

  PopperMixin = __decorate([Component({})], PopperMixin);
  return PopperMixin;
}(Vue);

//
var script$1 = {
  mixins: [PopperMixin],
  methods: {
    handleClick: function handleClick() {
      if (this.isShow) {
        //        this.isShow = false;
        this.hidePopper();
      } else {
        this.createInstance();
      }
    },
    bindEvent: function bindEvent() {
      var reference = this.reference = this.reference || this.$el.children[0];
      if (!reference) return;

      if (this.trigger === "focus") {
        reference.addEventListener("focus", this.createInstance);
        reference.addEventListener("blur", this.toggle);
      } else if (this.trigger === "click") {
        reference.addEventListener("click", this.handleClick);
      } else {
        reference.addEventListener("mouseenter", this.createInstance);
        reference.addEventListener("mouseleave", this.hidePopper);
      }
    },
    removeEvent: function removeEvent() {
      if (!this.reference) return;

      if (this.trigger === "focus") {
        this.reference.removeEventListener("focus", this.createInstance);
        this.reference.removeEventListener("blur", this.toggle);
      } else if (this.trigger === "click") {
        this.reference.removeEventListener("click", this.handleClick);
      } else {
        this.reference.removeEventListener("mouseenter", this.createInstance);
        this.reference.removeEventListener("mouseleave", this.hidePopper);
      }
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._t("default"), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    ref: "popper",
    staticClass: "tooltip"
  }, [_c('span', {
    domProps: {
      "textContent": _vm._s(_vm.content)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "tooltip-arrow",
    attrs: {
      "x-arrow": ""
    }
  })])])], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
var script$2 = {
  mixins: [PopperMixin],
  props: {
    title: {
      type: String,
      "default": ""
    },
    trigger: {
      type: String,
      "default": "click"
    },
    width: {
      type: Number
    }
  },
  data: function data() {
    return {
      reference: null,
      popper: null,
      isShow: false
    };
  },
  computed: {
    popperStyle: function popperStyle() {
      if (this.width && this.width !== 276) {
        return {
          width: "".concat(this.width, "px"),
          maxWidth: "none"
        };
      }

      return null;
    }
  },
  methods: {
    // add delay
    hidePopper: function hidePopper() {
      var _this = this;

      if (this.trigger !== "hover") this.isShow = false;
      this.timer = setTimeout(function () {
        _this.isShow = false;
        _this.popperTimer = setTimeout(function () {
          _this.popper.destroy(); // destroy popper when hide


          _this.popper = null;
        }, 300);
      }, 300);
    }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._t("default"), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    ref: "popper",
    staticClass: "popover",
    style: _vm.popperStyle
  }, [_vm.title ? _c('div', {
    staticClass: "popover-title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "popover-content"
  }, [_vm._t("content", [_c('div', {
    domProps: {
      "textContent": _vm._s(_vm.content)
    }
  })])], 2), _vm._v(" "), _c('div', {
    staticClass: "popover-arrow",
    attrs: {
      "x-arrow": ""
    }
  })])])], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent_1({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
var script$3 = {
  mixins: [PopperMixin],
  props: {
    title: {
      type: String,
      "default": ""
    },
    trigger: {
      type: String,
      "default": "click"
    },
    width: {
      type: Number
    },
    placement: {
      type: String,
      "default": "bottom"
    }
  },
  methods: {
    // add delay
    hidePopper: function hidePopper() {
      var _this = this;

      if (this.trigger !== "hover") this.isShow = false;
      this.timer = setTimeout(function () {
        _this.isShow = false;
        _this.popperTimer = setTimeout(function () {
          _this.popper.destroy(); // destroy popper when hide


          _this.popper = null;
        }, 300);
      }, 300);
    }
  },
  computed: {
    popperStyle: function popperStyle() {
      if (this.width && this.width !== 276) {
        return {
          width: "".concat(this.width, "px"),
          maxWidth: "none"
        };
      }

      return null;
    }
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "dropdown"
  }, [_vm._t("default"), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    ref: "popper",
    staticClass: "popover popper-dropdown",
    style: _vm.popperStyle
  }, [_c('div', {
    staticClass: "popover-content dropdown-content"
  }, [_vm._t("content", [_c('div', {
    domProps: {
      "textContent": _vm._s(_vm.content)
    }
  })])], 2)])])], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = normalizeComponent_1({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

/* script */

/* template */
var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "timeline"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = normalizeComponent_1({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, {}, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

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
var script$4 = {
  props: {
    icon: String,
    date: String,
    type: String,
    color: String
  },
  computed: {
    iconClass: function iconClass() {
      return this.icon ? "fa-".concat(this.icon) : null;
    },
    typeClass: function typeClass() {
      return this.type ? "is-".concat(this.type) : null;
    } //    hasColor() {
    //      return this.color ? 'has-color' : null;
    //    },

  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "timeline-item",
    "class": _vm.typeClass
  }, [_vm.icon ? _c('div', {
    staticClass: "timeline-icon"
  }, [_c('i', {
    staticClass: "fa",
    "class": _vm.iconClass
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "timeline-item-main"
  }, [_c('div', {
    staticClass: "timeline-item-date"
  }, [_vm._v(_vm._s(_vm.date))]), _vm._v(" "), _c('div', {
    staticClass: "timeline-item-content"
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = normalizeComponent_1({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$4, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

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
//
//
//
var script$5 = {
  props: {
    type: {
      type: String,
      "default": ""
    },
    size: {
      type: String
    },
    color: {
      type: String
    },
    closable: {
      type: Boolean,
      "default": false
    },
    onClose: {
      type: Function,
      "default": function _default() {}
    },
    rounded: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      isShow: true
    };
  },
  computed: {
    typeClass: function typeClass() {
      return this.type ? "is-".concat(this.type) : null;
    },
    sizeClass: function sizeClass() {
      return this.size ? "is-".concat(this.size) : null;
    },
    btnClass: function btnClass() {
      return this.size === "large" ? null : "is-small";
    },
    colorStyle: function colorStyle() {
      return this.color ? {
        backgroundColor: this.color
      } : null;
    },
    roundedClass: function roundedClass() {
      return this.rounded ? null : "is-square";
    }
  },
  methods: {
    handleClose: function handleClose() {
      var _this = this;

      //      this.$emit('close', e);// the way official suggested
      this.isShow = false;
      this.onClose(); // the author of vue suggest delete component by 'data-driven' way

      setTimeout(function () {
        _this.$destroy();

        _this.$el.remove();
      }, 100);
    }
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    staticClass: "tag",
    "class": [_vm.typeClass, _vm.sizeClass, _vm.roundedClass],
    style: _vm.colorStyle
  }, [_vm._t("default"), _vm._v(" "), _vm.closable ? _c('button', {
    staticClass: "delete",
    "class": _vm.btnClass,
    on: {
      "click": _vm.handleClose
    }
  }) : _vm._e()], 2)]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = normalizeComponent_1({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$5, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

var ModalMixin = {
  props: {
    isShow: {
      type: Boolean,
      "default": false
    },
    title: {
      type: String
    },
    okText: {
      type: String,
      "default": 'OK'
    },
    cancelText: {
      type: String,
      "default": 'Cancel'
    },
    onOk: {
      type: Function,
      "default": function _default() {}
    },
    onCancel: {
      type: Function,
      "default": function _default() {}
    },
    backdrop: {
      type: Boolean,
      "default": true
    },
    backdropClosable: {
      type: Boolean,
      "default": true
    },
    okLoading: {
      type: Boolean,
      "default": false
    },
    width: {
      type: Number,
      "default": 640
    },
    showOk: {
      type: Boolean,
      "default": true
    },
    showCancel: {
      type: Boolean,
      "default": true
    },
    transition: {
      type: String,
      "default": 'fade'
    },
    showHeader: {
      type: Boolean,
      "default": true
    },
    showFooter: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      isActive: false,
      isLoading: false
    };
  },
  computed: {
    modalWidth: function modalWidth() {
      if (this.width !== 640 && this.width !== 0) {
        return {
          width: "".concat(this.width, "px")
        };
      }

      return null;
    }
  },
  methods: {
    active: function active() {
      this.isActive = true;
    },
    handleOk: function handleOk() {
      if (this.okLoading) {
        this.isLoading = true;
        this.onOk();
      } else {
        this.onOk();
        this.handleClose();
      }
    },
    handleCancel: function handleCancel() {
      this.onCancel();
      this.handleClose();
    },
    handleClose: function handleClose() {
      this.$emit('close');
    },
    backdropClose: function backdropClose() {
      if (this.backdropClosable) {
        this.handleCancel();
      }
    }
  },
  watch: {
    isShow: function isShow(val) {
      this.isActive = val;

      if (!val && this.isLoading) {
        this.isLoading = false;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      document.body.appendChild(_this.$el);

      if (_this.isShow) {
        _this.active();
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.remove();
  }
};

//
var script$6 = {
  mixins: [ModalMixin]
};

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isActive,
      expression: "isActive"
    }],
    staticClass: "modal align-baseline",
    "class": {
      'is-active': _vm.isActive
    }
  }, [_vm.backdrop ? _c('div', {
    staticClass: "modal-background",
    on: {
      "click": _vm.backdropClose
    }
  }) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transition
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isActive,
      expression: "isActive"
    }],
    staticClass: "modal-card",
    style: _vm.modalWidth
  }, [_vm.showHeader ? _c('header', {
    staticClass: "modal-card-head"
  }, [_vm._t("header", [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('span', {
    staticClass: "close",
    on: {
      "click": _vm.handleCancel
    }
  }, [_vm._v("×")])])], 2) : _vm._e(), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.showFooter ? _c('footer', {
    staticClass: "modal-card-foot"
  }, [_vm._t("footer", [_vm.showCancel ? _c('a', {
    staticClass: "button",
    on: {
      "click": _vm.handleCancel
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]) : _vm._e(), _vm._v(" "), _vm.showOk ? _c('a', {
    staticClass: "button is-primary",
    "class": {
      'is-loading': _vm.isLoading
    },
    on: {
      "click": _vm.handleOk
    }
  }, [_vm._v(_vm._s(_vm.okText))]) : _vm._e()])], 2) : _vm._e()])])], 1)]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = normalizeComponent_1({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$6, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

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
var script$7 = {
  props: {
    type: {
      type: String,
      "default": ""
    },
    size: {
      type: String
    },
    percent: {
      type: Number,
      required: true,
      "default": 0
    },
    striped: Boolean,
    animated: Boolean,
    showinfo: Boolean,
    infoInside: {
      type: Boolean,
      "default": true
    },
    format: {
      type: Function,
      "default": function _default(percent) {
        return "".concat(percent, "%");
      }
    }
  },
  data: function data() {
    return {
      info: ""
    };
  },
  computed: {
    typeClass: function typeClass() {
      return this.type ? "is-".concat(this.type) : null;
    },
    sizeClass: function sizeClass() {
      return this.size ? "is-".concat(this.size) : null;
    },
    stripedClass: function stripedClass() {
      return this.striped ? "progress-striped" : null;
    },
    animatedClass: function animatedClass() {
      return this.animated ? "animated" : null;
    },
    infoOutsideClass: function infoOutsideClass() {
      return this.infoInside ? null : "info-outside";
    }
  },
  watch: {
    percent: function percent(val) {
      this.info = this.format(val);
    }
  },
  mounted: function mounted() {
    this.info = this.format(this.percent);
  }
};

/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "progress-wrap",
    "class": [_vm.infoOutsideClass]
  }, [_c('div', {
    staticClass: "progress",
    "class": [_vm.stripedClass, _vm.animatedClass, _vm.sizeClass]
  }, [_c('div', {
    staticClass: "progress-bar",
    "class": [_vm.typeClass, _vm.sizeClass],
    style: {
      width: _vm.percent + '%'
    }
  }, [_vm.showinfo ? _c('span', {
    staticClass: "progress-info"
  }, [_vm._v(_vm._s(_vm.info))]) : _vm._e()])])]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = normalizeComponent_1({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$7, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

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
//
var script$8 = {
  props: {
    type: {
      type: String,
      "default": ""
    },
    title: {
      type: String
    },
    closable: {
      type: Boolean,
      "default": false
    },
    onClose: {
      type: Function,
      "default": function _default() {}
    },
    icon: {
      type: String
    },
    animated: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      isShow: true
    };
  },
  computed: {
    typeClass: function typeClass() {
      if (this.type === "loading") return "is-info";
      return this.type ? "is-".concat(this.type) : null;
    },
    hasIcon: function hasIcon() {
      return this.iconClass ? "has-icon" : null;
    },
    faSpin: function faSpin() {
      if (this.type === "loading") return "fa-spin";
      return this.animated ? "fa-spin" : null;
    },
    iconClass: function iconClass() {
      if (this.icon) return this.icon;

      if (this.type === "info") {
        return "info-circle";
      } else if (this.type === "success") {
        return "check-circle";
      } else if (this.type === "warning") {
        return "exclamation-triangle";
      } else if (this.type === "danger") {
        return "times-circle";
      } else if (this.type === "loading") {
        return "spinner";
      }

      return this.icon;
    }
  },
  methods: {
    handleClose: function handleClose() {
      var _this = this;

      this.isShow = false;
      this.onClose();
      setTimeout(function () {
        _this.$destroy();

        _this.$el.remove();
      }, 100);
    }
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    staticClass: "notification alert",
    "class": [_vm.typeClass, _vm.hasIcon]
  }, [_vm.closable ? _c('button', {
    staticClass: "delete",
    on: {
      "click": _vm.handleClose
    }
  }) : _vm._e(), _vm._v(" "), _vm.title ? _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _vm.iconClass ? _c('div', {
    staticClass: "wrap-icon"
  }, [_c('i', {
    "class": ['fa', "fa-" + _vm.iconClass, _vm.faSpin]
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "notification-content"
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = normalizeComponent_1({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$8, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

//
//
//
//
//
var script$9 = {
  props: {
    separator: {
      type: String,
      "default": ">"
    }
  },
  computed: {
    $items: function $items() {
      return this.$children;
    }
  }
};

/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ul', {
    staticClass: "breadcrumb"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = normalizeComponent_1({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$9, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

var utils = {
  isEmpty: function isEmpty(obj) {
    if (obj === null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (_typeof_1(obj) !== "object") return true;
    var flag = true;
    Object.keys(obj).every(function (key) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        flag = false;
        return false;
      }

      return true;
    });
    return flag;
  },
  isFunction: function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },
  getScroll: function getScroll(target, top) {
    if (typeof window === "undefined") {
      return 0;
    }

    var prop = top ? "pageYOffset" : "pageXOffset";
    var method = top ? "scrollTop" : "scrollLeft";
    var isWindow = target === window;
    var ret = isWindow ? target[prop] : target[method]; // ie6,7,8 standard mode

    if (isWindow && typeof ret !== "number") {
      ret = window.document.documentElement[method];
    }

    return ret;
  }
};

//
var script$a = {
  props: {
    label: {
      type: String
    },
    to: {
      type: String,
      "default": ""
    }
  },
  data: function data() {
    return {
      separator: ""
    };
  },
  computed: {
    hasSlot: function hasSlot() {
      if (utils.isEmpty(this.$slots)) return false;
      return true;
    }
  },
  mounted: function mounted() {
    var index = this.$parent.$items.indexOf(this);
    var itemsNum = this.$parent.$items.length;

    if (itemsNum !== index + 1) {
      this.separator = this.$parent.separator;
    }
  }
};

/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('li', [!_vm.hasSlot ? _c('a', {
    attrs: {
      "href": _vm.to
    }
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.separator ? _c('span', {
    staticClass: "breadcrumb-separator"
  }, [_vm._v(_vm._s(_vm.separator))]) : _vm._e()], 2);
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = undefined;
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = normalizeComponent_1({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$a, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

//
//
//
//
//
var script$b = {
  props: {
    accordion: Boolean
  },
  computed: {
    $collapseItems: function $collapseItems() {
      return this.$children;
    }
  },
  methods: {
    setActiveIndex: function setActiveIndex(index) {
      if (this.accordion) {
        this.$children.forEach(function (item, i) {
          if (i !== index) {
            item.isOpen = false;
          }
        });
      }
    }
  }
};

/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "collapse-wrap"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = undefined;
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = normalizeComponent_1({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$b, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

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
var script$c = {
  props: {
    title: String,
    actived: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      isOpen: this.actived
    };
  },
  computed: {
    index: function index() {
      return this.$parent.$collapseItems.indexOf(this);
    }
  },
  watch: {
    isActive: function isActive(val) {
      this.isOpen = val;
    }
  },
  methods: {
    toggle: function toggle() {
      this.isOpen = !this.isOpen;
      this.$parent.setActiveIndex(this.index);
    }
  }
};

/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "card is-fullwidth collapse-item",
    "class": {
      'is-active': _vm.isOpen
    }
  }, [_c('header', {
    staticClass: "card-header",
    on: {
      "click": _vm.toggle
    }
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": ""
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isOpen,
      expression: "isOpen"
    }],
    staticClass: "card-content"
  }, [_c('div', {
    staticClass: "content"
  }, [_vm._t("default")], 2)])])], 1);
};

var __vue_staticRenderFns__$d = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "card-header-icon"
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })]);
}];
/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = undefined;
/* module identifier */

var __vue_module_identifier__$d = undefined;
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = normalizeComponent_1({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$c, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);

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
//
//
//
var script$d = {
  props: {
    isFullWidth: Boolean,
    layout: {
      type: String,
      "default": 'top',
      validator: function validator(val) {
        return ['top', 'bottom', 'left', 'right'].indexOf(val) > -1;
      }
    },
    type: {
      type: String,
      "default": ''
    },
    size: {
      type: String,
      "default": ''
    },
    alignment: {
      type: String,
      "default": ''
    },
    activeIndex: {
      type: Number,
      "default": 0
    },
    animation: {
      type: String,
      "default": 'fade'
    },
    onlyFade: {
      type: Boolean,
      "default": true
    },
    onTabClick: {
      type: Function,
      "default": function _default() {}
    },
    transition: {
      type: String,
      "default": 'fade'
    }
  },
  data: function data() {
    return {
      tabPanes: [],
      selectedIndex: 0,
      prevSelectedIndex: -1
    };
  },
  watch: {
    activeIndex: function activeIndex(val) {
      this.selectedIndex = val;
    }
  },
  computed: {
    alignClass: function alignClass() {
      return this.alignment ? "is-".concat(this.alignment) : null;
    },
    typeClass: function typeClass() {
      return this.type ? "is-".concat(this.type) : null;
    },
    sizeClass: function sizeClass() {
      return this.size ? "is-".concat(this.size) : null;
    },
    layoutClass: function layoutClass() {
      return this.layout ? "is-layout-".concat(this.layout) : null;
    },
    fullWidthClass: function fullWidthClass() {
      return this.isFullWidth ? 'is-fullwidth' : null;
    }
  },
  methods: {
    isActive: function isActive(index) {
      return index === this.selectedIndex;
    },
    handleSelect: function handleSelect(index) {
      if (this.prevSelectedIndex !== -1) {
        this.tabPanes[this.selectedIndex].deActivated();
      }

      this.prevSelectedIndex = this.selectedIndex;
      this.selectedIndex = index;
      this.tabPanes[index].onActivated(index, this.prevSelectedIndex);
      this.onTabClick(index);
    }
  },
  mounted: function mounted() {
    this.tabPanes = this.$children.filter(function (child) {
      return child.isTabPane;
    });
    this.handleSelect(this.activeIndex);
  }
};

/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tabs is-layout-top",
    "class": [_vm.alignClass, _vm.typeClass, _vm.sizeClass, _vm.layoutClass, _vm.fullWidthClass]
  }, [_c('ul', {
    staticClass: "tab-list"
  }, _vm._l(_vm.tabPanes, function (tab, index) {
    return _c('li', {
      "class": {
        'is-active': _vm.isActive(index),
        'is-disabled': tab.disabled
      },
      attrs: {
        "role": "tab"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.handleSelect(index);
        }
      }
    }, [_c('a', [tab.icon ? _c('span', {
      staticClass: "icon",
      "class": {
        'is-small': _vm.size !== 'large'
      }
    }, [_c('i', {
      staticClass: "fa",
      "class": ["fa-" + tab.icon]
    })]) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(tab.label))])])]);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "tab-content is-flex"
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$e = undefined;
/* scoped */

var __vue_scope_id__$e = undefined;
/* module identifier */

var __vue_module_identifier__$e = undefined;
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$e = normalizeComponent_1({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$d, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
var script$e = {
  props: {
    icon: String,
    selected: Boolean,
    disabled: Boolean,
    label: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      isActive: false,
      transition: 'fade'
    };
  },
  beforeCreate: function beforeCreate() {
    this.isTabPane = true;
  },
  methods: {
    // params (crtIndex, prevIndex)
    onActivated: function onActivated() {
      this.isActive = true; //      this.transition = crtIndex > prevIndex ? 'fadeRight' : 'fadeRight';
      //      console.log(crtIndex);
      //      console.log(prevIndex);
    },
    deActivated: function deActivated() {
      this.isActive = false;
    }
  }
};

/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": _vm.transition
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isActive,
      expression: "isActive"
    }],
    staticClass: "tab-pane",
    "class": {
      'is-active': _vm.isActive
    }
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$f = [];
/* style */

var __vue_inject_styles__$f = undefined;
/* scoped */

var __vue_scope_id__$f = undefined;
/* module identifier */

var __vue_module_identifier__$f = undefined;
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$f = normalizeComponent_1({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$e, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
var script$f = {
  props: {
    label: String,
    type: {
      type: String,
      "default": "collapse"
    }
  },
  data: function data() {
    return {
      typeClass: this.type,
      isOpen: false
    };
  },
  methods: {
    hasOpened: function hasOpened() {
      var _this = this;

      this.$children.every(function (item) {
        if (item.isOpen) _this.isOpen = true;
        return true;
      });
      return false;
    }
  },
  mounted: function mounted() {
    this.hasOpened();
  }
};

/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm.label ? _c('p', {
    staticClass: "menu-label"
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('ul', {
    staticClass: "menu-list",
    "class": _vm.type
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$g = [];
/* style */

var __vue_inject_styles__$g = undefined;
/* scoped */

var __vue_scope_id__$g = undefined;
/* module identifier */

var __vue_module_identifier__$g = undefined;
/* functional template */

var __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$g = normalizeComponent_1({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$f, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);

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
var script$g = {
  props: {
    icon: String,
    to: {
      "default": "/"
    },
    isActive: {
      type: Boolean,
      "default": false
    },
    click: {
      type: Function
    },
    router: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      hasChildren: false,
      isOpen: false,
      arrowClass: "fa-caret-down",
      type: this.$parent.type
    };
  },
  //
  //  computed: {
  //    isOpen() {
  //      return this.isActive;
  //    },
  //  },
  methods: {
    toggle: function toggle() {
      this.isOpen = !this.isOpen;
    },
    getChildrenStatus: function getChildrenStatus() {
      var _this = this;

      this.$children.every(function (item) {
        if (item.isOpen) _this.isOpen = true;
        if (item.type === "float") _this.arrowClass = "fa-caret-right";
        return true;
      });
    }
  },
  mounted: function mounted() {
    this.isOpen = this.isActive;
    this.hasChildren = !!this.$slots.sub;

    if (this.hasChildren) {
      this.getChildrenStatus();

      if (this.arrowClass === "fa-caret-right") {
        this.$el.addEventListener("mouseenter", this.toggle);
        this.$el.addEventListener("mouseleave", this.toggle);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.removeEventListener("mouseenter", this.toggle);
    this.$el.removeEventListener("mouseleave", this.toggle);
  }
};

/* script */
var __vue_script__$g = script$g;
/* template */

var __vue_render__$h = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('li', {
    "class": {
      'is-active': _vm.isActive
    }
  }, [!_vm.hasChildren ? _c('span', [!_vm.click ? _c('router-link', {
    attrs: {
      "to": _vm.to,
      "exact": ""
    }
  }, [_vm.icon ? _c('i', {
    staticClass: "fa",
    "class": ["fa-" + _vm.icon]
  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2) : _vm._e(), _vm._v(" "), _vm.click ? _c('a', {
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": _vm.click
    }
  }, [_vm.icon ? _c('i', {
    staticClass: "fa",
    "class": ["fa-" + _vm.icon]
  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _vm.hasChildren ? _c('span', [_c('a', {
    staticClass: "has-children",
    "class": {
      'is-active': _vm.isActive,
      'is-open': _vm.isOpen
    },
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": _vm.toggle
    }
  }, [_vm.icon ? _c('i', {
    staticClass: "fa",
    "class": ["fa-" + _vm.icon]
  }) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c('span', {
    staticClass: "nav-right"
  }, [_c('i', {
    staticClass: "fa",
    "class": [_vm.arrowClass]
  })])], 2)]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isOpen,
      expression: "isOpen"
    }]
  }, [_vm._t("sub")], 2)]);
};

var __vue_staticRenderFns__$h = [];
/* style */

var __vue_inject_styles__$h = undefined;
/* scoped */

var __vue_scope_id__$h = undefined;
/* module identifier */

var __vue_module_identifier__$h = undefined;
/* functional template */

var __vue_is_functional_template__$h = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$h = normalizeComponent_1({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$g, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, undefined, undefined);

//
var script$h = {
  mixins: [ModalMixin],
  props: {
    width: {
      type: Number,
      "default": 450
    },
    placement: {
      type: String,
      "default": "left"
    },
    transition: {
      type: String,
      "default": "fadeLeft"
    }
  },
  computed: {
    placementClass: function placementClass() {
      if (this.placement && this.placement !== "left") {
        return "aside-".concat(this.placement);
      }

      return null;
    },
    transitionName: function transitionName() {
      if (this.placement === "right" && this.transition === "fadeLeft") {
        return "fadeRight";
      }

      return this.transition;
    }
  }
};

/* script */
var __vue_script__$h = script$h;
/* template */

var __vue_render__$i = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isActive,
      expression: "isActive"
    }],
    staticClass: "aside",
    "class": [{
      'is-active': _vm.isActive
    }, _vm.placementClass]
  }, [_vm.backdrop ? _c('div', {
    staticClass: "modal-background",
    on: {
      "click": _vm.backdropClose
    }
  }) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transitionName
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isActive,
      expression: "isActive"
    }],
    staticClass: "modal-card",
    style: _vm.modalWidth
  }, [_vm.showHeader ? _c('header', {
    staticClass: "modal-card-head aside-header"
  }, [_vm._t("header", [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('span', {
    staticClass: "close",
    on: {
      "click": _vm.handleCancel
    }
  }, [_vm._v("×")])])], 2) : _vm._e(), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body aside-body"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.showFooter ? _c('footer', {
    staticClass: "modal-card-foot aside-footer"
  }, [_vm._t("footer", [_vm.showCancel ? _c('a', {
    staticClass: "button",
    on: {
      "click": _vm.handleCancel
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]) : _vm._e(), _vm._v(" "), _vm.showOk ? _c('a', {
    staticClass: "button is-primary",
    "class": {
      'is-loading': _vm.isLoading
    },
    on: {
      "click": _vm.handleOk
    }
  }, [_vm._v(_vm._s(_vm.okText))]) : _vm._e()])], 2) : _vm._e()])])], 1)]);
};

var __vue_staticRenderFns__$i = [];
/* style */

var __vue_inject_styles__$i = undefined;
/* scoped */

var __vue_scope_id__$i = undefined;
/* module identifier */

var __vue_module_identifier__$i = undefined;
/* functional template */

var __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$i = normalizeComponent_1({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$h, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, undefined, undefined);

//
var script$i = {
  mixins: [PopperMixin],
  props: {
    width: {
      type: Number
    },
    trigger: {
      type: String,
      "default": "click"
    },
    title: {
      type: String,
      "default": ""
    },
    showOk: {
      type: Boolean,
      "default": true
    },
    showCancel: {
      type: Boolean,
      "default": true
    },
    okText: {
      type: String,
      "default": "OK"
    },
    cancelText: {
      type: String,
      "default": "Cancel"
    },
    onOk: {
      type: Function,
      "default": function _default() {}
    },
    onCancel: {
      type: Function,
      "default": function _default() {}
    },
    icon: String,
    type: {
      type: String,
      "default": "info"
    }
  },
  computed: {
    popperStyle: function popperStyle() {
      if (this.width && this.width !== 210) {
        return {
          width: "".concat(this.width, "px"),
          maxWidth: "none"
        };
      }

      return null;
    },
    iconClass: function iconClass() {
      if (this.icon) {
        return "fa-".concat(this.icon);
      }

      return null;
    },
    typeClass: function typeClass() {
      if (this.type) {
        return "is-".concat(this.type);
      }

      return null;
    }
  },
  methods: {
    handleOk: function handleOk(e) {
      this.onOk();
      this.handleClose(e);
    },
    handleCancel: function handleCancel(e) {
      this.onCancel();
      this.handleClose(e);
    },
    handleClose: function handleClose(e) {
      e.stopPropagation();
      this.hidePopper();
    }
  }
};

/* script */
var __vue_script__$i = script$i;
/* template */

var __vue_render__$j = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._t("default"), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    ref: "popper",
    staticClass: "popover popover-confirm",
    style: _vm.popperStyle
  }, [_vm.title ? _c('div', {
    staticClass: "popover-title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "popover-content"
  }, [_c('article', {
    staticClass: "media",
    "class": [_vm.typeClass]
  }, [_vm.icon ? _c('div', {
    staticClass: "media-left"
  }, [_c('i', {
    staticClass: "fa",
    "class": [_vm.iconClass]
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_vm._v(_vm._s(_vm.content))])])]), _vm._v(" "), _c('div', {
    staticClass: "popover-footer"
  }, [_vm.showCancel ? _c('a', {
    staticClass: "button is-small",
    on: {
      "click": _vm.handleCancel
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]) : _vm._e(), _vm._v(" "), _vm.showOk ? _c('a', {
    staticClass: "button is-small is-primary",
    on: {
      "click": _vm.handleOk
    }
  }, [_vm._v(_vm._s(_vm.okText))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "popover-arrow",
    attrs: {
      "x-arrow": ""
    }
  })])])], 2);
};

var __vue_staticRenderFns__$j = [];
/* style */

var __vue_inject_styles__$j = undefined;
/* scoped */

var __vue_scope_id__$j = undefined;
/* module identifier */

var __vue_module_identifier__$j = undefined;
/* functional template */

var __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$j = normalizeComponent_1({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$i, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);

var jump = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
     module.exports = factory() ;
  })(commonjsGlobal, function () {
    // find the rest of his easing functions here: http://robertpenner.com/easing/
    // find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

    var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var jumper = function jumper() {
      // private variable cache
      // no variables are created during a jump, preventing memory leaks
      var element = void 0; // element to scroll to                   (node)

      var start = void 0; // where scroll starts                    (px)

      var stop = void 0; // where scroll stops                     (px)

      var offset = void 0; // adjustment from the stop position      (px)

      var easing = void 0; // easing function                        (function)

      var a11y = void 0; // accessibility support flag             (boolean)

      var distance = void 0; // distance of scroll                     (px)

      var duration = void 0; // scroll duration                        (ms)

      var timeStart = void 0; // time scroll started                    (ms)

      var timeElapsed = void 0; // time spent scrolling thus far          (ms)

      var next = void 0; // next scroll position                   (px)

      var callback = void 0; // to call when done scrolling            (function)
      // scroll position helper

      function location() {
        return window.scrollY || window.pageYOffset;
      } // element offset helper


      function top(element) {
        return element.getBoundingClientRect().top + start;
      } // rAF loop helper


      function loop(timeCurrent) {
        // store time scroll started, if not started already
        if (!timeStart) {
          timeStart = timeCurrent;
        } // determine time spent scrolling so far


        timeElapsed = timeCurrent - timeStart; // calculate next scroll position

        next = easing(timeElapsed, start, distance, duration); // scroll to it

        window.scrollTo(0, next); // check progress

        timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
        : done(); // scrolling is done
      } // scroll finished helper


      function done() {
        // account for rAF time rounding inaccuracies
        window.scrollTo(0, start + distance); // if scrolling to an element, and accessibility is enabled

        if (element && a11y) {
          // add tabindex indicating programmatic focus
          element.setAttribute('tabindex', '-1'); // focus the element

          element.focus();
        } // if it exists, fire the callback


        if (typeof callback === 'function') {
          callback();
        } // reset time for next jump


        timeStart = false;
      } // API


      function jump(target) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // resolve options, or use defaults

        duration = options.duration || 1000;
        offset = options.offset || 0;
        callback = options.callback; // "undefined" is a suitable default, and won't be called

        easing = options.easing || easeInOutQuad;
        a11y = options.a11y || false; // cache starting position

        start = location(); // resolve target

        switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
          // scroll from current position
          case 'number':
            element = undefined; // no element to scroll to

            a11y = false; // make sure accessibility is off

            stop = start + target;
            break;
          // scroll to element (node)
          // bounding rect is relative to the viewport

          case 'object':
            element = target;
            stop = top(element);
            break;
          // scroll to element (selector)
          // bounding rect is relative to the viewport

          case 'string':
            element = document.querySelector(target);
            stop = top(element);
            break;
        } // resolve scroll distance, accounting for offset


        distance = stop - start + offset; // resolve duration

        switch (_typeof(options.duration)) {
          // number in ms
          case 'number':
            duration = options.duration;
            break;
          // function passed the distance of the scroll

          case 'function':
            duration = options.duration(distance);
            break;
        } // start the loop


        window.requestAnimationFrame(loop);
      } // expose only the jump method


      return jump;
    }; // export singleton


    var singleton = jumper();
    return singleton;
  });
});

//
var script$j = {
  props: {
    target: String,
    offset: {
      type: Number,
      "default": 500
    },
    duration: {
      type: Number,
      "default": 500
    },
    distance: Number //    options: {
    //      type: Object,
    //      default() {},
    //    },

  },
  data: function data() {
    return {
      isShow: true
    };
  },
  computed: {
    targetEl: function targetEl() {
      if (this.target === "top") {
        return document.body;
      } else if (this.distance) {
        return this.distance;
      }

      return this.target;
    },
    isPreset: function isPreset() {
      if (this.target === "top" || this.target === "bottom") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isShow = false;
        return true;
      }

      return false;
    },
    iconClass: function iconClass() {
      if (this.target === "bottom") return "fa-arrow-down";
      return "fa-arrow-up";
    }
  },
  methods: {
    handleScroll: function handleScroll() {
      this.isShow = utils.getScroll(window, true) > this.offset;
    },
    scrollTo: function scrollTo() {
      jump(this.targetEl, {
        duration: this.duration
      });
    }
  },
  mounted: function mounted() {
    if (this.isPreset) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isPreset) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
};

/* script */
var __vue_script__$j = script$j;
/* template */

var __vue_render__$k = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    staticClass: "scroll-to",
    "class": {
      'scroll-top': _vm.isPreset
    },
    on: {
      "click": _vm.scrollTo
    }
  }, [_vm._t("default", [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa",
    "class": [_vm.iconClass]
  })])])], 2);
};

var __vue_staticRenderFns__$k = [];
/* style */

var __vue_inject_styles__$k = undefined;
/* scoped */

var __vue_scope_id__$k = undefined;
/* module identifier */

var __vue_module_identifier__$k = undefined;
/* functional template */

var __vue_is_functional_template__$k = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$k = normalizeComponent_1({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$j, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, undefined, undefined);

var TableHeader = {
  name: "TableHeader",
  props: {
    columns: Array,
    checkable: Boolean,
    showIndex: Boolean,
    state: {
      type: Object,
      "default": function _default() {
        return undefined;
      }
    }
  },
  computed: {
    cols: function cols() {
      return this.$parent.columns;
    }
  },
  methods: {
    handleToggleSelectAll: function handleToggleSelectAll(isCheck) {
      this.$parent.handleToggleSelectAll(isCheck);
    }
  },
  // mounted() {
  //   console.log(this.$parent.columns);
  // },
  render: function render(h) {
    var _this = this; // eslint-disable-line


    var state = this.state;
    var checked = this.$parent.isCheckAll();
    return h("thead", [h("tr", [this.checkable ? h("th", [h("checkbox", {
      "attrs": {
        "checked": checked,
        "change": function change(value) {
          return _this.handleToggleSelectAll(value);
        }
      }
    })]) : "", this.showIndex ? h("th", ["#"]) : "", this["_l"](this.cols, function (column, cellIndex) {
      if (!column.visible) return null;
      var classes = "sortable";
      var sorterEl;
      var sortClass = "sort";

      if (column.sorter) {
        if (state.sortKey === column.field && state.reverse) {
          sortClass = "sort-desc";
        } else if (state.sortKey === column.field && !state.reverse) {
          sortClass = "sort-asc";
        }

        sorterEl = h("span", {
          "class": "sort-trigger " + sortClass
        }, [h("i", {
          "class": "fa fa-" + sortClass
        })]);
      }

      return h("th", {
        "key": cellIndex,
        "class": classes,
        "on": {
          "click": _this.$parent.handleToggleSort.bind(_this, column)
        }
      }, [h("span", [column.label]), sorterEl]);
    })])]);
  }
};

var TableBody = {
  name: "TableBody",
  props: {
    columns: Array,
    data: Array,
    checkable: Boolean,
    showIndex: Boolean,
    state: {
      type: Object,
      "default": function _default() {
        return;
      }
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    cols: function cols() {
      return this.$parent.columns;
    }
  },
  watch: {// cols(newVal) {
    //   console.log(newVal);
    // },
  },
  methods: {
    handleToggleSelect: function handleToggleSelect(row, isSelect, index) {
      this.$parent.handleSelectedChange(row, isSelect, index);
    }
  },
  // created() {},
  render: function render(h) {
    var _this = this; // eslint-disable-line


    var pagination = this.state.pagination;
    var selectedRowKeys = this.state.selectedRowKeys;
    var rowKey = this.$parent.rowKey;
    return h("tbody", [this["_l"](this.data, function (row, $index) {
      var key = row[rowKey] ? row[rowKey] : pagination.current + "-" + $index;
      var checked = selectedRowKeys.indexOf(key) >= 0;
      return h("tr", [_this.checkable ? h("th", [h("checkbox", {
        "attrs": {
          "checked": checked,
          "change": function change(value) {
            return _this.handleToggleSelect(row, value, $index);
          }
        },
        "key": key
      })]) : "", _this.showIndex ? h("th", [$index + 1]) : "", _this["_l"](_this.cols, function (column, cellIndex) {
        if (!column.visible) return null;
        return h("td", {
          "key": "" + $index + cellIndex
        }, [column.renderCell.call(_this._renderProxy, h, {
          row: row,
          column: column,
          $index: $index,
          store: _this.store,
          _self: _this.context || _this.$parent.$vnode.context
        })]);
      })]);
    })]);
  }
};

//
var script$k = {
  components: {
    TableHeader: TableHeader,
    TableBody: TableBody
  },
  name: "DataTable",
  props: {
    data: Array,
    change: {
      type: Function,
      "default": function _default() {}
    },
    height: Number,
    checkable: {
      type: Boolean,
      "default": false
    },
    showIndex: Boolean,
    pagination: {},
    onSelectChange: {
      type: Function,
      "default": function _default() {}
    },
    onSelectAll: {
      type: Function,
      "default": function _default() {}
    },
    rowKey: String,
    bordered: Boolean,
    striped: Boolean,
    narrow: Boolean
  },
  data: function data() {
    return {
      state: {
        sortKey: "",
        reverse: "",
        pagination: {
          current: 1
        },
        selectedRows: [],
        selectedRowKeys: []
      },
      cols: [],
      columns: [],
      selected: [],
      isTable: true,
      interData: [],
      showData: []
    };
  },
  computed: {
    mainStyle: function mainStyle() {
      return this.height ? {
        height: "".concat(this.height, "px"),
        overflow: "scroll"
      } : null;
    },
    totalCnt: function totalCnt() {
      var total = this.pagination && this.pagination.total ? this.pagination.total : 0;
      return total;
    }
  },
  watch: {
    columns: function columns(newVal) {
      console.log(newVal);
    },
    data: function data(val) {
      this.interData = val;
      this.handleReorganizeData();
    }
  },
  methods: {
    sortBy: function sortBy(arr, feild) {
      arr.sort(function (a, b) {
        return a[feild] > b[feild] ? 1 : -1;
      });
      return arr;
    },
    calcColumnWidth: function calcColumnWidth() {
      var _this = this;

      var width = this.$el.offsetWidth;
      var length = this.columns.length;

      if (this.checkable) {
        width -= 40;
        this.cols.push(40);
      }

      if (this.showIndex) {
        width -= 40;
        this.cols.push(40);
      }

      this.columns.forEach(function (column) {
        if (column.width) {
          width -= column.width;
          length -= 1;
        }
      });
      var avgWidth = Math.floor(width / length);
      this.columns.forEach(function (column) {
        if (column.width) {
          _this.cols.push(column.width);
        } else {
          _this.height ? _this.cols.push(avgWidth) : _this.cols.push("");
        }
      });
    },
    handleToggleSort: function handleToggleSort(column) {
      if (!column.sorter || !column.field) return;
      this.state.sortKey = column.field;
      this.state.reverse = !this.state.reverse;

      if (utils.isFunction(column.sorter) || column.sorter === "custom") {
        this.interData = this.sortBys(this.interData, column.field);
        if (this.state.reverse) this.interData.reverse();
      }

      this.handleTableChange();
    },
    handlePageSizeChange: function handlePageSizeChange(current, pageSize) {
      console.log("pageSize", pageSize);
      this.state.pagination.pageSize = pageSize;
      this.handleTableChange();
    },
    handlePageChange: function handlePageChange(current) {
      this.state.pagination.current = current;
      var onPageChange = this.state.pagination.change;

      if (onPageChange && utils.isFunction(onPageChange)) {
        onPageChange(current);
      }

      this.handleTableChange();
    },
    handleInitTable: function handleInitTable() {},
    handleTableChange: function handleTableChange() {
      this.change(this.state);
      this.handleReorganizeData();
    },
    handleReorganizeData: function handleReorganizeData() {
      if (this.state.pagination.total) {
        var current = this.state.pagination.current || 1;
        var pageSize = this.state.pagination.pageSize || 10;

        if (this.interData.length <= pageSize) {
          this.showData = this.interData;
        } else {
          var start = (current - 1) * pageSize;
          var end = parseInt(start, 10) + parseInt(pageSize, 10);
          this.showData = this.interData.slice(start, end);
        }
      } else {
        this.showData = this.interData;
      }
    },
    handleSelectedChange: function handleSelectedChange(row, isSelect, index) {
      var key = row[this.rowKey];

      if (!key) {
        var currentPage = this.state.pagination.current;
        key = "".concat(currentPage, "-").concat(index);
      }

      var isExist = this.state.selectedRowKeys.indexOf(key) >= 0;

      if (isSelect && !isExist) {
        this.state.selectedRowKeys.push(key);
        this.state.selectedRows.push(row);
      }

      if (!isSelect && isExist) {
        var selectedIndex = this.state.selectedRowKeys.indexOf(key);
        this.state.selectedRows.splice(selectedIndex, 1);
        this.state.selectedRowKeys.splice(selectedIndex, 1);
      }

      this.onSelectChange(this.state.selectedRowKeys, this.state.selectedRows);
    },
    handleToggleSelectAll: function handleToggleSelectAll(isCheck) {
      var _this2 = this;

      var currentPage = this.state.pagination.current;

      if (isCheck) {
        this.showData.forEach(function (row, index) {
          var key = row[_this2.rowKey] ? row[_this2.rowKey] : "".concat(currentPage, "-").concat(index);
          var isExist = _this2.state.selectedRowKeys.indexOf(key) >= 0;

          if (!isExist) {
            _this2.state.selectedRowKeys.push(key);

            _this2.state.selectedRows.push(row);
          }
        });
      } else {
        this.showData.forEach(function (row, index) {
          var key = row[_this2.rowKey] ? row[_this2.rowKey] : "".concat(currentPage, "-").concat(index);

          var selectedIndex = _this2.state.selectedRowKeys.indexOf(key);

          if (selectedIndex >= 0) {
            _this2.state.selectedRows.splice(selectedIndex, 1);

            _this2.state.selectedRowKeys.splice(selectedIndex, 1);
          }
        });
      }

      this.onSelectChange(this.state.selectedRowKeys, this.state.selectedRows);
    },
    isCheckAll: function isCheckAll() {
      var _this3 = this;

      var currentPage = this.state.pagination.current;
      var checkedAll = this.showData.some(function (row, index) {
        var key = row[_this3.rowKey] ? row[_this3.rowKey] : "".concat(currentPage, "-").concat(index);
        return _this3.state.selectedRowKeys.indexOf(key) < 0;
      });
      return !checkedAll;
    },
    handleRefresh: function handleRefresh() {
      this.state = {
        sortKey: "",
        reverse: "",
        selectedRows: [],
        selectedRowKeys: []
      };

      if (this.pagination) {
        this.state.pagination = this.pagination;
      } else {
        this.state.pagination = {
          current: 1
        };
      }

      this.interData = this.data;
      this.handleTableChange();
    }
  },
  created: function created() {
    this.interData = this.data;
    if (this.pagination) this.state.pagination = this.pagination;
  },
  mounted: function mounted() {
    this.calcColumnWidth();
    this.handleReorganizeData();
  }
};

/* script */
var __vue_script__$k = script$k;
/* template */

var __vue_render__$l = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "data-table-container"
  }, [_vm._t("default"), _vm._v(" "), _vm.height ? _c('div', {
    ref: "header",
    staticClass: "data-table-header"
  }, [_c('table', {
    staticClass: "table data-table",
    "class": {
      'is-bordered': _vm.bordered,
      'is-striped': _vm.striped,
      'is-narrow': _vm.narrow
    }
  }, [_c('colgroup', _vm._l(_vm.cols, function (col, index) {
    return _c('col', {
      key: index,
      attrs: {
        "width": col
      }
    });
  }), 0), _vm._v(" "), _c('table-header', {
    attrs: {
      "data": _vm.showData,
      "showIndex": _vm.showIndex
    }
  })], 1)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "data-table-main",
    style: _vm.mainStyle
  }, [_c('table', {
    staticClass: "table data-table",
    "class": {
      'is-bordered': _vm.bordered,
      'is-striped': _vm.striped,
      'is-narrow': _vm.narrow
    }
  }, [_c('colgroup', _vm._l(_vm.cols, function (col, index) {
    return _c('col', {
      key: index,
      attrs: {
        "width": col
      }
    });
  }), 0), _vm._v(" "), !_vm.height ? [_c('table-header', {
    attrs: {
      "state": _vm.state,
      "checkable": _vm.checkable,
      "showIndex": _vm.showIndex
    }
  })] : _vm._e(), _vm._v(" "), _c('table-body', {
    attrs: {
      "state": _vm.state,
      "checkable": _vm.checkable,
      "data": _vm.showData,
      "showIndex": _vm.showIndex
    }
  })], 2)]), _vm._v(" "), _vm.totalCnt ? _c('pagination', {
    attrs: {
      "total": _vm.totalCnt,
      "align": "right",
      "change": _vm.handlePageChange,
      "pageSizeChange": _vm.handlePageSizeChange
    }
  }) : _vm._e()], 2);
};

var __vue_staticRenderFns__$l = [];
/* style */

var __vue_inject_styles__$l = undefined;
/* scoped */

var __vue_scope_id__$l = undefined;
/* module identifier */

var __vue_module_identifier__$l = undefined;
/* functional template */

var __vue_is_functional_template__$l = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$l = normalizeComponent_1({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$k, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, undefined, undefined, undefined);

var Column = {
  name: "Column",
  props: {
    label: String,
    width: Number,
    className: String,
    field: String,
    sorter: [Boolean, Function, String],
    selectable: Boolean,
    filters: Array,
    onFilter: Function,
    visible: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      column: {}
    };
  },
  created: function created() {
    var _this = this;

    var isShowIcon = this.visible ? "check" : "remove";
    this.column = {
      label: this.label,
      width: this.width,
      className: this.className,
      field: this.field,
      sorter: this.sorter,
      selectable: this.selectable,
      scopedSlots: this.$scopedSlots,
      visible: this.visible,
      isShowIcon: isShowIcon
    };

    this.column.renderCell = function (h, _a) {
      var row = _a.row,
          column = _a.column; // eslint-disable-line

      if (_this.$scopedSlots["default"]) {
        return h("div", {
          "class": "child"
        }, [_this.$scopedSlots["default"](row)]);
      }

      return row[column.field];
    };
  },
  mounted: function mounted() {
    this.$parent.columns.push(this.column);
  },
  render: function render(h) {
    // eslint-disable-line
    return null;
  }
};

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
//
//
//
//
var script$l = {
  props: {
    hasRefresh: Boolean,
    hasColumnsControl: Boolean
  },
  data: function data() {
    return {
      columns: []
    };
  },
  methods: {
    handleRefresh: function handleRefresh() {
      this.$parent.handleRefresh();
    },
    handleColumnControl: function handleColumnControl(index) {
      this.$parent.columns[index].visible = !this.$parent.columns[index].visible;
      this.$parent.columns[index].isShowIcon = this.$parent.columns[index].visible ? "check" : "remove";
    }
  },
  created: function created() {
    this.columns = this.$parent.columns;
  }
};

/* script */
var __vue_script__$l = script$l;
/* template */

var __vue_render__$m = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "table-toolbar level"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_vm.hasRefresh ? _c('div', {
    staticClass: "level-item"
  }, [_c('a', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.handleRefresh
    }
  }, [_c('i', {
    staticClass: "fa fa-refresh"
  })])]) : _vm._e(), _vm._v(" "), _vm.hasColumnsControl ? _c('div', {
    staticClass: "level-item"
  }, [_c('dropdown', [_c('a', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.handleRefresh
    }
  }, [_c('i', {
    staticClass: "fa fa-eye"
  })]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_c('menus', _vm._l(_vm.columns, function (column, index) {
    return _c('menu-item', {
      key: index,
      attrs: {
        "icon": column.isShowIcon,
        "click": _vm.handleColumnControl.bind(this, index)
      }
    }, [_vm._v(_vm._s(column.label))]);
  }), 1)], 1)])], 1) : _vm._e(), _vm._v(" "), _vm._t("left")], 2), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [_vm._t("right")], 2)]);
};

var __vue_staticRenderFns__$m = [];
/* style */

var __vue_inject_styles__$m = undefined;
/* scoped */

var __vue_scope_id__$m = undefined;
/* module identifier */

var __vue_module_identifier__$m = undefined;
/* functional template */

var __vue_is_functional_template__$m = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$m = normalizeComponent_1({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$l, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, undefined, undefined);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty$1 = _defineProperty;

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
var script$m = {
  props: {
    name: String,
    label: String,
    type: {
      type: String,
      "default": 'primary'
    },
    disabled: Boolean,
    checked: Boolean,
    value: {},
    val: [String, Number, Boolean],
    change: {
      type: Function,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      isChecked: this.checked,
      realVal: null
    };
  },
  computed: {
    typeClass: function typeClass() {
      if (this.type) return "is-".concat(this.type);
      return null;
    }
  },
  watch: {
    realVal: function realVal(val) {
      this.change(val);
    },
    checked: function checked(val) {
      this.handleChecked(val);
    }
  },
  methods: {
    toggle: function toggle() {
      this.isChecked = !this.isChecked;

      if (this.val && !this.isChecked) {
        this.realVal = '';
        this.$emit('input', this.realVal);
      } else if (this.val && this.isChecked) {
        this.realVal = this.val;
        this.$emit('input', this.realVal);
      } else if (!this.val && this.isChecked) {
        this.realVal = true;
        this.$emit('input', this.realVal);
      } else {
        this.realVal = false;
        this.$emit('input', this.realVal);
      }

      this.$parent.isCheckboxGroup && this.$parent.updateValue(); //      this.change(e);
    },
    handleChecked: function handleChecked(isChecked) {
      this.isChecked = isChecked;
    }
  },
  mounted: function mounted() {
    if (this.isChecked && !this.value) {
      this.$emit('input', this.$refs.checkbox.value);
    }

    if (this.value === this.val) {
      this.isChecked = true;
    }
  }
};

var __vue_script__$m = script$m;
/* template */

var __vue_render__$n = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "checkbox blu-checkbox",
    "class": [{
      'on': _vm.isChecked
    }, _vm.typeClass, {
      'is-disabled': _vm.disabled
    }],
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.toggle($event);
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.realVal,
      expression: "realVal"
    }],
    ref: "checkbox",
    attrs: {
      "type": "checkbox",
      "name": _vm.name,
      "disabled": _vm.disabled
    },
    domProps: defineProperty$1({
      "checked": _vm.isChecked,
      "value": _vm.realVal
    }, "checked", Array.isArray(_vm.realVal) ? _vm._i(_vm.realVal, _vm.realVal) > -1 : _vm.realVal),
    on: {
      "change": [function ($event) {
        var $$a = _vm.realVal,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = _vm.realVal,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.realVal = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.realVal = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.realVal = $$c;
        }
      }, function ($event) {
        return _vm.$emit('change', $event);
      }]
    }
  }), _vm._v(" "), _c('span', [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$n = [];
/* style */

var __vue_inject_styles__$n = undefined;
/* scoped */

var __vue_scope_id__$n = undefined;
/* module identifier */

var __vue_module_identifier__$n = undefined;
/* functional template */

var __vue_is_functional_template__$n = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$n = normalizeComponent_1({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$m, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, undefined, undefined, undefined);

//
//
//
//
//
var script$n = {
  props: {
    value: Array,
    onChange: {
      type: Function,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      checkedList: [],
      isCheckboxGroup: true
    };
  },
  methods: {
    updateValue: function updateValue() {
      var _this = this;

      this.checkedList = [];
      this.$children.forEach(function (child) {
        child.realVal && _this.checkedList.push(child.realVal);
      });
      this.$emit('input', this.checkedList);
      this.onChange(this.checkedList);
    },
    initChecked: function initChecked() {
      var _this2 = this;

      this.$children.forEach(function (child) {
        if (_this2.value && _this2.value.indexOf(child.val) >= 0) {
          child.isChecked = true;
          child.realVal = child.val;
        }
      });
    }
  },
  mounted: function mounted() {
    this.initChecked();
  }
};

/* script */
var __vue_script__$n = script$n;
/* template */

var __vue_render__$o = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$o = [];
/* style */

var __vue_inject_styles__$o = undefined;
/* scoped */

var __vue_scope_id__$o = undefined;
/* module identifier */

var __vue_module_identifier__$o = undefined;
/* functional template */

var __vue_is_functional_template__$o = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$o = normalizeComponent_1({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$n, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, undefined, undefined);

//
//
//
//
//
var script$o = {
  props: {
    value: [String, Number],
    onChange: {
      type: Function,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      checked: '',
      isRadioGroup: true
    };
  },
  computed: {
    radioItems: function radioItems() {
      return this.$children;
    }
  },
  watch: {
    value: function value() {
      this.initChecked();
    }
  },
  methods: {
    updateValue: function updateValue(index) {
      var _this = this;

      this.checked = '';
      this.$children.forEach(function (child, i) {
        if (index !== i) {
          child.isChecked = false;
        } else {
          _this.checked = child.val;
        }
      });
      this.$emit('input', this.checked);
      this.onChange(this.checked);
    },
    initChecked: function initChecked() {
      var _this2 = this;

      this.$children.forEach(function (child) {
        if (_this2.value && _this2.value.indexOf(child.val) >= 0) {
          child.isChecked = true;
          child.realVal = child.val;
        } else {
          child.isChecked = false;
          child.realVal = '';
        }
      });
    }
  },
  mounted: function mounted() {
    this.initChecked();
  }
};

/* script */
var __vue_script__$o = script$o;
/* template */

var __vue_render__$p = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "control has-addons"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$p = [];
/* style */

var __vue_inject_styles__$p = undefined;
/* scoped */

var __vue_scope_id__$p = undefined;
/* module identifier */

var __vue_module_identifier__$p = undefined;
/* functional template */

var __vue_is_functional_template__$p = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$p = normalizeComponent_1({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$o, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, undefined, undefined, undefined);

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
//
//
//
var script$p = {
  props: {
    name: String,
    label: String,
    type: {
      type: String,
      "default": "primary"
    },
    disabled: Boolean,
    checked: Boolean,
    value: {},
    val: [String, Number, Boolean],
    onChange: {
      type: Function,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      isChecked: this.checked,
      realVal: null
    };
  },
  computed: {
    typeClass: function typeClass() {
      if (this.type) return "is-".concat(this.type);
      return null;
    },
    index: function index() {
      return this.$parent.radioItems ? this.$parent.radioItems.indexOf(this) : null;
    }
  },
  watch: {
    value: function value() {
      this.updateValue();
    }
  },
  methods: {
    toggle: function toggle() {
      if (this.isChecked) return;
      this.isChecked = !this.isChecked;

      if (this.$refs.checkbox.value && !this.isChecked) {
        this.realVal = "";
        this.$emit("input", this.realVal);
      } else if (this.$refs.checkbox.value && this.isChecked) {
        this.realVal = this.$refs.checkbox.value;
        this.$emit("input", this.realVal);
      } else if (!this.$refs.checkbox.value && this.isChecked) {
        this.realVal = true;
        this.$emit("input", this.realVal);
      } else {
        this.realVal = false;
        this.$emit("input", this.realVal);
      }

      this.$parent.isRadioGroup && this.$parent.updateValue(this.index);
      this.onChange(this.isChecked);
    },
    updateValue: function updateValue() {//      console.log(this.value);
    }
  },
  mounted: function mounted() {
    if (this.isChecked && !this.value) {
      this.$emit("input", this.$refs.checkbox.value);
    }

    if (this.value === this.val) {
      this.isChecked = true;
    }
  }
};

var __vue_script__$p = script$p;
/* template */

var __vue_render__$q = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "radio blu-radio",
    "class": [{
      on: _vm.isChecked
    }, _vm.typeClass, {
      'is-disabled': _vm.disabled
    }],
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.toggle($event);
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "checkbox",
    attrs: {
      "type": "radio",
      "name": _vm.name,
      "disabled": _vm.disabled
    },
    domProps: defineProperty$1({
      "checked": _vm.isChecked,
      "value": _vm.val
    }, "checked", _vm._q(_vm.model, _vm.val)),
    on: {
      "change": function change($event) {
        _vm.model = _vm.val;
      }
    }
  }), _vm._v(" "), _c('span', [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$q = [];
/* style */

var __vue_inject_styles__$q = undefined;
/* scoped */

var __vue_scope_id__$q = undefined;
/* module identifier */

var __vue_module_identifier__$q = undefined;
/* functional template */

var __vue_is_functional_template__$q = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$q = normalizeComponent_1({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$p, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
var script$q = {
  props: {
    icon: String,
    disabled: Boolean,
    checked: Boolean,
    value: {},
    val: [String, Number, Boolean],
    onChange: {
      type: Function,
      "default": function _default() {}
    },
    name: String
  },
  data: function data() {
    return {
      isChecked: this.checked,
      realVal: null
    };
  },
  computed: {
    index: function index() {
      return this.$parent.radioItems ? this.$parent.radioItems.indexOf(this) : null;
    },
    iconClass: function iconClass() {
      return this.icon ? "fa-".concat(this.icon) : null;
    }
  },
  methods: {
    toggle: function toggle() {
      if (this.isChecked) return;
      this.isChecked = !this.isChecked;

      if (this.$refs.checkbox.value && !this.isChecked) {
        this.realVal = '';
        this.$emit('input', this.realVal);
      } else if (this.$refs.checkbox.value && this.isChecked) {
        this.realVal = this.$refs.checkbox.value;
        this.$emit('input', this.realVal);
      } else if (!this.$refs.checkbox.value && this.isChecked) {
        this.realVal = true;
        this.$emit('input', this.realVal);
      } else {
        this.realVal = false;
        this.$emit('input', this.realVal);
      }

      this.$parent.isRadioGroup && this.$parent.updateValue(this.index);
      this.onChange(this.isChecked);
    }
  }
};

var __vue_script__$q = script$q;
/* template */

var __vue_render__$r = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('a', {
    staticClass: "button radio-button",
    "class": [{
      'is-primary': _vm.isChecked
    }],
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.toggle($event);
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "checkbox",
    attrs: {
      "type": "radio",
      "name": _vm.name,
      "disabled": _vm.disabled
    },
    domProps: defineProperty$1({
      "checked": _vm.isChecked,
      "value": _vm.val
    }, "checked", _vm._q(_vm.model, _vm.val)),
    on: {
      "change": function change($event) {
        _vm.model = _vm.val;
      }
    }
  }), _vm._v(" "), _vm.icon ? _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa",
    "class": [_vm.iconClass]
  })]) : _vm._e(), _vm._v(" "), _c('span', [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$r = [];
/* style */

var __vue_inject_styles__$r = undefined;
/* scoped */

var __vue_scope_id__$r = undefined;
/* module identifier */

var __vue_module_identifier__$r = undefined;
/* functional template */

var __vue_is_functional_template__$r = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$r = normalizeComponent_1({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$q, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, undefined, undefined, undefined);

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
//
//
var script$r = {
  props: {
    type: {
      type: String,
      "default": "success"
    },
    size: String,
    onText: String,
    offText: String,
    checked: Boolean,
    disabled: Boolean,
    value: {},
    name: String,
    onChange: {
      type: Function,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      on: false,
      showText: ""
    };
  },
  computed: {
    typeClass: function typeClass() {
      return this.type ? "is-".concat(this.type) : "is-success";
    },
    sizeClass: function sizeClass() {
      return this.size ? "is-".concat(this.size) : null;
    },
    hasText: function hasText() {
      return this.onText || this.offText;
    }
  },
  //  watch: {
  //    on(val) {
  //      this.showText = val ? this.onText : this.offText;
  //    },
  //  },
  methods: {
    toggle: function toggle() {
      this.on = !this.on;
      this.showText = this.on ? this.onText : this.offText;
      this.$emit("input", this.on);
      this.onChange(this.on);
    }
  },
  mounted: function mounted() {
    if (this.checked || this.value) {
      this.on = true;
      this.showText = this.onText;
    } else {
      this.showText = this.offText;
    }
  }
};

/* script */
var __vue_script__$r = script$r;
/* template */

var __vue_render__$s = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "switch-wrap",
    "class": [{
      'is-disabled': _vm.disabled
    }, _vm.sizeClass],
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.toggle($event);
      }
    }
  }, [_c('input', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "type": "checkbox",
      "name": _vm.name
    },
    domProps: {
      "checked": _vm.on
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "switchery",
    "class": [{
      on: _vm.on
    }, _vm.typeClass, _vm.sizeClass, {
      'has-text': _vm.hasText
    }]
  }, [_c('small', {
    staticClass: "switcher"
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v(_vm._s(_vm.showText))])]), _vm._v(" "), _vm._t("default")], 2);
};

var __vue_staticRenderFns__$s = [];
/* style */

var __vue_inject_styles__$s = undefined;
/* scoped */

var __vue_scope_id__$s = undefined;
/* module identifier */

var __vue_module_identifier__$s = undefined;
/* functional template */

var __vue_is_functional_template__$s = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$s = normalizeComponent_1({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$r, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, undefined, undefined, undefined);

var Pager =
/** @class */
function (_super) {
  __extends(Pager, _super);

  function Pager() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Pager.prototype.render = function (h) {
    // eslint-disable-line
    var activeClass = this.active ? "button is-primary " + this.size : "button " + this.size;
    return h("li", [h("a", {
      "class": activeClass,
      "on": {
        "click": this.$parent["handleChangePage"].bind(this, this.pageNo)
      }
    }, [this.pageNo])]);
  };

  __decorate([Prop({
    type: String,
    required: true
  })], Pager.prototype, "size", void 0);

  __decorate([Prop({
    type: Number,
    required: true
  })], Pager.prototype, "pageNo", void 0);

  __decorate([Prop({
    type: Boolean,
    required: true
  })], Pager.prototype, "active", void 0);

  Pager = __decorate([Component({})], Pager);
  return Pager;
}(Vue);

var Pagination =
/** @class */
function (_super) {
  __extends(Pagination, _super);

  function Pagination() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.interCurrent = 1;
    _this.interPageSize = _this.pageSize;
    return _this;
  }

  Object.defineProperty(Pagination.prototype, "sizeClass", {
    // get totalPage() {
    //   return this.calcTotalPage(this.total, this.interPageSize);
    // }
    get: function get() {
      return this.size === "small" ? "is-small" : "";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Pagination.prototype, "alignClass", {
    get: function get() {
      return this.align ? "is-" + this.align : "";
    },
    enumerable: true,
    configurable: true
  });

  Pagination.prototype.calcTotalPage = function (total, interPageSize) {
    return Math.floor((total - 1) / interPageSize) + 1;
  };

  Pagination.prototype.handleChangePage = function (p) {
    if (p !== this.interCurrent) {
      this.interCurrent = p;
      this.change(p);
    }
  };

  Pagination.prototype.handleJumpPrev = function () {
    this.handleChangePage(Math.max(1, this.interCurrent - 5));
  };

  Pagination.prototype.handleJumpNext = function () {
    this.handleChangePage(Math.min(this.totalPage, this.interCurrent + 5));
  };

  Pagination.prototype.hasPrev = function () {
    return this.interCurrent > 1;
  };

  Pagination.prototype.hasNext = function () {
    return this.interCurrent < this.totalPage;
  };

  Pagination.prototype.handlePrev = function () {
    this.handleChangePage(this.interCurrent - 1);
  };

  Pagination.prototype.handleNext = function () {
    this.handleChangePage(this.interCurrent + 1);
  };

  Pagination.prototype.handleQuickJumper = function (e) {
    var page = e.target.value;
    page = Number(page);
    if (!page || isNaN(page)) return;

    if (e.keyCode === 13) {
      this.handleChangePage(page);
    }
  };

  Pagination.prototype.handlePageSizeChange = function (e) {
    var pageSize = e.target["value"];
    this.interPageSize = pageSize;
    this.totalPage = this.calcTotalPage(this.total, this.interPageSize);

    if (this.interCurrent > this.totalPage) {
      this.handleChangePage(this.totalPage);
    }

    this.pageSizeChange(this.interCurrent, pageSize);
  };

  Pagination.prototype.onCurrentChange = function (val) {
    if (val !== this.interCurrent) {
      this.handleChangePage(val);
    }
  };

  Pagination.prototype.onPageSizeChange = function (val) {
    if (val !== this.interPageSize) ;
  };

  Pagination.prototype.mounted = function () {
    this.handleChangePage(this.current);
  };

  Pagination.prototype.render = function (h) {
    // eslint-disable-line
    var alignClass = this.alignClass;
    var sizeClass = this.sizeClass;
    var pagerList = [];
    var total;
    var jumper;
    var sizer;
    var pager = null;
    var prevPager = null;
    var nextPager = null;
    var firstPager = null;
    var lastPager = null;
    var interCurrent = this.interCurrent;

    if (!this.simple) {
      if (this.totalPage <= 6) {
        for (var i = 1; i <= this.totalPage; i++) {
          var active = interCurrent === i;
          pagerList.push(h("v-pager", {
            "attrs": {
              "pageNo": i,
              "active": active,
              "size": sizeClass
            },
            "on": {
              "click": this.handleChangePage.bind(this, i)
            }
          }));
        }
      } else {
        prevPager = h("li", {
          "class": "btn-jumper"
        }, [h("a", {
          "class": "button is-primary is-inverted " + sizeClass,
          "on": {
            "click": this.handleJumpPrev
          }
        }, [h("i", {
          "class": "fa fa-angle-double-left"
        })])]);
        nextPager = h("li", {
          "class": "btn-jumper"
        }, [h("a", {
          "class": "button is-primary is-inverted " + sizeClass,
          "on": {
            "click": this.handleJumpNext
          }
        }, [h("i", {
          "class": "fa fa-angle-double-right"
        })])]);
        firstPager = h("v-pager", {
          "attrs": {
            "active": false,
            "size": sizeClass,
            "pageNo": 1
          }
        });
        lastPager = h("v-pager", {
          "attrs": {
            "active": false,
            "size": sizeClass,
            "pageNo": this.totalPage
          }
        });
        var left = Math.max(1, interCurrent - 2);
        var right = Math.min(interCurrent + 2, this.totalPage);

        if (interCurrent - 1 <= 2) {
          right = 1 + 4;
        }

        if (this.totalPage - interCurrent <= 2) {
          left = this.totalPage - 4;
        }

        for (var i = left; i <= right; i++) {
          var active = interCurrent === i;
          pagerList.push(h("v-pager", {
            "attrs": {
              "pageNo": i,
              "size": sizeClass,
              "active": active
            },
            "on": {
              "click": this.handleChangePage.bind(this, i)
            }
          }));
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

      total = h("span", ["\u5171 ", this.total, " \u6761"]);
      jumper = h("span", ["\u8DF3\u8F6C\u5230", " ", h("input", {
        "class": "input " + sizeClass,
        "attrs": {
          "type": "number",
          "min": "1",
          "number": "true"
        },
        "on": {
          "keyup": this.handleQuickJumper
        }
      })]);
      sizer = h("span", {
        "class": "select " + sizeClass
      }, [h("select", {
        "on": {
          "change": this.handlePageSizeChange
        }
      }, [this["_l"](this.sizeOptions, function (option) {
        return h("option", {
          "domProps": {
            "value": option
          }
        }, [option, " \u6761/\u9875"]);
      })])]);
      var prevClass = this.hasPrev() ? "button " + sizeClass : "button is-disabled " + sizeClass;
      var nextClass = this.hasNext() ? "button " + sizeClass : "button is-disabled " + sizeClass;
      pager = h("ul", [h("li", [h("a", {
        "class": prevClass,
        "on": {
          "click": this.handlePrev
        }
      }, [h("i", {
        "class": "fa fa-angle-left"
      })])]), this["_l"](pagerList, function (page) {
        return page;
      }), h("li", [h("a", {
        "class": nextClass,
        "on": {
          "click": this.handleNext
        }
      }, [h("i", {
        "class": "fa fa-angle-right"
      })])])]);
    } else {
      var prevClass = this.hasPrev() ? "button " + sizeClass : "button is-disabled " + sizeClass;
      var nextClass = this.hasNext() ? "button " + sizeClass : "button is-disabled " + sizeClass;
      pager = h("ul", [h("li", [h("a", {
        "class": prevClass,
        "on": {
          "click": this.handlePrev
        }
      }, [h("i", {
        "class": "fa fa-angle-left"
      })])]), h("li", [h("input", {
        "class": "input " + sizeClass,
        "domProps": {
          "value": this.interCurrent
        },
        "attrs": {
          "type": "number",
          "min": "1",
          "number": "true"
        },
        "on": {
          "keyup": this.handleQuickJumper
        }
      })]), h("li", ["/ ", this.total]), h("li", [h("a", {
        "class": nextClass,
        "on": {
          "click": this.handleNext
        }
      }, [h("i", {
        "class": "fa fa-angle-right"
      })])])]);
    }

    var items = {
      total: total,
      sizer: sizer,
      pager: pager,
      jumper: jumper
    };
    var components = this.layout.split(",");
    return h("nav", {
      "class": "pagination " + sizeClass + " " + alignClass
    }, [components.map(function (item) {
      return items[item.trim()];
    })]);
  };

  __decorate([Prop({
    type: Number,
    "default": 10
  })], Pagination.prototype, "pageSize", void 0);

  __decorate([Prop({
    type: Number,
    "default": 1
  })], Pagination.prototype, "current", void 0);

  __decorate([Prop(Number)], Pagination.prototype, "total", void 0);

  __decorate([Prop({
    type: Function,
    "default": function _default() {
      return null;
    }
  })], Pagination.prototype, "change", void 0);

  __decorate([Prop({
    type: Function,
    "default": function _default() {
      return null;
    }
  })], Pagination.prototype, "pageSizeChange", void 0);

  __decorate([Prop(String)], Pagination.prototype, "size", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": false
  })], Pagination.prototype, "simple", void 0);

  __decorate([Prop({
    type: String,
    "default": "total, pager, sizer, jumper"
  })], Pagination.prototype, "layout", void 0);

  __decorate([Prop({
    type: Array,
    "default": function _default() {
      return [10, 20, 30, 40, 50];
    }
  })], Pagination.prototype, "sizeOptions", void 0);

  __decorate([Prop(String)], Pagination.prototype, "align", void 0);

  __decorate([Watch("current", {
    immediate: true,
    deep: true
  })], Pagination.prototype, "onCurrentChange", null);

  __decorate([Watch("pageSize")], Pagination.prototype, "onPageSizeChange", null);

  Pagination = __decorate([Component({
    components: {
      VPager: Pager
    }
  })], Pagination);
  return Pagination;
}(Vue);

//
//
//
//
//
//
//
var script$s = {
  props: {
    title: String,
    description: String,
    isActive: Boolean
  },
  data: function data() {
    return {
      step: {},
      active: this.isActive
    };
  },
  created: function created() {
    this.step = {
      title: this.title,
      description: this.description,
      isActive: this.isActive
    };
    this.$parent.steps.push(this.step);
  },
  mounted: function mounted() {}
};

/* script */
var __vue_script__$s = script$s;
/* template */

var __vue_render__$t = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.active,
      expression: "active"
    }],
    staticClass: "step-panel"
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$t = [];
/* style */

var __vue_inject_styles__$t = undefined;
/* scoped */

var __vue_scope_id__$t = undefined;
/* module identifier */

var __vue_module_identifier__$t = undefined;
/* functional template */

var __vue_is_functional_template__$t = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$t = normalizeComponent_1({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$s, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, undefined, undefined, undefined);

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
//
//
//
//
var script$t = {
  props: {
    type: {
      type: String,
      "default": "pills"
    },
    current: {
      type: Number,
      "default": 0
    },
    prevText: {
      type: String,
      "default": "Prev"
    },
    nextText: {
      type: String,
      "default": "Next"
    },
    onPrev: {
      type: Function,
      "default": function _default() {}
    },
    onNext: {
      type: Function,
      "default": function _default() {}
    },
    showFooter: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      steps: [],
      stepStyle: {},
      currentIndex: this.current
    };
  },
  //  computed: {
  //    currentIndex() {
  //
  //    },
  //  },
  watch: {
    current: function current(val) {
      this.currentIndex = val;
      this.setActiveIndex(this.currentIndex);
    }
  },
  methods: {
    setActiveIndex: function setActiveIndex(index) {
      this.$children.forEach(function (item, i) {
        if (i !== index) {
          item.active = false;
        } else {
          item.active = true;
        }
      });
    },
    next: function next() {
      if (this.currentIndex < this.$children.length) {
        this.currentIndex += 1;
        this.setActiveIndex(this.currentIndex);
        this.onNext(this.currentIndex);
      }
    },
    prev: function prev() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
        this.setActiveIndex(this.currentIndex);
        this.onPrev(this.currentIndex);
      }
    }
  },
  created: function created() {
    if (this.type === "pills") {
      var width = "".concat(parseInt(100 / this.steps.length, 10), "%");
      this.stepStyle["width"] = width;
    }
  },
  mounted: function mounted() {
    this.setActiveIndex(this.currentIndex);
  }
};

/* script */
var __vue_script__$t = script$t;
/* template */

var __vue_render__$u = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "steps-wrap",
    "class": [_vm.type]
  }, [_c('div', {
    staticClass: "step-header"
  }, _vm._l(_vm.steps, function (step, index) {
    return _c('div', {
      key: index,
      staticClass: "step-item",
      "class": {
        'is-active': _vm.currentIndex === index,
        'is-done': index < _vm.currentIndex
      },
      style: {
        stepStyle: _vm.stepStyle
      }
    }, [_c('div', {
      staticClass: "step-left"
    }, [_c('div', {
      staticClass: "step-icon"
    }, [index >= _vm.currentIndex ? _c('span', [_vm._v(_vm._s(index + 1))]) : _vm._e(), _vm._v(" "), index < _vm.currentIndex ? _c('span', [_c('i', {
      staticClass: "fa fa-check"
    })]) : _vm._e()])]), _vm._v(" "), _c('div', {
      staticClass: "step-desc"
    }, [_c('span', {
      staticClass: "step-title"
    }, [_vm._v(_vm._s(step.title))])]), _vm._v(" "), _c('div', {
      staticClass: "step-description"
    }, [_vm._v(_vm._s(step.description))])]);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "step-content is-flex"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.showFooter ? _c('div', {
    staticClass: "step-footer has-text-right"
  }, [_c('button', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.prev
    }
  }, [_vm._v(_vm._s(_vm.prevText))]), _vm._v(" "), _c('button', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.next
    }
  }, [_vm._v(_vm._s(_vm.nextText))])]) : _vm._e()]);
};

var __vue_staticRenderFns__$u = [];
/* style */

var __vue_inject_styles__$u = undefined;
/* scoped */

var __vue_scope_id__$u = undefined;
/* module identifier */

var __vue_module_identifier__$u = undefined;
/* functional template */

var __vue_is_functional_template__$u = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$u = normalizeComponent_1({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$t, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, false, undefined, undefined, undefined);

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
//
//
//
//
//
//
//
//
//
var script$u = {
  props: {
    min: {
      type: Number,
      "default": 0
    },
    max: {
      type: Number,
      "default": Infinity
    },
    step: {
      type: Number,
      "default": 1
    },
    disabled: Boolean,
    val: {
      type: Number,
      "default": 0
    },
    onChange: {
      type: Function,
      "default": function _default() {}
    },
    size: String,
    mode: {
      type: String,
      "default": ""
    }
  },
  computed: {
    sizeClass: function sizeClass() {
      return this.size ? "is-".concat(this.size) : null;
    }
  },
  data: function data() {
    return {
      interVal: this.val
    };
  },
  watch: {
    interVal: function interVal(val, oldVal) {
      this.handleFormat(val);

      if (this.interVal !== Number(oldVal) && this.interVal !== "-") {
        if (isNaN(oldVal) && oldVal !== "-") return;
        this.$emit("input", this.interVal);
        this.onChange(this.interVal);
      }
    }
  },
  methods: {
    handleFormat: function handleFormat(val) {
      if (val !== "" && val !== "-") {
        this.interVal = isNaN(this.interVal) ? 0 : Number(this.interVal);
        if (this.interVal > this.max) this.interVal = this.max;
        if (this.interVal < this.min) this.interVal = this.min;
      }
    },
    increase: function increase() {
      if (this.max) {
        this.interVal + this.step <= this.max && this.changeVal(this.step);
      } else {
        this.changeVal(this.step);
      }
    },
    decrease: function decrease() {
      if (this.min || this.min === 0) {
        this.interVal - this.step >= this.min && this.changeVal(-this.step);
      } else {
        this.changeVal(-this.step);
      }
    },
    changeVal: function changeVal(num) {
      if (this.disabled) return;
      this.interVal += num;
    },
    handleKeyDown: function handleKeyDown(e) {
      if (e.keyCode === 38) {
        this.increase();
      } else if (e.keyCode === 40) {
        this.decrease();
      }
    }
  }
};

/* script */
var __vue_script__$u = script$u;
/* template */

var __vue_render__$v = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "blu-ipt-number control has-addons",
    "class": {
      'is-disabled': _vm.disabled
    }
  }, [_vm.mode === 's' ? _c('a', {
    staticClass: "button",
    "class": [_vm.sizeClass],
    on: {
      "click": _vm.decrease
    }
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.interVal,
      expression: "interVal"
    }],
    staticClass: "input",
    "class": [_vm.sizeClass],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.interVal
    },
    on: {
      "keydown": _vm.handleKeyDown,
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.interVal = $event.target.value;
      }
    }
  }), _vm._v(" "), _vm.mode !== 's' ? _c('a', {
    staticClass: "button",
    "class": [_vm.sizeClass],
    on: {
      "click": _vm.decrease
    }
  }, [_vm._m(1)]) : _vm._e(), _vm._v(" "), _c('a', {
    staticClass: "button",
    "class": [_vm.sizeClass],
    on: {
      "click": _vm.increase
    }
  }, [_vm._m(2)])]);
};

var __vue_staticRenderFns__$v = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-minus"
  })]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-minus"
  })]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}];
/* style */

var __vue_inject_styles__$v = undefined;
/* scoped */

var __vue_scope_id__$v = undefined;
/* module identifier */

var __vue_module_identifier__$v = undefined;
/* functional template */

var __vue_is_functional_template__$v = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$v = normalizeComponent_1({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$u, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, false, undefined, undefined, undefined);

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
var script$v = {
  props: {
    type: {
      type: String,
      "default": 'default'
    },
    title: {
      type: String
    },
    content: {
      type: String,
      "default": ''
    },
    closable: {
      type: Boolean,
      "default": true
    },
    onClose: {
      type: Function,
      "default": function _default() {}
    },
    duration: {
      type: Number,
      "default": 4500
    },
    placement: {
      type: String,
      "default": 'top-right'
    },
    icon: {
      type: String
    },
    animated: {
      type: Boolean,
      "default": false
    },
    transition: {
      type: String
    }
  },
  data: function data() {
    return {
      isShow: false,
      placementTransition: {
        'top-right': 'fadeRight',
        'top-center': 'fadeDown',
        'top-left': 'fadeLeft',
        'bottom-right': 'fadeRight',
        'bottom-center': 'fadeUp',
        'bottom-left': 'fadeLeft'
      }
    };
  },
  computed: {
    typeClass: function typeClass() {
      return this.type ? "is-".concat(this.type) : null;
    },
    hasIcon: function hasIcon() {
      return this.iconClass ? 'has-icon' : null;
    },
    faSpin: function faSpin() {
      return this.animated ? 'fa-spin' : null;
    },
    iconClass: function iconClass() {
      if (this.icon) return this.icon;

      if (this.type === 'info') {
        return 'info-circle';
      } else if (this.type === 'success') {
        return 'check-circle';
      } else if (this.type === 'warning') {
        return 'exclamation-triangle';
      } else if (this.type === 'danger') {
        return 'times-circle';
      } else if (this.type === 'loading') {
        this.type = 'info';
        this.animated = true;
        return 'spinner';
      }

      return this.icon;
    },
    transitionName: function transitionName() {
      if (this.transition) return this.transition;
      return this.placementTransition[this.placement];
    }
  },
  methods: {
    handleClose: function handleClose() {
      var _this = this;

      this.isShow = false;
      setTimeout(function () {
        _this.$destroy();

        _this.$el.remove();
      }, 100);
    },
    close: function close() {
      clearTimeout(this.timer);
      this.isShow = false;
      this.$destroy();
      this.$el.remove();
    }
  },
  beforeMount: function beforeMount() {
    var parent;
    parent = document.querySelector(".notifications.".concat(this.placement));

    if (!parent) {
      parent = document.createElement('div');
      parent.classList.add('notifications', this.placement);
      document.body.appendChild(parent);
    }

    parent.appendChild(this.$el);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.isShow = true;
    this.timer = setTimeout(function () {
      return _this2.close();
    }, this.duration);
  }
};

/* script */
var __vue_script__$v = script$v;
/* template */

var __vue_render__$w = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": _vm.transitionName
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    staticClass: "notification alert",
    "class": [_vm.typeClass, _vm.hasIcon]
  }, [_vm.closable ? _c('span', {
    staticClass: "close",
    on: {
      "click": _vm.handleClose
    }
  }, [_vm._v("×")]) : _vm._e(), _vm._v(" "), _vm.iconClass ? _c('div', {
    staticClass: "wrap-icon"
  }, [_c('i', {
    "class": ['fa', "fa-" + _vm.iconClass, _vm.faSpin]
  })]) : _vm._e(), _vm._v(" "), _vm.title ? _c('div', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "notification-content",
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })])]);
};

var __vue_staticRenderFns__$w = [];
/* style */

var __vue_inject_styles__$w = undefined;
/* scoped */

var __vue_scope_id__$w = undefined;
/* module identifier */

var __vue_module_identifier__$w = undefined;
/* functional template */

var __vue_is_functional_template__$w = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$w = normalizeComponent_1({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$v, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, false, undefined, undefined, undefined);

function _open(propsData) {
  var NotifyComponent = Vue$1.extend(__vue_component__$w);
  return new NotifyComponent({
    el: document.createElement("div"),
    propsData: propsData
  });
}

var Notify = {
  open: function open(params) {
    var defaultParam = {
      direction: "right",
      duration: 4500
    };
    var propsData = Object.assign(defaultParam, params);
    return _open(propsData);
  },
  info: function info(params) {
    var defaultParam = {
      direction: "right",
      duration: 4500,
      type: "info"
    };
    var propsData = Object.assign(defaultParam, params);
    return _open(propsData);
  },
  warning: function warning(params) {
    var defaultParam = {
      direction: "right",
      duration: 4500,
      type: "warning"
    };
    var propsData = Object.assign(defaultParam, params);
    return _open(propsData);
  },
  success: function success(params) {
    var defaultParam = {
      direction: "right",
      duration: 4500,
      type: "success"
    };
    var propsData = Object.assign(defaultParam, params);
    return _open(propsData);
  },
  danger: function danger(params) {
    var defaultParam = {
      direction: "right",
      duration: 4500,
      type: "danger"
    };
    var propsData = Object.assign(defaultParam, params);
    return _open(propsData);
  }
};

//
var script$w = {
  mixins: [ModalMixin],
  props: {
    content: String,
    icon: String,
    width: {
      type: Number,
      "default": 400
    },
    autoClose: {
      type: Number,
      "default": 0
    },
    type: {
      type: String,
      "default": "info"
    }
  },
  methods: {
    handleClose: function handleClose() {
      var _this = this;

      //      this.$emit('close');
      setTimeout(function () {
        _this.$destroy();

        _this.$el.remove();
      }, 100);
    },
    close: function close() {
      this.handleClose();
    }
  },
  computed: {
    modalWidth: function modalWidth() {
      if (this.width !== 400 && this.width !== 0) {
        return {
          width: "".concat(this.width, "px")
        };
      }

      return null;
    },
    iconClass: function iconClass() {
      if (this.icon) {
        return "fa-".concat(this.icon);
      }

      return null;
    },
    typeClass: function typeClass() {
      if (this.type) {
        return "is-".concat(this.type);
      }

      return null;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    setTimeout(function () {
      _this2.isShow = true;
    }, 100);

    if (this.autoClose) {
      setTimeout(function () {
        _this2.handleClose();
      }, this.autoClose * 1000);
    }
  }
};

/* script */
var __vue_script__$w = script$w;
/* template */

var __vue_render__$x = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    staticClass: "modal modal-confirm align-baseline is-active borderless"
  }, [_vm.backdrop ? _c('div', {
    staticClass: "modal-background",
    on: {
      "click": _vm.backdropClose
    }
  }) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transition
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShow,
      expression: "isShow"
    }],
    staticClass: "modal-card",
    style: _vm.modalWidth
  }, [_vm.showHeader ? _c('header', {
    staticClass: "modal-card-head"
  }, [_vm._t("header", [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('span', {
    staticClass: "close",
    on: {
      "click": _vm.handleCancel
    }
  }, [_vm._v("×")])])], 2) : _vm._e(), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body"
  }, [_c('article', {
    staticClass: "media",
    "class": [_vm.typeClass]
  }, [_vm.icon ? _c('div', {
    staticClass: "media-left"
  }, [_c('i', {
    staticClass: "fa",
    "class": [_vm.iconClass]
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_vm._v(_vm._s(_vm.content))])])]), _vm._v(" "), _vm.showFooter ? _c('footer', {
    staticClass: "modal-card-foot"
  }, [_vm._t("footer", [_vm.showCancel ? _c('a', {
    staticClass: "button",
    on: {
      "click": _vm.handleCancel
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]) : _vm._e(), _vm._v(" "), _vm.showOk ? _c('a', {
    staticClass: "button is-primary",
    "class": {
      'is-loading': _vm.isLoading
    },
    on: {
      "click": _vm.handleOk
    }
  }, [_vm._v(_vm._s(_vm.okText))]) : _vm._e()])], 2) : _vm._e()])])], 1)]);
};

var __vue_staticRenderFns__$x = [];
/* style */

var __vue_inject_styles__$x = undefined;
/* scoped */

var __vue_scope_id__$x = undefined;
/* module identifier */

var __vue_module_identifier__$x = undefined;
/* functional template */

var __vue_is_functional_template__$x = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$x = normalizeComponent_1({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$w, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, false, undefined, undefined, undefined);

function _open$1(propsData) {
  var ModalComponent = Vue$1.extend(__vue_component__$x);
  return new ModalComponent({
    el: document.createElement("div"),
    propsData: propsData
  });
}

var MessageModal = {
  open: function open(params) {
    var defaultParam = {
      title: "消息",
      content: ""
    };
    var propsData = Object.assign(defaultParam, params);
    return _open$1(propsData);
  },
  confirm: function confirm(params) {
    var defaultParam = {
      title: "提示",
      content: "",
      icon: "question-circle-o",
      type: "warning"
    };
    var propsData = Object.assign(defaultParam, params);
    return _open$1(propsData);
  },
  alert: function alert(params) {
    var defaultParam = {
      title: "提示",
      type: "danger",
      icon: "exclamation-triangle",
      content: "",
      showCancel: false
    };
    var propsData = Object.assign(defaultParam, params);
    return _open$1(propsData);
  }
};

/* !
 * vue-blu v0.1.9
 * (c) 2017 Chenz <chenz8606@gmail.com>
 * Released under the MIT License.
 * Documentation: https://chenz24.github.io/vue-blu/#/
 */
var components = {
  Affix: __vue_component__,
  Tooltip: __vue_component__$1,
  Popover: __vue_component__$2,
  Dropdown: __vue_component__$3,
  Timeline: __vue_component__$4,
  TimelineItem: __vue_component__$5,
  Tag: __vue_component__$6,
  Modal: __vue_component__$7,
  ProgressBar: __vue_component__$8,
  Alert: __vue_component__$9,
  Breadcrumb: __vue_component__$a,
  BreadcrumbItem: __vue_component__$b,
  Collapse: __vue_component__$c,
  CollapseItem: __vue_component__$d,
  Tabs: __vue_component__$e,
  TabItem: __vue_component__$f,
  Menus: __vue_component__$g,
  MenuItem: __vue_component__$h,
  bAside: __vue_component__$i,
  PopConfirm: __vue_component__$j,
  ScrollTo: __vue_component__$k,
  DataTable: __vue_component__$l,
  Column: Column,
  TableToolbar: __vue_component__$m,
  Checkbox: __vue_component__$n,
  CheckboxGroup: __vue_component__$o,
  Radio: __vue_component__$q,
  RadioGroup: __vue_component__$p,
  RadioButton: __vue_component__$r,
  bSwitch: __vue_component__$s,
  Pagination: Pagination,
  Steps: __vue_component__$u,
  Step: __vue_component__$t,
  InputNumber: __vue_component__$v // Datepicker

};

var install = function install(Vue) {
  // eslint-disable-line
  if (install["installed"]) return;
  Object.keys(components).forEach(function (key) {
    return Vue.component(key, components[key]);
  });
  Vue.prototype.$notify = Notify;
  Vue.prototype.$modal = MessageModal;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

var index = {
  version: "0.1.9",
  install: install
};

export default index;
