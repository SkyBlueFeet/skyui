/*
 * @Date: 2020-04-03 12:12:07
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-03 12:26:26
 * @repository: https://github.com/SkyBlueFeet
 */
import { Entry } from "webpack";
import { resolve } from "../utils";
import { Options as PageOptions } from "html-webpack-plugin";
import { env } from "../assembly";
import { MixingPagesOption } from ".";

export default function(env: env): MixingPagesOption {
  const vueEntry: Entry = {
    app: resolve("example/main.ts")
  };

  const vuePages: PageOptions[] = [
    {
      filename: "index.html",
      template: resolve("example/index.html")
    }
  ];

  return {
    entries: vueEntry,
    htmlOptions: vuePages
  };
}
