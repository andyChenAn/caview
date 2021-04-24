const getInstanceProps = function (instance) {
  let res = {};
  let $options = instance.$options;
  $options = $options === undefined ? {} : $options;
  let instanceProps = instance.$props;
  let propsData = $options.propsData;
  for (let key in instanceProps) {
    if (key in propsData) {
      res[key] = instanceProps[key];
    }
  }
  return res;
};
const getComponentFormProp = function (instance , propName) {
  const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : instance;
  const execute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  let h = instance.$createElement;
  if (h) {
    let prop = instance[propName];
    if (prop) {
      // 如果prop存在，那么就返回prop
      return typeof prop == 'function' && execute ? prop(h , options) : prop;
    };
    // prop不存在，那么就需要去看是否存在相应的插槽(slot=propName)
    return instance.$scopedSlots[propName] && execute && instance.$scopedSlots[propName](options) || instance.$scopedSlots[propName] || instance.$slots[propName] || undefined;
  } else {

  }
}
export { getInstanceProps , getComponentFormProp };