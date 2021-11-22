import { BinarySearchTree } from './BinarySearchTree';
import { COMPARATOR_RESULT } from './Comparator';

describe('BinarySearchTree', () => {
  describe('with integers', () => {
    let bst: BinarySearchTree<number>;

    beforeEach(() => {
      bst = new BinarySearchTree();
    });

    describe('insert', () => {
      it('should insert at root', () => {
        bst.insert(1);
        expect(bst.root?.data).toEqual(1);
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.left).toBeUndefined();
      });

      it('should insert leaves', () => {
        bst.insert(2);
        bst.insert(3);
        bst.insert(1);
        expect(bst.root?.data).toEqual(2);
        expect(bst.root?.left?.data).toEqual(1);
        expect(bst.root?.left?.left).toBeUndefined();
        expect(bst.root?.left?.right).toBeUndefined();
        expect(bst.root?.right?.data).toEqual(3);
        expect(bst.root?.right?.left).toBeUndefined();
        expect(bst.root?.right?.right).toBeUndefined();
      });

      it('should insert beyond one depth', () => {
        bst.insert(1);
        bst.insert(2);
        bst.insert(3);
        expect(bst.root?.data).toEqual(1);
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.right?.data).toEqual(2);
        expect(bst.root?.right?.left).toBeUndefined();
        expect(bst.root?.right?.right?.data).toEqual(3);
        expect(bst.root?.right?.right?.left).toBeUndefined();
        expect(bst.root?.right?.right?.right).toBeUndefined();
      });

      it('should ignore duplicates', () => {
        bst.insert(1);
        bst.insert(2);
        bst.insert(2);
        expect(bst.root?.data).toEqual(1);
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.right?.data).toEqual(2);
        expect(bst.root?.right?.left).toBeUndefined();
        expect(bst.root?.right?.right).toBeUndefined();
      });

      it('should insert in bulk', () => {
        bst.bulkInsert([1, 2, 3]);
        expect(bst.root?.data).toEqual(1);
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.right?.data).toEqual(2);
        expect(bst.root?.right?.left).toBeUndefined();
        expect(bst.root?.right?.right?.data).toEqual(3);
        expect(bst.root?.right?.right?.left).toBeUndefined();
        expect(bst.root?.right?.right?.right).toBeUndefined();
      });
    });

    describe('search', () => {
      it('should find data in the tree', () => {
        const bulkData = [3, 5, 2, 4, 1, 9, 7, 6, 0, 8];
        bst.bulkInsert(bulkData);
        bulkData.forEach((data) => {
          expect(bst.search(data)).toBeTruthy();
        });
      });

      it('should not find data not in the tree', () => {
        const bulkData = [3, 5, 2, 4, 1, 9, 7, 6, 0, 8];
        bst.bulkInsert(bulkData);
        expect(bst.search(-1)).toBeFalsy();
        expect(bst.search(11)).toBeFalsy();
      });
    });

    describe('remove', () => {
      it('should remove without children', () => {
        bst.insert(1);
        bst.remove(1);
        expect(bst.root).toBeUndefined();
      });

      it('should remove with only a left', () => {
        bst.bulkInsert([2, 1]);
        bst.remove(2);
        expect(bst.root?.data).toEqual(1);
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.right).toBeUndefined();
      });

      it('should remove with only a right', () => {
        bst.bulkInsert([1, 2]);
        bst.remove(1);
        expect(bst.root?.data).toEqual(2);
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.right).toBeUndefined();
      });

      it('should remove with both children', () => {
        bst.bulkInsert([2, 1, 3]);
        bst.remove(2);
        expect(bst.root?.data).toEqual(3);
        expect(bst.root?.left?.data).toEqual(1);
        expect(bst.root?.right).toBeUndefined();
        expect(bst.root?.left?.left).toBeUndefined();
        expect(bst.root?.left?.right).toBeUndefined();
      });

      it('should remove with a parent and children', () => {
        bst.bulkInsert([4, 2, 1, 3]);
        bst.remove(2);
        expect(bst.root?.data).toEqual(4);
        expect(bst.root?.left?.data).toEqual(3);
        expect(bst.root?.right).toBeUndefined();
        expect(bst.root?.left?.left?.data).toEqual(1);
        expect(bst.root?.left?.right).toBeUndefined();
        expect(bst.root?.left?.left?.left).toBeUndefined();
        expect(bst.root?.left?.left?.right).toBeUndefined();
      });
    });

    describe('findAllAtMaxDepth', () => {
      it('should pass the given test case', () => {
        bst.bulkInsert([12, 11, 90, 82, 7, 9]);
        const { deepest, depth } = bst.findAllAtMaxDepth();
        expect(deepest).toEqual([9]);
        expect(depth).toEqual(3);
      });

      it('should handle having multiple leaves at the deepest depth', () => {
        bst.bulkInsert([7, 4, 11, 2, 6, 9, 12, 1, 3, 5, 8, 10]);
        const { deepest, depth } = bst.findAllAtMaxDepth();
        expect(deepest).toEqual([1, 3, 5, 8, 10]);
        expect(depth).toEqual(3);
      });
    });
  });

  describe('with custom comparator', () => {
    let bst: BinarySearchTree<string>;

    function compareStringsInReverse(a: string, b: string): COMPARATOR_RESULT {
      if (a === b) {
        return COMPARATOR_RESULT.EQUAL;
      }

      return a > b ? COMPARATOR_RESULT.LESSER : COMPARATOR_RESULT.GREATER;
    }

    beforeEach(() => {
      bst = new BinarySearchTree(compareStringsInReverse);
    });

    describe('insert', () => {
      it('should insert at root', () => {
        bst.insert('a');
        expect(bst.root?.data).toEqual('a');
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.left).toBeUndefined();
      });

      it('should insert leaves', () => {
        bst.insert('b');
        bst.insert('c');
        bst.insert('a');
        expect(bst.root?.data).toEqual('b');
        expect(bst.root?.left?.data).toEqual('c');
        expect(bst.root?.left?.left).toBeUndefined();
        expect(bst.root?.left?.right).toBeUndefined();
        expect(bst.root?.right?.data).toEqual('a');
        expect(bst.root?.right?.left).toBeUndefined();
        expect(bst.root?.right?.right).toBeUndefined();
      });

      it('should insert beyond one depth', () => {
        bst.insert('a');
        bst.insert('b');
        bst.insert('c');
        expect(bst.root?.data).toEqual('a');
        expect(bst.root?.left?.data).toEqual('b');
        expect(bst.root?.right).toBeUndefined();
        expect(bst.root?.left?.left?.data).toEqual('c');
        expect(bst.root?.left?.right).toBeUndefined();
        expect(bst.root?.left?.left?.left).toBeUndefined();
        expect(bst.root?.left?.left?.right).toBeUndefined();
      });

      it('should ignore duplicates', () => {
        bst.insert('a');
        bst.insert('b');
        bst.insert('b');
        expect(bst.root?.data).toEqual('a');
        expect(bst.root?.left?.data).toEqual('b');
        expect(bst.root?.right).toBeUndefined();
        expect(bst.root?.left?.left).toBeUndefined();
        expect(bst.root?.left?.right).toBeUndefined();
      });

      it('should insert in bulk', () => {
        bst.bulkInsert(['a', 'b', 'c']);
        expect(bst.root?.data).toEqual('a');
        expect(bst.root?.left?.data).toEqual('b');
        expect(bst.root?.right).toBeUndefined();
        expect(bst.root?.left?.left?.data).toEqual('c');
        expect(bst.root?.left?.right).toBeUndefined();
        expect(bst.root?.left?.left?.left).toBeUndefined();
        expect(bst.root?.left?.left?.right).toBeUndefined();
      });
    });

    describe('search', () => {
      it('should find data in the tree', () => {
        const bulkData = ['d', 'f', 'c', 'e', 'b', 'j', 'h', 'g', 'a', 'i'];
        bst.bulkInsert(bulkData);
        bulkData.forEach((data) => {
          expect(bst.search(data)).toBeTruthy();
        });
      });

      it('should not find data not in the tree', () => {
        const bulkData = ['d', 'f', 'c', 'e', 'b', 'j', 'h', 'g', 'a', 'i'];
        bst.bulkInsert(bulkData);
        expect(bst.search('')).toBeFalsy();
        expect(bst.search('aa')).toBeFalsy();
        expect(bst.search('k')).toBeFalsy();
      });
    });

    describe('remove', () => {
      it('should remove without children', () => {
        bst.insert('a');
        bst.remove('a');
        expect(bst.root).toBeUndefined();
      });

      it('should remove with only a left', () => {
        bst.bulkInsert(['a', 'b']);
        bst.remove('a');
        expect(bst.root?.data).toEqual('b');
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.right).toBeUndefined();
      });

      it('should remove with only a right', () => {
        bst.bulkInsert(['b', 'a']);
        bst.remove('b');
        expect(bst.root?.data).toEqual('a');
        expect(bst.root?.left).toBeUndefined();
        expect(bst.root?.right).toBeUndefined();
      });

      it('should remove with both children', () => {
        bst.bulkInsert(['b', 'c', 'a']);
        bst.remove('b');
        expect(bst.root?.data).toEqual('a');
        expect(bst.root?.left?.data).toEqual('c');
        expect(bst.root?.right).toBeUndefined();
        expect(bst.root?.left?.left).toBeUndefined();
        expect(bst.root?.left?.right).toBeUndefined();
      });

      it('should remove with a parent and children', () => {
        bst.bulkInsert(['a', 'c', 'd', 'b']);
        bst.remove('c');
        expect(bst.root?.data).toEqual('a');
        expect(bst.root?.left?.data).toEqual('b');
        expect(bst.root?.right).toBeUndefined();
        expect(bst.root?.left?.left?.data).toEqual('d');
        expect(bst.root?.left?.right).toBeUndefined();
        expect(bst.root?.left?.left?.left).toBeUndefined();
        expect(bst.root?.left?.left?.right).toBeUndefined();
      });
    });

    describe('findAllAtMaxDepth', () => {
      it('should pass the given test case', () => {
        bst.bulkInsert(['c', 'd', 'a', 'b', 'f', 'e']);
        const { deepest, depth } = bst.findAllAtMaxDepth();
        expect(deepest).toEqual(['e']);
        expect(depth).toEqual(3);
      });

      it('should handle having multiple leaves at the deepest depth', () => {
        bst.bulkInsert(['f', 'i', 'b', 'k', 'g', 'd', 'a', 'l', 'j', 'h', 'e', 'c']);
        const { deepest, depth } = bst.findAllAtMaxDepth();
        expect(deepest).toEqual(['l', 'j', 'h', 'e', 'c']);
        expect(depth).toEqual(3);
      });
    });
  });
});
