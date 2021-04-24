export default function extend (target) {
  for (let i = 1 ; i < arguments.length ; i++) {
    let source = arguments[i];
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    };
  }
  return target;
}