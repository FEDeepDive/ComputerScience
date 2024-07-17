// 완전이진트리(Complete Binary Tree) 구현

/**
 * 배열
 * 루트 노드 인덱스를 0으로 하고 그냥 push하면 끝
 * 부모 노드 인덱스 i에 대해, left child = 2*i+1, right child = 2*i+2 임
 * (root 인덱스를 1로 하면, left = 2*i, right = 2*i+1)
 */

/**
 * 연결 리스트
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTreeWithLinkedList {
  constructor() {
    this.root = null;
    this.queue = [];
  }

  addNode(value) {
    const node = new Node(value);

    if (!this.root) {
      this.root = node;
      this.queue.push(node);
      return node;
    }

    if (!this.queue[0].left) this.queue[0].left = node;
    else {
      this.queue[0].right = node;
      this.queue.shift();
    }
    this.queue.push(node);
    return node;
  }

  traversal(node) {
    if (!node) return;

    this.traversal(node.left);
    console.log(node.value + ' ');
    this.traversal(node.right);
  }
}
