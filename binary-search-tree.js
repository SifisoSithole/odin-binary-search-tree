const Node = require('./node');

/**
 * Represents a Binary Search Tree.
 */
class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  /**
   * Prints the binary search tree in a pretty format.
   *
   * @param {TreeNode} node - The current node being printed.
   * @param {string} prefix - The prefix string for indentation.
   * @param {boolean} isLeft - Indicates if the current node is the left child of its parent.
   * @returns {void}
   */
  prettyPrint(node = this.head, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    // eslint-disable-next-line no-console
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  /**
   * Creates a binary search tree from an array.
   * @param {Array} array - The array to create the binary search tree from.
   * @returns {Node} - The root node of the binary search tree.
   * @throws {Error} - If the input is not an array.
   */
  createBST(array) {
    if (!Array.isArray(array)) throw new Error('Works only with arrays');
    if (array.length === 0) return null;
    if (array.length === 1) {
      return new Node(array[0]);
    }
    const middle = Math.floor(array.length / 2);
    const root = new Node(array[middle]);
    root.left = this.createBST(array.slice(0, middle));
    root.right = this.createBST(array.slice(middle + 1));
    return root;
  }

  /**
   * Builds a binary search tree from an array.
   *
   * @param {Array} array - The array to build the binary search tree from.
   * @returns {Node} - The root node of the binary search tree.
   * @throws {Error} - If the input is not an array.
   */
  buildTree(array) {
    if (!Array.isArray(array)) throw new Error('Works only with arrays');
    if (array.length === 0) return null;
    array.sort((a, b) => a - b);
    // eslint-disable-next-line max-len
    const filteredArray = array.filter((item, index, inputArray) => inputArray.indexOf(item) === index);
    const middle = Math.floor(filteredArray.length / 2);
    this.head = new Node(filteredArray[middle]);
    this.head.left = this.createBST(filteredArray.slice(0, middle));
    this.head.right = this.createBST(filteredArray.slice(middle + 1));
    return this.head;
  }

  /**
   * Inserts a new node with the given value into the binary search tree.
   * If the value already exists in the tree, it will not be inserted.
   *
   * @param {any} value - The value to be inserted into the tree.
   * @returns {void}
   */
  insert(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }
    let current = this.head;
    while (current !== null) {
      if (value === current.value) {
        return;
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      }
    }
  }

  /**
   * Deletes a node with the specified value from the binary search tree.
   * If the node is found, it is removed from the tree.
   * If the node has no children, it is simply removed.
   * If the node has one child, the child takes its place.
   * If the node has two children, the minimum value from the right subtree
   * is used to replace the node.
   *
   * @param {any} value - The value of the node to be deleted.
   * @returns {void}
   */
  delete(value) {
    if (this.head === null) {
      return;
    }
    let current = this.head;
    let parent = null;
    while (current !== null) {
      if (value === current.value) {
        if (current.left === null && current.right === null) {
          if (parent === null) {
            this.head = null;
            return;
          }
          if (parent.left === current) {
            parent.left = null;
            return;
          }
          parent.right = null;
          return;
        }
        if (current.left === null) {
          if (parent === null) {
            this.head = current.right;
            return;
          }
          if (parent.left === current) {
            parent.left = current.right;
            return;
          }
          parent.right = current.right;
          return;
        }
        if (current.right === null) {
          if (parent === null) {
            this.head = current.left;
            return;
          }
          if (parent.left === current) {
            parent.left = current.left;
            return;
          }
          parent.right = current.left;
          return;
        }
        let rightMin = current.right;
        while (rightMin.left !== null) {
          rightMin = rightMin.left;
        }
        const temp = rightMin.value;
        this.delete(rightMin.value);
        current.value = temp;
        return;
      }
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }
}

const b = new BinarySearchTree();
const head = b.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
b.prettyPrint(head);
b.insert(25);
b.prettyPrint(head);
b.delete(7);
b.prettyPrint(head);
module.export = BinarySearchTree;
