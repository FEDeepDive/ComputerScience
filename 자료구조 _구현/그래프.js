/* 단방향 그래프 구현 */

/** 인접 행렬
 * 간선 유무 파악이 빠름: O(1)
 * V*V 만큼의 공간을 차지
 * 순회가 느림: O(V*V)
 * */
class GraphWithAdjacencyMatrix {
  constructor(V) {
    this.V = V;
    this.graph = Array.from({ length: V }).map(() =>
      Array.from({ length: V }).fill(false),
    );
  }

  addVertex() {
    this.graph.map((row) => row.push(false));
    const newRow = Array.from({ length: this.V + 1 }).fill(false);
    this.graph.push(newRow);
    this.V += 1;
  }

  addEdge(v1, v2) {
    this.graph[v1][v2] = true;
  }

  removeEdge(v1, v2) {
    this.graph[v1][v2] = false;
  }

  hasEdge(v1, v2) {
    return this.graph[v1][v2];
  }
}

/** 인접 리스트
 * 간선 수만큼의 공간만 차지
 * 순회가 빠름: O(E)
 * 간선 유무 파악이 느림 (O(V))
 * */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addNode(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      return node;
    }

    this.tail.next = node;
    this.tail = node;
    return node;
  }

  removeNode(data) {
    let currentNode = this.head;
    let prevNode = this.head;

    while (currentNode && currentNode.data !== data) {
      currentNode = currentNode.next;
      prevNode = currentNode;
    }

    if (!currentNode) return undefined;

    prevNode.next = currentNode.next;
    return currentNode;
  }

  hasNode(data) {
    let currentNode = this.head;

    while (currentNode && currentNode.data !== data) {
      currentNode = currentNode.next;
    }

    return Boolean(currentNode);
  }
}

class GraphWithAdjacencyList {
  constructor(V) {
    this.V = V;
    this.graph = Array.from({ length: V }).map(() => new List());
  }

  addVertex() {
    this.graph.push(new List());
  }

  addEdge(v1, v2) {
    this.graph[v1].addNode(v2);
  }

  removeEdge(v1, v2) {
    this.graph[v1].removeNode(v2);
  }

  hasEdge(v1, v2) {
    return this.graph[v1].hasNode(v2);
  }
}

/** Set과 HashTable
 * 간선 수만큼의 공간만 차지
 * 순회가 빠름: O(E)
 * 간선 유무 파악이 빠름: O(1)
 */
class GraphWithSetAndHash {
  constructor(V) {
    this.V = V;
    this.graph = { ...Array.from({ length: V }).map(() => new Set()) };
  }

  addVertex(v) {
    this.graph[v] = new Set();
  }

  addEdge(v1, v2) {
    this.graph[v1].add(v2);
  }

  removeEdge(v1, v2) {
    this.graph[v1].remove(v2);
  }

  hasEdge(v1, v2) {
    return this.graph[v1].has(v2);
  }
}
