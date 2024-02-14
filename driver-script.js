/* eslint-disable no-console */
// Import the BinarySearchTree class from the implementation file
const BinarySearchTree = require('./binary-search-tree');

// Create a new instance of BinarySearchTree
const tree = new BinarySearchTree();

// Generate an array of 100 random integers
const arr = [];
for (let i = 0; i < 100; i += 1) {
  arr.push(Math.floor(Math.random() * 1000));
}

// Build the tree using the generated array
tree.buildTree(arr);

// Print whether the tree is balanced or not
console.log('Is the tree balanced?', tree.isBalanced());

// Print the tree in a readable format
tree.prettyPrint();

// Print the values of the nodes using in-order traversal
console.log('In-order traversal:');
tree.inOrder((node) => console.log(node.value));

// Print the values of the nodes using pre-order traversal
console.log('Pre-order traversal:');
tree.preOrder((node) => console.log(node.value));

// Print the values of the nodes using post-order traversal
console.log('Post-order traversal:');
tree.postOrder((node) => console.log(node.value));

// Insert 100 random integers into the tree
for (let i = 0; i < 100; i += 1) {
  tree.insert(Math.floor(Math.random() * 50000));
}

// Print whether the tree is balanced or not after insertion
console.log('Is the tree balanced after insertion?', tree.isBalanced());

// Print the tree in a readable format after insertion
tree.prettyPrint();

// Rebalance the tree
tree.rebalance();

// Print whether the tree is balanced or not after rebalancing
console.log('Is the tree balanced after rebalancing?', tree.isBalanced());

// Print the tree in a readable format after rebalancing
tree.prettyPrint();
