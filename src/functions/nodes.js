export function getIdsFromNodeArr(arr, idType = "dataId") {
  if (idType === "dataId") {
    return arr.reduce((acc, node) => {
      acc.push(node.data.id);
      return acc;
    }, []);
  }
  if (idType === "rFlow") {
    return arr.reduce((acc, node) => {
      acc.push(node.id);

      return acc;
    }, []);
  }
}
