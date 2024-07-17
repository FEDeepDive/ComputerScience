/** 연결 리스트
 */
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key) {
    const node = new Node(key);

    if (!this.root) {
      this.root = node;
      return;
    }

    function compare(current) {
      if (key < current.key)
        current.left ? compare(current.left) : (current.left = node);
      else if (key > current.key)
        current.right ? compare(current.right) : (current.right = node);
    }
    compare(this.root);
  }

  remove(key, root) {
    if (!root) return null;

    if (key < root.key) root.left = this.remove(key, root.left);
    else if (key > root.key) root.right = this.remove(key, root.right);
    else {
      // 노드에게 자식이 없는 경우
      if (!root.left && !root.right) return null;

      // 노드에게 왼쪽 자식만 있는 경우
      if (!root.right) return root.left;

      // 노드에게 오른쪽 자식만 있는 경우
      if (!root.left) return root.right;

      // 노드에게 왼쪽, 오른쪽 자식 모두 있는 경우 => 오른쪽 서브트리에서 min 데려오기
      const min = root.right;
      while (!min.left) min = min.left;
      root.key = min.key; // 삭제하려는 노드의 key를 min으로 변경
      root.right = remove(min.key, root.right); // min 노드 삭제
      return root;
    }
  }
}
