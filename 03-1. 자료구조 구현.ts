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
  left: TNode | null;
  right: TNode | null;

  constructor(value: number) {
    super(value);

    this.left = null;
    this.right = null;
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
