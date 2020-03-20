/*
 * @Date: 2020-03-19 21:24:34
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-19 21:31:14
 * @repository: https://github.com/SkyBlueFeet
 */
/**
 * Vue directive for lazy load components or elements.
 */

function findVmFromFrag(frag) {
  let node = frag.node;
  if (frag.end) {
    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
      node = node.nextSibling;
    }
  }
  return node.__vue__;
}

type Option = Record<string, string>;

export default {
  install: function(Vue, options: Option = {}) {
    const FragmentFactory = Vue.FragmentFactory;
    const { createAnchor, replace } = Vue.util;

    Vue.directive(options.name || "lazy", {
      terminal: true,

      bind() {
        console.log(this);
        this.isInit = false;
        this.anchor = createAnchor("v-if");
        replace(this.el, this.anchor);
      },
      update(value) {
        if (this.isInit) {
          return;
        }

        window.setTimeout(() => {
          this.insert();
          this.updateRef();
          this.isInit = true;
        }, value || 0);
      },
      unbind() {
        this.frag && this.frag.destroy();
      },
      // insert dom
      insert() {
        if (!this.factory) {
          this.factory = new FragmentFactory(this.vm, this.el);
        }
        this.frag = this.factory.create(this._host, this._scope, this._frag);
        this.frag.before(this.anchor);
      },
      // update v-ref
      updateRef() {
        const ref = this.descriptor.ref;
        if (!ref) {
          return;
        }

        const hash = (this.vm || this._scope).$refs;
        const refs = hash[ref];
        const key = this._frag.scope.$key;

        if (!refs) {
          return;
        }

        if (Array.isArray(refs)) {
          refs.push(findVmFromFrag(this._frag));
        } else {
          refs[key] = findVmFromFrag(this._frag);
        }
      }
    });
  }
};
