/*
 * @Author: skybluefeet
 * @Date: 2020-03-05 00:17:05
 * @LastEditors: skybluefeet
 * @LastEditTime: 2020-03-05 00:30:16
 */
type StyleKeys = keyof CSSStyleDeclaration;

export type Style = {
  [key in StyleKeys]?: CSSStyleDeclaration[key];
};

export type Theme = "primary" | "info" | "success" | "danger" | "warning";
