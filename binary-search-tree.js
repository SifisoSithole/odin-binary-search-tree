const Node = require('./node');

/**
 * Represents a Binary Search Tree.
 */
class BinarySearchTree {
  head = null;

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

  /**
   * Finds a node with the specified value in the binary search tree.
   * @param {*} value - The value to search for.
   * @returns {Node|null} - The node with the specified value, or null if not found.
   */
  find(value) {
    let current = this.head;
    while (current !== null) {
      if (value === current.value) {
        return current;
      }
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  /**
   * Performs a level order traversal on the binary search tree and applies the
   * given callback function to each node.
   *
   * @param {function} callback - The callback function to be applied to each node.
   * @returns {void}
   */
  levelOrder(callback) {
    if (this.head === null) {
      return;
    }
    const queue = [this.head];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  /**
   * Performs an in-order traversal of the binary search tree and applies the given
   * callback function to each node.
   * @param {function} callback - The callback function to be applied to each node.
   * @param {TreeNode} [node=this.head] - The starting node for the traversal. Defaults
   * to the head node of the tree.
   */
  inOrder(callback, node = this.head) {
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  /**
   * Performs a pre-order traversal of the binary search tree, calling the specified
   * callback function on each node.
   * @param {function} callback - The callback function to be called on each node.
   * @param {TreeNode} [node=this.head] - The starting node for the traversal. Defaults to
   * the head node of the tree.
   */
  preOrder(callback, node = this.head) {
    if (node === null) {
      return;
    }
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  /**
   * Performs a post-order traversal of the binary search tree and applies the given
   * callback function to each node.
   * @param {function} callback - The callback function to be applied to each node.
   * @param {TreeNode} [node=this.head] - The starting node for the traversal. Defaults
   * to the head node of the tree.
   */
  postOrder(callback, node = this.head) {
    if (node === null) {
      return;
    }
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  /**
   * Calculates the height of the binary search tree starting from the given node.
   * @param {Node} node - The starting node. If not provided, the head node is used.
   * @returns {number} - The height of the binary search tree.
   */
  height(node = this.head) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  /**
   * Calculates the depth of a node in the binary search tree.
   * @param {Node} node - The node to calculate the depth for.
   * @param {Node} parent - The parent node to start the search from. Defaults to the head node.
   * @param {number} depth - The current depth of the search. Defaults to 0.
   * @returns {number} - The depth of the node. Returns -1 if the node is not found.
   */
  depth(node, parent = this.head, depth = 0) {
    if (parent === null) {
      return -1;
    }
    if (node === parent) {
      return depth;
    }
    return this.depth(node, parent.left, depth + 1) || this.depth(node, parent.right, depth + 1);
  }

  /**
   * Checks if the binary search tree is balanced.
   * @returns {boolean} - True if the tree is balanced, false otherwise.
   */
  isBalanced() {
    if (this.head === null) {
      return true;
    }
    const leftHeight = this.height(this.head.left);
    const rightHeight = this.height(this.head.right);
    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  /**
   * Rebalances the binary search tree if it is not balanced.
   * It collects the values of all nodes in an in-order traversal,
   * then rebuilds the tree using the collected values.
   */
  rebalance() {
    if (!this.isBalanced()) {
      const nodes = [];
      this.inOrder((node) => {
        nodes.push(node.value);
      });
      this.buildTree(nodes);
    }
  }
}

module.exports = BinarySearchTree;
