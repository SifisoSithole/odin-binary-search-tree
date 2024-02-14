/**
 * Represents a node in a binary tree.
 */
class Node {
  /**
   * Creates a new Node with the given value.
   * @param {*} value - The value to be stored in the node.
   */
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

module.exports = Node;
