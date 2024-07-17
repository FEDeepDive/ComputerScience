// 최대 힙 구현

/** 배열
 * 완전이진트리를 배열로 나타낼 때, 인덱스를 통해
 * 부모/자식에 접근할 수 있는 특징을 이용하여 힙을 구현
 */
class MaxHeapWithArray {
  constructor(heap = []) {
    this.heap = [null, ...heap]; // root index = 1
  }

  add(key) {
    this.heap.push(key);

    let child = this.heap.length; // push한 노드의 index
    let parent = Math.floor(child / 2);
    while (parent !== 0 && this.heap[child] > this.heap[parent]) {
      [this.heap[child], this.heap[parent]] = [
        this.heap[parent],
        this.heap[child],
      ];
      child = parent;
      parent = Math.floor(child / 2);
    }
  }

  remove() {
    if (this.heap.length === 1) return null;

    const root = this.heap[1];
    const target = this.heap.pop();
    let idx = 1; // current target index
    this.heap[idx] = target;

    // heap 조건을 만족하지 않는 경우, 자식 노드 중 더 큰 값과 스왑
    while (target < this.heap[2 * idx] || target < this.heap[2 * idx + 1]) {
      const maxChildIdx =
        this.heap[2 * idx] > this.heap[2 * idx + 1] ? 2 * idx : 2 * idx + 1;
      this.heap[idx] = this.heap[maxChildIdx];
      this.heap[maxChildIdx] = target;
      idx = maxChildIdx;
    }
    return root;
  }
}

const heap = new MaxHeapWithArray([9, 7, 6, 4, 5, 3, 2, 2, 1, 3]);
heap.remove();
console.log(heap.heap);
