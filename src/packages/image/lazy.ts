/*
 * @Date: 2020-03-18 20:58:30
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-19 15:18:02
 * @repository: https://github.com/SkyBlueFeet
 */
export function isInView(el: HTMLElement): boolean {
  const bound = el.getBoundingClientRect();
  const clientHight = window.innerHeight;
  return (
    bound.top >= 0 &&
    bound.bottom <= (clientHight || document.documentElement.clientHeight)
  );
}

export function loadImg(el: HTMLImageElement): void {
  if (!el.src) {
    const source = el.dataset.src;
    el.src = source;
  }
}

export function scrollHandler(el: HTMLImageElement): void {
  if (isInView(el)) {
    loadImg(el);
  }
}
