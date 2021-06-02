let cache;
export default function getScrollBarWidth () {
  if (cache === undefined) {
    let inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    let outer = document.createElement('div');
    outer.style.poisition = 'absolute';
    outer.style.top = 0;
    outer.style.left = 0;
    outer.style.pointerEvents = 'none';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '180px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    document.body.appendChild(outer);
    // 先设置overflow：hidden拿到inner容器的宽度
    let innerWidth = inner.offsetWidth;
    
    outer.style.overflow = 'scroll';
    // 再设置overflow：scroll拿到inner容器可以滚动时的宽度
    let scrollWidth = inner.offsetWidth;
    if (innerWidth === scrollWidth) {
      innerWidth = outer.offsetWidth;
    };
    document.body.removeChild(outer);
    cache = innerWidth - scrollWidth;
  };
  return cache;
};