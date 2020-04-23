/*
 * @Date: 2020-04-03 12:12:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-04 17:42:03
 * @repository: https://github.com/SkyBlueFeet
 */
declare module "*.jsonc" {
  const content: JSON;
  export default content;
}

declare module "*.json5" {
  const content: JSON;
  export default content;
}

declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.ejs" {
  type ejs = (
    data?: Record<string, unknown> | Array<unknown> | unknown
  ) => string;
  const Ejs: ejs;
  export default Ejs;
}
