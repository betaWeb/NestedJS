// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({22:[function(require,module,exports) {
var config = {
    properties: {
        node_id: '__nodeid',
        node_id_prefix: 'node-',
        parent_id: '__parentid',
        root_id: '__rootid',
        prev_id: '__previd',
        next_id: '__nextid',
        depth: '__depth'
    }
};

module.exports = config;
},{}],23:[function(require,module,exports) {
var global = arguments[3];
var utils = {
    isBrowser: function isBrowser() {
        try {
            return window !== undefined && window.document !== undefined;
        } catch (e) {
            return false;
        }
    },
    isNode: function isNode() {
        try {
            return module !== undefined && module.exports !== undefined;
        } catch (e) {
            return false;
        }
    },
    retrieveContext: function retrieveContext() {
        var _context = null;
        if (utils.isBrowser()) _context = window;else if (utils.isNode()) _context = global;
        return _context;
    },
    getContext: function getContext(context_id) {
        if (utils.isBrowser() && window.__nestedjs) return window.__nestedjs[context_id] || null;
        if (utils.isNode() && global.__nestedjs) return global.__nestedjs[context_id] || null;
        return null;
    },
    setContext: function setContext(context) {
        var _context = utils.retrieveContext();
        if (_context === null || _context === undefined) throw new Error('NestedJS.setContext - no context found');
        if (!_context.__nestedjs) _context.__nestedjs = {};
        var uniqueid = Math.floor(utils.randomNum() * (+new Date() / 1000));
        _context.__nestedjs[uniqueid] = context;
        return uniqueid;
    },
    clearContext: function clearContext() {
        var _context = utils.retrieveContext();
        if (_context === null || _context === undefined) throw new Error('NestedJS.clearContext - no context found');
        _context.__nestedjs = {};
    },
    randomNum: function randomNum() {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;

        return Math.floor(Math.random() * length + start);
    }
};

module.exports = utils;
},{}],21:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./config'),
    properties = _require.properties;

var _require2 = require('./utils'),
    getContext = _require2.getContext;

var PRIVATE_PROPERTIES = [properties.node_id, properties.parent_id, properties.next_id, properties.prev_id, properties.depth];

var Node = function () {

    /**
     * @param {Object} node
     * @param {Nested|null} tree_uniqueid
     */
    function Node() {
        var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var tree_uniqueid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Node);

        this._properties = this._mapProperties(node);
        this._tree_uniqueid = tree_uniqueid;
    }

    /**
     * Return node properties
     * @returns {Object}
     */


    _createClass(Node, [{
        key: 'hasProperty',


        /**
         * Check if node property exists
         * @param {String} key
         * @returns {boolean}
         */
        value: function hasProperty(key) {
            return this._properties[key] !== undefined;
        }

        /**
         * Returns node property if exists, defaultValue otherwise
         * @param {String} key
         * @param {*} defaultValue
         * @returns {*}
         */

    }, {
        key: 'getProperty',
        value: function getProperty(key) {
            var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this._properties[key] || defaultValue;
        }

        /**
         * Set node property
         * @param {String} key
         * @param {*} value
         */

    }, {
        key: 'setProperty',
        value: function setProperty(key, value) {
            this._properties[key] = value;
        }

        /**
         * Returns node unique id
         * @returns {String}
         */

    }, {
        key: 'getId',
        value: function getId() {
            return this.getProperty(properties.node_id);
        }

        /**
         * Returns node parent unique id
         * @returns {String|null}
         */

    }, {
        key: 'getParentId',
        value: function getParentId() {
            return this.getProperty(properties.parent_id);
        }

        /**
         * Returns previous node unique id
         * @returns {String|null}
         */

    }, {
        key: 'getPreviousId',
        value: function getPreviousId() {
            return this.getProperty(properties.prev_id);
        }

        /**
         * Returns next node unique id
         * @returns {String|null}
         */

    }, {
        key: 'getNextId',
        value: function getNextId() {
            return this.getProperty(properties.next_id);
        }

        /**
         * Returns root node unique id
         * @returns {String|null}
         */

    }, {
        key: 'getRootId',
        value: function getRootId() {
            return this.getProperty(properties.root_id);
        }

        /**
         * Returns an array of child nodes
         * @returns {Node[]}
         */

    }, {
        key: 'childNodes',
        value: function childNodes() {
            return this.getProperty(this.getTree().options.children_key, []);
        }

        /**
         * Returns an array of previous nodes if exists, null otherwise
         * @returns {Node[]|null}
         */

    }, {
        key: 'previousNodes',
        value: function previousNodes() {
            var instance = this.getTree();
            return instance !== null ? instance.getPreviousNodes(this) : null;
        }

        /**
         * Returns previous node if exists, null otherwise
         * @returns {Node|null}
         */

    }, {
        key: 'previousNode',
        value: function previousNode() {
            var instance = this.getTree();
            return instance !== null ? instance.getPreviousNode(this) : null;
        }

        /**
         * Returns an array of next nodes if exists, null otherwise
         * @returns {Node[]|null}
         */

    }, {
        key: 'nextNodes',
        value: function nextNodes() {
            var instance = this.getTree();
            return instance !== null ? instance.getNextNodes(this) : null;
        }

        /**
         * Returns next node if exists, null otherwise
         * @returns {Node|null}
         */

    }, {
        key: 'nextNode',
        value: function nextNode() {
            var instance = this.getTree();
            return instance !== null ? instance.getNextNode(this) : null;
        }

        /**
         * Returns parent node if exists, null otherwise
         * @returns {Node|null}
         */

    }, {
        key: 'parentNode',
        value: function parentNode() {
            var instance = this.getTree();
            return instance !== null ? instance.getParentNode(this) : null;
        }

        /**
         * Returns parent node if exists, null otherwise
         * @returns {Node|null}
         */

    }, {
        key: 'rootNode',
        value: function rootNode() {
            var instance = this.getTree();
            return instance !== null ? instance.getRootNode(this) : null;
        }

        /**
         * Returns an array of siblings nodes if exists, null otherwise
         * @returns {Node[]|null}
         */

    }, {
        key: 'siblingsNodes',
        value: function siblingsNodes() {
            var instance = this.getTree();
            return instance !== null ? instance.getSiblingsNodes(this) : null;
        }

        /**
         * Returns Nested instance
         * @returns {Nested|null}
         */

    }, {
        key: 'getTree',
        value: function getTree() {
            return getContext(this._tree_uniqueid);
        }

        /**
         * Returns current node breadcrumb
         * @returns {Node[]|Array}
         */

    }, {
        key: 'breadcrumb',
        value: function breadcrumb() {
            var instance = this.getTree();
            if (instance !== null) return instance.getBreadcrumb(this).reverse();
            return [];
        }

        /**
         * Returns node first child if exists, null otherwise
         * @returns {Node|null}
         */

    }, {
        key: 'firstChild',
        value: function firstChild() {
            if (!this.hasChildNodes()) return null;
            var children = this.childNodes();
            return children && children.length ? children[0] : null;
        }

        /**
         * Returns node last child if exists, null otherwise
         * @returns {Node|null}
         */

    }, {
        key: 'lastChild',
        value: function lastChild() {
            if (!this.hasChildNodes()) return null;
            var children = this.childNodes();
            return children && children.length ? children[children.length - 1] : null;
        }

        /**
         * Returns node child by index if exists, null otherwise
         * @returns {Node|null}
         */

    }, {
        key: 'nthChild',
        value: function nthChild(index) {
            if (!this.hasChildNodes()) return null;
            var children = this.childNodes();
            return children && children.length ? children[index] : null;
        }

        /**
         * Count node childs
         * @returns {Number}
         */

    }, {
        key: 'countChildren',
        value: function countChildren() {
            if (!this.hasChildNodes()) return 0;
            return this.childNodes().length;
        }

        /**
         * @returns {Boolean}
         */

    }, {
        key: 'hasChildNodes',
        value: function hasChildNodes() {
            var children = this.childNodes();
            return Boolean(children !== undefined && children !== null && children.length > 0);
        }

        /**
         * @returns {Boolean}
         */

    }, {
        key: 'hasParentNode',
        value: function hasParentNode() {
            return Boolean(this.getParentId() !== null);
        }

        /**
         * @returns {Boolean}
         */

    }, {
        key: 'hasPreviousNode',
        value: function hasPreviousNode() {
            return Boolean(this.getPreviousId() !== null);
        }

        /**
         * @returns {Boolean}
         */

    }, {
        key: 'hasNextNode',
        value: function hasNextNode() {
            return Boolean(this.getNextId() !== null);
        }

        /**
         * @returns {Boolean}
         */

    }, {
        key: 'hasRootNode',
        value: function hasRootNode() {
            return Boolean(this.getRootId() !== null);
        }

        /**
         * Returns node depth
         * @returns {Number}
         */

    }, {
        key: 'depth',
        value: function depth() {
            return this.getProperty(properties.depth) || 0;
        }

        /**
         * Map node properties
         * @param {Object} properties
         * @returns {Object}
         * @private
         */

    }, {
        key: '_mapProperties',
        value: function _mapProperties(properties) {
            for (var property_name in properties) {
                if (properties.hasOwnProperty(property_name)) {
                    if (!this[property_name] && !PRIVATE_PROPERTIES.includes(property_name)) this[property_name] = properties[property_name];
                }
            }
            return properties;
        }
    }, {
        key: 'properties',
        get: function get() {
            return this._properties;
        }
    }]);

    return Node;
}();

module.exports = Node;
},{"./config":22,"./utils":23}],2:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = require('./Node');

var _require = require('./config'),
    properties = _require.properties;

var _require2 = require('./utils'),
    getContext = _require2.getContext,
    setContext = _require2.setContext,
    randomNum = _require2.randomNum;

var DEFAULT_OPTIONS = {
    children_key: 'children'
};

var Nested = function () {

    /**
     * @param {Array} data
     * @param {Object} options
     */
    function Nested() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Nested);

        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this._uniqueid = setContext(this);
        this.data = this.buildTree(data);
        this.currentNode = null;
        return getContext(this._uniqueid);
    }

    /**
     * Returns tree instance unique id
     * @returns {String}
     */


    _createClass(Nested, [{
        key: 'getUniqueId',
        value: function getUniqueId() {
            return this._uniqueid;
        }

        /**
         * Return entire tree size (with children)
         * @returns {number}
         */

    }, {
        key: 'getTreeSize',
        value: function getTreeSize() {
            return this._count || 0;
        }

        /**
         * Retrieve node by id
         * @param {String} id
         * @returns {Node|null}
         */

    }, {
        key: 'retrieveNode',
        value: function retrieveNode(id) {
            return this._retrieveNode(id, this.data);
        }

        /**
         * Retrieve nodes by key-value couple
         * @param {String} key
         * @param {*|null|undefined} value
         * @returns {Node[]|[]}
         */

    }, {
        key: 'retrieveNodesBy',
        value: function retrieveNodesBy(key, value) {
            if (!key) return null;
            return this._retrieveNodesBy(key, value, this.data);
        }

        /**
         *
         * @param depth
         * @returns {*}
         */

    }, {
        key: 'retrieveNodesByDepth',
        value: function retrieveNodesByDepth() {
            var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return this._retrieveNodesByDepth(depth, this.data);
        }

        /**
         * Retrieve node parent
         * @param {Node|String} node
         * @returns {Node|null}
         */

    }, {
        key: 'getParentNode',
        value: function getParentNode(node) {
            var id = node.constructor === Node ? node.getParentId() : node;
            return this.retrieveNode(id);
        }

        /**
         * Retrieve node siblings
         * @param {Node|String} node
         * @returns {Array}
         */

    }, {
        key: 'getSiblingsNodes',
        value: function getSiblingsNodes(node) {
            return [].concat(this.getPreviousNodes(node), this.getNextNodes(node));
        }

        /**
         * Retrieve previous nodes by id
         * @param {Node|String} node
         * @returns {Array}
         */

    }, {
        key: 'getPreviousNodes',
        value: function getPreviousNodes(node) {
            if (node.constructor === String) node = this.retrieveNode(node);
            var previousNodes = [];
            if (node !== null && node.getPreviousId() !== null) {
                previousNodes.push(node.previousNode());
                previousNodes = previousNodes.concat(this.getPreviousNodes(node.getPreviousId()));
            }
            return previousNodes;
        }

        /**
         * Retrieve previous node
         * @param {Node|String} node
         * @returns {Node}
         */

    }, {
        key: 'getPreviousNode',
        value: function getPreviousNode(node) {
            var id = node.constructor === Node ? node.getPreviousId() : node;
            return id !== null ? this.retrieveNode(id) : null;
        }

        /**
         * Retrieve node next nodes
         * @param {Node|String} node
         * @returns {Array}
         */

    }, {
        key: 'getNextNodes',
        value: function getNextNodes(node) {
            if (node.constructor === String) node = this.retrieveNode(node);
            var nextNodes = [];
            if (node !== null && node.getNextId() !== null) {
                nextNodes.push(node.nextNode());
                nextNodes = nextNodes.concat(this.getNextNodes(node.getNextId()));
            }
            return nextNodes;
        }

        /**
         * Retrieve node next node
         * @param {Node|String} node
         * @returns {Node}
         */

    }, {
        key: 'getNextNode',
        value: function getNextNode(node) {
            var id = node.constructor === Node ? node.getNextId() : node;
            return id !== null ? this.retrieveNode(id) : null;
        }

        /**
         * Retrieve node root node
         * @param {Node|String} node
         * @returns {Node}
         */

    }, {
        key: 'getRootNode',
        value: function getRootNode(node) {
            var id = node.constructor === Node ? node.getRootId() : node;
            return id !== null ? this.retrieveNode(id) : null;
        }

        /**
         * Retrieve node breadcrumb
         * @param {Node|String} node
         * @returns {Array}
         */

    }, {
        key: 'getBreadcrumb',
        value: function getBreadcrumb(node) {
            if (node.constructor === String) node = this.retrieveNode(node);
            var breadcrumb = [];
            breadcrumb.push(node);
            if (node.getParentId() !== null) breadcrumb = breadcrumb.concat(this.getBreadcrumb(node.getParentId()));
            return breadcrumb;
        }

        /**
         * @param {Array} data
         * @param {String|null} parentid
         * @param {String|null} rootid
         * @param {Number} depth
         * @returns {Node[]}
         */

    }, {
        key: 'buildTree',
        value: function buildTree() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var parentid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var _this = this;

            var rootid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var tree = data.reduce(function (acc, node) {
                if (node.constructor !== Node) node = new Node(node, _this._uniqueid);

                node.setProperty(properties.node_id, _this._setUniqueId());
                node.setProperty(properties.parent_id, parentid);

                if (parentid === null) {
                    rootid = node.getId();
                    depth = 0;
                    node.setProperty(properties.root_id, null);
                } else node.setProperty(properties.root_id, rootid);

                node.setProperty(properties.depth, depth);

                if (node.hasChildNodes()) node.setProperty(_this.options.children_key, _this.buildTree(node.childNodes(), node.getId(), rootid, depth += 1));

                acc.push(node);

                return acc;
            }, []);
            for (var i = 0; i < tree.length; i++) {
                var hasPreviousNode = tree[i - 1] !== undefined && tree[i - 1].constructor === Node;
                var hasNextNode = tree[i + 1] !== undefined && tree[i + 1].constructor === Node;
                tree[i].setProperty(properties.prev_id, hasPreviousNode ? tree[i - 1].getId() : null);
                tree[i].setProperty(properties.next_id, hasNextNode ? tree[i + 1].getId() : null);
            }
            return tree;
        }

        /**
         * Retrieve node by id
         * @param {String} id
         * @param {Array|null} data
         * @private
         * @returns {Node|null}
         */

    }, {
        key: '_retrieveNode',
        value: function _retrieveNode(id, data) {
            if (id === undefined || id === null) return null;
            if (this.currentNode !== null && this.currentNode.getId() === id) return this.currentNode;

            var node = null;
            for (var i = 0; i < data.length; i++) {
                node = data[i];
                if (node.getId() === id) {
                    this.currentNode = node;
                    break;
                } else if (node.hasChildNodes()) {
                    node = this._retrieveNode(id, node.childNodes());
                } else node = null;
            }
            return this.currentNode;
        }

        /**
         * Retrieve nodes by key-value couple
         * @param {String} key
         * @param {*|null|undefined} value
         * @param {Array} data
         * @private
         * @returns {Node[]|[]}
         */

    }, {
        key: '_retrieveNodesBy',
        value: function _retrieveNodesBy(key, value, data) {
            var nodes = [];
            for (var i = 0; i < data.length; i++) {
                var node = data[i];
                if (node.hasProperty(key) && node.getProperty(key) === value) nodes.push(node);
                if (node.hasChildNodes()) nodes = nodes.concat(this._retrieveNodesBy(key, value, node.childNodes()));
            }
            return nodes;
        }

        /**
         * Retrieve nodes by depth
         * @param {Number} depth
         * @param {Array} data
         * @param {Number} currentDepth
         * @private
         * @returns {Node[]|[]}
         */

    }, {
        key: '_retrieveNodesByDepth',
        value: function _retrieveNodesByDepth() {
            var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var nodes = [];
            for (var i = 0; i < data.length; i++) {
                var node = data[i];
                if (!node.hasParentNode()) currentDepth = 0;
                if (depth === currentDepth) nodes.push(node);else if (node.hasChildNodes()) nodes = nodes.concat(this._retrieveNodesByDepth(depth, node.childNodes(), currentDepth += 1));
            }
            return nodes;
        }

        /**
         * @returns {string}
         * @private
         */

    }, {
        key: '_setUniqueId',
        value: function _setUniqueId() {
            if (!this._count) this._count = 0;
            this._count += 1;
            return '' + properties.node_id_prefix + this._count * randomNum();
        }
    }]);

    return Nested;
}();

module.exports = Nested;
},{"./Node":21,"./config":22,"./utils":23}]},{},[2], null)
//# sourceMappingURL=/Nested.d9c34161.map