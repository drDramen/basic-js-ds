const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    const node = new Node(data);

    if (!this.node) {
      this.node = node;
    } else {
      let crntNode = this.node;

      while (crntNode) {
        if (node.data < crntNode.data) {
          if (!crntNode.left) {
            crntNode.left = node;
            break;
          }
          crntNode = crntNode.left;
        } else {
          if (!crntNode.right) {
            crntNode.right = node;
            break;
          }
          crntNode = crntNode.right;
        }
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let crntNode = this.node;

    while (crntNode) {
      if (data < crntNode.data) {
        crntNode = crntNode.left;
      } else if (data > crntNode.data) {
        crntNode = crntNode.right;
      } else {
        return crntNode;
      }
    }

    return null;
  }

  remove(data) {
    this.node = removeData(this.node, data);

    function removeData(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeData(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.node) return null;

    let node = this.node;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.node) return null;

    let node = this.node;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}


module.exports = {
  BinarySearchTree
};
