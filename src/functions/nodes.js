export function getIdsFromNodeArr(arr) {
  return arr.reduce((acc, node) => {
    acc.push(node.data.id);
    return acc;
  }, []);
}
