<!--
 * @Date: 2020-04-05 09:01:49
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-05 09:12:54
 * @repository: https://github.com/SkyBlueFeet
 -->

# VUE 中 jsx 使用问题

## render 函数中使用自定义组件

自定义的 VNode 对象不能通过`<custom-vnode></custom-vnode>`方法引入，而是以 JSX 变量的方式引入

```js
render(h){
  const tag = <div class="nav-item"></div>;
  return <div class="navbar">{tag}</div>;
}
```

如果需要使用自定义组件，需要使用 Vue 的 Components 选项引入自定义组件
