import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
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
}