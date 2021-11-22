import { Comparator, naiveComparator, COMPARATOR_RESULT } from './Comparator';

export class Node<T> {
  left?: Node<T>;
  right?: Node<T>;

  constructor (public data: T) {};
}

export type DeepestAndDepth<T> = { deepest: T[], depth: number };

export class BinarySearchTree<T> {
  constructor (private compare: Comparator<T> = naiveComparator) {}

  public root?: Node<T>;

  public bulkInsert(bulkData: T[]) {
    bulkData.forEach((data) => this.insert(data));
  }

  public insert(data: T) {
    this.root = this._insert(data, this.root);
  }

  private _insert(data: T, current?: Node<T>): Node<T> {
    if (!current) {
      return new Node<T>(data);
    }

    switch (this.compare(data, current.data)) {
      case COMPARATOR_RESULT.LESSER:
        current.left = this._insert(data, current.left);
        break;
      case COMPARATOR_RESULT.GREATER:
        current.right = this._insert(data, current.right);
        break;
      case COMPARATOR_RESULT.EQUAL:
        break;
    }

    return current;
  }

  public search(data: T): boolean {
    return this._search(data, this.root);
  }

  private _search(data: T, current?: Node<T>): boolean {
    if (!current) {
      return false;
    }

    switch (this.compare(data, current.data)) {
      case COMPARATOR_RESULT.LESSER:
        return this._search(data, current.left);
      case COMPARATOR_RESULT.GREATER:
        return this._search(data, current.right);
      case COMPARATOR_RESULT.EQUAL:
        return true;
    }
  }

  private findSmallestNode(current: Node<T>): Node<T> {
    if (!current.left) {
      return current;
    }

    return this.findSmallestNode(current.left);
  }

  public remove(data: T) {
    this.root = this._remove(data, this.root);
  }

  private _remove(data: T, current?: Node<T>): Node<T> | undefined {
    if (!current) {
      return current;
    }

    switch (this.compare(data, current.data)) {
      case COMPARATOR_RESULT.LESSER:
        current.left =  this._remove(data, current.left);
        return current;
      case COMPARATOR_RESULT.GREATER:
        current.right = this._remove(data, current.right);
        return current;
      case COMPARATOR_RESULT.EQUAL:
        let replacement: Node<T> | undefined;

        if (current.left && current.right) {
          replacement = this.findSmallestNode(current.right);
          replacement.left = current.left;
        } else if (current.left) {
          replacement = current.left;
        } else if (current.right) {
          replacement = current.right;
        } else {
          replacement = undefined;
        }

        return replacement;
    }
  }

  public findAllAtMaxDepth(): DeepestAndDepth<T> {
    if (!this.root) {
      return { deepest: [], depth: 0 };
    }

    return this._findAllAtMaxDepth(0, this.root);
  }

  private _findAllAtMaxDepth(depth: number, current: Node<T>): DeepestAndDepth<T> {
    if (!current?.left && !current?.right) {
      return { deepest: [current.data], depth };
    }

    const leftSide = current.left
      ? this._findAllAtMaxDepth(depth + 1, current.left)
      : { deepest: [], depth: 0 };

    const rightSide = current.right
      ? this._findAllAtMaxDepth(depth + 1, current.right)
      : { deepest: [], depth: 0 };

    if (leftSide.depth === rightSide.depth) {
      return { deepest: leftSide.deepest.concat(rightSide.deepest), depth: leftSide.depth };
    }

    return (leftSide.depth < rightSide.depth)
      ? rightSide
      : leftSide;
  }
}
