/** 배열
 * 각 인덱스를 노드로 하고, 부모 노드를 값으로 가짐
 */
class TreeWithArray {
  constructor() {
    this.tree = [];
  }

  addNode(parentNode) {
    this.tree.push(parentNode);
  }

  hasNode(node) {
    return this.tree.includes(node);
  }
}

/** 인접 리스트
 * 그래프와 거의 동일하기 때문에 구현 생략
 */
