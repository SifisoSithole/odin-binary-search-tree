# Binary Search Tree

This is a JavaScript implementation of a Binary Search Tree.

## Usage

```javascript
const Node = require('./node');
const BinarySearchTree = require('./binarySearchTree');

// Create a new instance of BinarySearchTree
const bst = new BinarySearchTree();

// Insert values into the binary search tree
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(1);
bst.insert(4);
bst.insert(6);
bst.insert(8);

// Print the binary search tree in a pretty format
bst.prettyPrint();

// Find a specific value in the binary search tree
const node = bst.find(3);
console.log("Found node:", node);

// Delete a node from the binary search tree
bst.delete(7);

// Perform different types of traversals on the binary search tree
bst.inOrder((node) => console.log(node.value)); // In-order traversal
bst.preOrder((node) => console.log(node.value)); // Pre-order traversal
bst.postOrder((node) => console.log(node.value)); // Post-order traversal
bst.levelOrder((node) => console.log(node.value)); // Level-order traversal

// Check if the binary search tree is balanced
const isBalanced = bst.isBalanced();
console.log("Is balanced:", isBalanced);

// Rebalance the binary search tree if it is not balanced
bst.rebalance();
```

## API

### BinarySearchTree

Represents a Binary Search Tree.

#### `constructor()`

Creates a new instance of BinarySearchTree.

#### `prettyPrint(node = this.head, prefix = '', isLeft = true)`

Prints the binary search tree in a pretty format.

- `node`: The current node being printed.
- `prefix`: The prefix string for indentation.
- `isLeft`: Indicates if the current node is the left child of its parent.

#### `createBST(array)`

Creates a binary search tree from an array.

- `array`: The array to create the binary search tree from.

#### `buildTree(array)`

Builds a binary search tree from an array.

- `array`: The array to build the binary search tree from.

#### `insert(value)`

Inserts a new node with the given value into the binary search tree.

- `value`: The value to be inserted into the tree.

#### `delete(value)`

Deletes a node with the specified value from the binary search tree.

- `value`: The value of the node to be deleted.

#### `find(value)`

Finds a node with the specified value in the binary search tree.

- `value`: The value to search for.

#### `levelOrder(callback)`

Performs a level order traversal on the binary search tree and applies the given callback function to each node.

- `callback`: The callback function to be applied to each node.

#### `inOrder(callback, node = this.head)`

Performs an in-order traversal of the binary search tree and applies the given callback function to each node.

- `callback`: The callback function to be applied to each node.
- `node` (optional): The starting node for the traversal. Defaults to the head node of the tree.

#### `preOrder(callback, node = this.head)`

Performs a pre-order traversal of the binary search tree and applies the given callback function to each node.

- `callback`: The callback function to be applied to each node.
- `node` (optional): The starting node for the traversal. Defaults to the head node of the tree.

#### `postOrder(callback, node = this.head)`

Performs a post-order traversal of the binary search tree and applies the given callback function to each node.

- `callback`: The callback function to be applied to each node.
- `node` (optional): The starting node for the traversal. Defaults to the head node of the tree.

#### `height(node = this.head)`

Calculates the height of the binary search tree starting from the given node.

- `node` (optional): The starting node. If not provided, the head node is used.

#### `depth(node, parent = this.head, depth = 0)`

Calculates the depth of a node in the binary search tree.

- `node`: The node to calculate the depth for.
- `parent`: The parent node to start the search from. Defaults to the head node.
- `depth`: The current depth of the search. Defaults to 0.

#### `isBalanced()`

Checks if the binary search tree is balanced.

#### `rebalance()`

Rebalances the binary search tree if it is not balanced. It collects the values of all nodes in an in-order traversal, then rebuilds the tree using the collected values.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.