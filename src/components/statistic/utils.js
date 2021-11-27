const units = [
  ['Y' , 1000 * 60 * 60 * 24 * 365],
  ['M' , 1000 * 60 * 60 * 24 * 30],
  ['D' , 1000 * 60 * 60 * 24],
  ['H' , 1000 * 60 * 60],
  ['m' , 1000 * 60],
  ['s' , 1000],
  ['S' , 1]
];
export function formatCountdown (value , format) {
  const current = Date.now();
  const target = value;
  // 当时间结束后，防止出现负数
  let diff = Math.max(target - current , 0);
  let text = units.reduce((start , item) => {
    let ref = item.slice();
    let name = ref[0];
    let unit = ref[1];
    if (start.indexOf(name) > -1) {
      let value = Math.floor(diff / unit);
      // 减去当前值，还有剩余的值
      diff = diff - value * unit;
      // 匹配多个name，那么就用0来填充，比如HH:mm:ss，那么就是04:23:04
      return start.replace(new RegExp(name + '+' , 'g') , match => {
        return String(value).padStart(match.length , '0');
      })
    };
    return start;
  } , format);
  return text;
}