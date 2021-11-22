# veritone-bst
Setup:
```
npm i
npm run test
```
Example usage:
```TypeScript
import { BinarySearchTree } from 'veritone-bst';

const bst = new BinarySearchTree();
bst.bulkInsert([12, 11, 90, 82, 7, 9]);
const { deepest, depth } = bst.findAllAtMaxDepth();
console.log(`deepest, ${deepest}; depth, ${depth}`);
```
Result:
```
deepest, 9; depth, 3
```
