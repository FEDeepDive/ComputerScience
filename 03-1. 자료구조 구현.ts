// 노드
// ts에서 클래스는 타입으로 사용 가능.
// 즉 아래의 Node는 클래스이자 타입임
// export default는 dom의 Node와 중복되지 않기 위해 모듈화
export class Node {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

export class TNode extends Node {
  children: TNode[];
  parent?: TNode;

  constructor(value: number) {
    super(value);
    this.children = [];
  }
}

export class BTNode extends TNode {
  left: BTNode | undefined;
  right: BTNode | undefined;
  children: BTNode[];

  constructor(value: number) {
    super(value);

    this.left = undefined;
    this.right = undefined;
  }
}

// 그래프

class Graph {
  // 모든 노드 저장
  nodes: Node[] = [];
  // 노드를 인접리스트로 저장, 인덱스 시그니쳐
  adjacencyList: { [key: number]: Node[] } = {};
  // adjacencyMatrix

  // 노드 추가
  addNode(node: Node) {
    this.nodes.push(node);
    this.adjacencyList[node.value] = [];

    this.printNodes();
  }

  // 엣지 추가
  addEdge(node1: Node, node2: Node, weight = null) {
    this.adjacencyList[node1.value].push(node2);
    this.adjacencyList[node2.value].push(node1);

    this.printEdges();
  }

  // 노드 삭제
  deleteNode(node: Node) {
    // 해당 노드 삭제
    this.nodes = this.nodes.filter((n) => n.value !== node.value);

    // 인접리스트에서 삭제
    delete this.adjacencyList[node.value];
    Object.keys(this.adjacencyList).forEach((key) => {
      this.adjacencyList[key] = this.adjacencyList[key].filter(
        (n: Node) => n.value !== node.value
      );
    });

    this.printNodes();
  }

  // 엣지 삭제
  deleteEdge(node1: Node, node2: Node) {
    this.adjacencyList[node1.value] = this.adjacencyList[node1.value].filter(
      (n: Node) => n.value !== node2.value
    );
    this.adjacencyList[node2.value] = this.adjacencyList[node2.value].filter(
      (n: Node) => n.value !== node1.value
    );

    this.printEdges();
  }

  // 그래프 순회
  bfs(startNode: Node) {}
  dfs(startNode: Node) {}

  private printNodes() {
    console.log(this.nodes);
  }

  private printEdges() {
    console.log(this.adjacencyList);
  }
}

const graph = new Graph();

// 트리

class Tree {
  root?: TNode;

  // 노드 탐색
  findNode(value: number, targetNode?: TNode): TNode | undefined {
    // 루트 노드가 없을 경우 undefined 반환
    const rootNode = targetNode ?? this.root;

    if (!rootNode) return undefined;

    // 현재 노드의 값과 찾고자 하는 값이 일치할 경우 현재 노드 반환
    if (value === rootNode.value) return rootNode;

    // 현재 노드의 자식 노드들을 순회하며 재귀적으로 탐색
    for (const child of rootNode.children) {
      const result = this.findNode(value, child);
      if (result) return result;
    }
    return undefined;
  }

  // 노드 추가
  addNode(value: number, parentValue?: number) {
    const newNode = new TNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    const parent = parentValue ? this.findNode(parentValue) : null;

    if (parent) {
      parent.children.push(newNode);
      newNode.parent = parent;
    } else {
      console.log('404');
    }
  }

  // 노드 삭제
  deleteNode(value: number) {
    const deleteNode = this.findNode(value);

    if (!deleteNode) {
      console.log('404');
      return;
    }

    if (deleteNode === this.root) {
      this.root = undefined;
      return;
    }

    const parent = deleteNode.parent ?? undefined;
    if (parent) {
      parent.children = parent.children.filter((child) => child !== deleteNode);
    }
    deleteNode.children = [];
  }

  getParentNode() {}
  getLeafNode() {}
  preOrder() {}
  inOrder() {}
  postOrder() {}
  levelOrder() {}
}

const tree = new Tree();

// 해시테이블
class HashTable<K, V> {
  private table: Map<K, V>[];

  constructor(private size: number) {
    this.table = new Array(size).map(() => new Map<K, V>());
  }

  private hash(key: K): number {
    let hashValue = 0;

    if (typeof key === 'string') {
      for (let i = 0; i < key.length; i++) {
        hashValue += key.charCodeAt(i);
      }
    } else if (typeof key === 'number') {
      hashValue = key;
    }

    return hashValue % this.size;
  }

  push(key: K, value: V): void {
    const index = this.hash(key);
    this.table[index].set(key, value);
  }

  get(key: K): V | undefined {
    const index = this.hash(key);

    return this.table[index].get(key);
  }

  remove(key: K): void {
    const index = this.hash(key);
    this.table[index].delete(key);
  }
}

// 이진탐색 트리가 균형을 안 이룰 때는 O(n)의 시간이 걸린다.
// 이진탐색 트리가 균형을 이룰때는 아래처럼 기하 급수 형태로 증가한다.
// 1레벨 : 노드 1개
// 2레벨 : 노드 2개
// 3레벨 : 노드 4개
// 3레벨 : 노드 8개
// N레벨 : 노드 2의 n승개
// 따라서 N레벨일 경우 2의 n승 만큼의 높이를 가지게 되기 때문에 이를 시간복잡도로 변환하면 O(logN)이 된다.

class BinaryTree {
  root?: BTNode;

  // 노드 추가
  addNode(value: number) {
    const newNode = new BTNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let targetNode = this.root;

    while (targetNode) {
      if (value < targetNode.value) {
        if (!targetNode.left) {
          targetNode.left = newNode;
          return;
        }
        targetNode = targetNode.left;
      } else {
        if (!targetNode.right) {
          targetNode.right = newNode;
          return;
        }
        targetNode = targetNode.right;
      }
    }
  }

  // 노드 찾기
  findNode(value: number, node?: BTNode) {
    if (!node) return undefined;

    if (value === node.value) return node;

    if (value < node.value) {
      return this.findNode(value, node.left);
    } else {
      return this.findNode(value, node.right);
    }
  }

  // 노드 삭제
  deleteNode(value: number, node?: BTNode) {
    if (!node) return undefined;

    if (value < node.value) {
      node.left = this.deleteNode(value, node.left);
      return node;
    } else if (value > node.value) {
      node.right = this.deleteNode(value, node.right);
      return node;
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
    }
  }

  // 최소값 찾기
  findMin(): BTNode | undefined {
    let node = this.root;
    if (!node) return;

    while (node.left) {
      node = node.left;
    }

    console.log(`${node.value} is MIN`);
    return node;
  }

  // 최대값 찾기
  findMax(): BTNode | undefined {
    let node = this.root;
    if (!node) return;

    while (node.right) {
      node = node.right;
    }

    console.log(`${node.value} is MAX`);
    return node;
  }

  // 전위 순회
  preOrder(node?: BTNode) {
    if (!node) return;

    console.log(node.value);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  // 중위 순회
  inOrder(node?: BTNode) {
    if (!node) return;

    this.inOrder(node.left);
    console.log(node.value);
    this.inOrder(node.right);
  }

  // 후위 순회
  postOrder(node?: BTNode) {
    if (!node) return;

    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.value);
  }

  // 부모노드 탐색
  getParentNode(value: number): BTNode | undefined {
    const targetNode = this.findNode(value);

    if (!targetNode || targetNode.parent) {
      return undefined;
    }

    return targetNode.parent;
  }

  // 리프노드 탐색
  getLeafNode(value: number): BTNode[] | undefined {
    const targetNode = this.findNode(value);

    if (!targetNode) return;

    const leafNode: BTNode[] = [];

    const findLeaves = (node: BTNode | undefined) => {
      if (!node) return;
      if (!node.left && !node.right) {
        leafNode.push(node); // 왼쪽, 오른쪽 자식노드가 없으면 리프노드이므로 push
      } else {
        findLeaves(node.left);
        findLeaves(node.right);
      }
    };

    findLeaves(targetNode);

    return leafNode;
  }
}

const binaryTree = new BinaryTree();
binaryTree.addNode(4);
binaryTree.addNode(5);
binaryTree.addNode(7);
binaryTree.addNode(2);
binaryTree.addNode(3);
binaryTree.addNode(1);
binaryTree.findMax();
console.log(binaryTree.root);
