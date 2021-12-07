import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _extends from '@babel/runtime/helpers/extends';
export function flatFilter(tree, callback) {
  return tree.reduce(function (acc, node) {
    if (callback(node)) {
      acc.push(node);
    }
    if (node.children) {
      var children = flatFilter(node.children, callback);
      acc.push.apply(acc, _toConsumableArray(children));
    }
    return acc;
  }, []);
};
export function treeMap(tree, mapper) {
  var childrenName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  return tree.map(function (node, index) {
    var extra = {};
    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }
    return _extends({}, mapper(node, index), extra);
  });
}
