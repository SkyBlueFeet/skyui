/*
 * @Date: 2020-04-02 20:36:34
 * @LastEditors: skyblue
 * @LastEditTime: 2020-04-02 20:52:43
 * @repository: https://github.com/SkyBlueFeet
 */

const gap = 32;

// 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
const mobile = 576;

const tablet = 769;

// 960px container + 4rem
const desktop = 960 + 2 * gap;

// 1152px container + 4rem
const widescreen = 1152 + 2 * gap;
const widescreenEnabled = true;

// 1344px container + 4rem
const fullhd = 1344 + 2 * gap;

export function isTablet(win: Window): boolean {
  return win.screen.width < tablet;
}

export function isDesktop(win: Window): boolean {
  return win.screen.width > desktop;
}

export function isMobile(win: Window): boolean {
  return win.screen.width < mobile;
}
