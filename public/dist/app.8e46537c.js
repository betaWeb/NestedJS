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
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PRIVATE_PROPERTIES = ['__nodeid', '__parentid', '__nextid', '__previd', '__tree'];

var Node = function () {

    /**
     * @param {Object} node
     */
    function Node() {
        var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var tree_instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Node);

        this._properties = this._mapProperties(node);
        this._tree_instance = tree_instance;
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
            return this.getProperty(this.getTree().options.properties.node_id);
        }

        /**
         * Returns node parent unique id
         * @returns {String|null}
         */

    }, {
        key: 'getParentId',
        value: function getParentId() {
            return this.getProperty(this.getTree().options.properties.parent_id);
        }

        /**
         * Returns previous node unique id
         * @returns {String|null}
         */

    }, {
        key: 'getPreviousId',
        value: function getPreviousId() {
            return this.getProperty(this.getTree().options.properties.prev_id);
        }

        /**
         * Returns next node unique id
         * @returns {String|null}
         */

    }, {
        key: 'getNextId',
        value: function getNextId() {
            return this.getProperty(this.getTree().options.properties.next_id);
        }

        /**
         * Returns an array of child nodes
         * @returns {Node[]}
         */

    }, {
        key: 'childNodes',
        value: function childNodes() {
            return this.getProperty(this.getTree().options.properties.children_key, []);
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
            return this._tree_instance || null;
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
},{}],20:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = require('./Node');
var DEFAULT_OPTIONS = {
    properties: {
        node_id: '__nodeid',
        node_id_prefix: 'node-',
        parent_id: '__parentid',
        prev_id: '__previd',
        next_id: '__nextid',
        children_key: 'children'
    }
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
        this.data = this.buildTree(data);
        this.currentNode = null;
    }

    /**
     * Retrieve node by id
     * @param {String} id
     * @param {Array|null} data
     * @returns {Node|null}
     */


    _createClass(Nested, [{
        key: 'retrieveNode',
        value: function retrieveNode(id) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (this.currentNode !== null && this.currentNode.getId() === id) return this.currentNode;

            if (data === null) {
                data = this.data;
                this.currentNode = null;
            }

            var node = null;
            for (var i = 0; i < data.length; i++) {
                node = data[i];
                if (node.getId() === id) {
                    this.currentNode = node;
                    break;
                } else if (node.hasChildNodes()) {
                    node = this.retrieveNode(id, node.childNodes());
                } else node = null;
            }
            return this.currentNode;
        }

        /**
         * Retrieve nodes by key-value couple
         * @param {String} key
         * @param {*|null|undefined} value
         * @param {Array} data
         * @returns {Node[]|[]}
         */

    }, {
        key: 'retrieveNodesBy',
        value: function retrieveNodesBy(key, value) {
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            data = data || this.data;
            var nodes = [];
            for (var i = 0; i < data.length; i++) {
                var node = data[i];
                if (node.hasProperty(key) && node.getProperty(key) === value) nodes.push(node);
                if (node.hasChildNodes()) nodes = nodes.concat(this.retrieveNodesBy(key, value, node.childNodes()));
            }
            return nodes;
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
         * Retrieve next node
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
         * @returns {Node[]}
         */

    }, {
        key: 'buildTree',
        value: function buildTree() {
            var _this = this;

            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var parentid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (!this.count) this.count = 0;
            var tree = data.reduce(function (acc, node) {
                _this.count += 1;
                if (node.constructor !== Node) node = new Node(node, _this);
                node.setProperty(_this.options.properties.node_id, '' + _this.options.properties.node_id_prefix + _this.count * Math.floor(Math.random() * 10000 + 1));
                node.setProperty(_this.options.properties.parent_id, parentid);
                if (node.hasChildNodes()) node.setProperty(_this.options.properties.children_key, _this.buildTree(node.childNodes(), node.getId()));
                acc.push(node);
                return acc;
            }, []);
            for (var i = 0; i < tree.length; i++) {
                var hasPreviousNode = tree[i - 1] !== undefined && tree[i - 1].constructor === Node;
                var hasNextNode = tree[i + 1] !== undefined && tree[i + 1].constructor === Node;
                tree[i].setProperty(this.options.properties.prev_id, hasPreviousNode ? tree[i - 1].getId() : null);
                tree[i].setProperty(this.options.properties.next_id, hasNextNode ? tree[i + 1].getId() : null);
            }
            return tree;
        }
    }]);

    return Nested;
}();

module.exports = Nested;
},{"./Node":22}],4:[function(require,module,exports) {
'use strict';

var _Nested = require('../../src/Nested');

var _Nested2 = _interopRequireDefault(_Nested);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = [{
    type: 'folder',
    name: 'Ma musique',
    creation_date: '2018-05-04 14:53:26',
    last_modification_date: '2018-05-04 14:53:26',
    children: [{
        type: 'file',
        name: 'my song.mp3',
        extension: 'mp3',
        creation_date: '2018-05-04 14:55:12',
        last_modification_date: '2018-05-04 14:55:12'
    }, {
        type: 'file',
        name: 'my song_2.mp3',
        extension: 'mp3',
        creation_date: '2018-05-04 14:55:16',
        last_modification_date: '2018-05-04 14:55:16'
    }, {
        type: 'file',
        name: 'my song_3.mp3',
        extension: 'mp3',
        creation_date: '2018-05-04 14:55:24',
        last_modification_date: '2018-05-04 14:55:24'
    }, {
        type: 'file',
        name: 'my song_4.mp3',
        extension: 'mp3',
        creation_date: '2018-05-04 14:55:58',
        last_modification_date: '2018-05-04 14:55:58'
    }, {
        type: 'folder',
        name: 'favourites',
        creation_date: '2018-05-04 14:57:01',
        last_modification_date: '2018-05-04 14:57:01',
        children: [{
            type: 'file',
            name: 'my favourite song.mp3',
            extension: 'mp3',
            creation_date: '2018-05-04 14:58:54',
            last_modification_date: '2018-05-04 14:58:54'
        }, {
            type: 'file',
            name: 'my favourite song_2.mp3',
            extension: 'mp3',
            creation_date: '2018-05-04 14:58:54',
            last_modification_date: '2018-05-04 14:58:54'
        }]
    }]
}, {
    type: 'folder',
    name: 'Mes vidéos',
    creation_date: '2018-05-04 14:53:26',
    last_modification_date: '2018-05-04 14:53:26',
    children: [{
        type: 'file',
        name: 'my video.mp4',
        extension: 'mp4',
        creation_date: '2018-05-04 14:55:12',
        last_modification_date: '2018-05-04 14:55:12'
    }, {
        type: 'folder',
        name: 'favourites',
        creation_date: '2018-05-04 14:57:01',
        last_modification_date: '2018-05-04 14:57:01',
        children: [{
            type: 'file',
            name: 'my favourite video.mp4',
            extension: 'mp4',
            creation_date: '2018-05-04 14:58:54',
            last_modification_date: '2018-05-04 14:58:54'
        }]
    }]
}];

var iconskeymap = {
    'video': /\.?(mp4|webm|ogg)/i,
    'pdf': /\.?(pdf)/i,
    'image': /\.?(jpe?g|png|tiff|svg|bmp)/i,
    'code': /\.?(jsx?|php|css|html|scss|less|rb|py|c|cs|sh)/i,
    'audio': /\.?(mp3|wav|ogg)/i,
    'archive': /\.?(zip|rar|7z|tar(\.gz)?)/i

};

var tree = new _Nested2.default(data);

var $breadcrumb = document.getElementById('breadcrumb');
var $tree = document.getElementById('tree');
var $mainframeList = document.getElementById('mainframe-list');
var $mainframeDetails = document.getElementById('mainframe-details');

var buildList = function buildList(data) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var $list = document.createElement('ul');
    $list.classList.add('list');
    if (root) $list.classList.add('tree-root');
    data.forEach(function (item) {
        if (item.type === 'folder') {
            var $item = document.createElement('li');
            var $icon = document.createElement('span');
            var $title = document.createElement('a');
            $icon.classList.add('tree-icon');
            $title.textContent = item.name;
            $item.id = item.getId();
            $item.classList.add('item');
            $item.classList.add('tree-folder');
            $icon.addEventListener('click', function (e) {
                var $el = e.target.parentNode;
                if (!$el) return;
                var node = tree.retrieveNode($item.id);
                if (!node) return;
                if ($el.nextSibling) {
                    $el.classList.toggle('is-open');
                    $el.nextSibling.classList.toggle('is-visible');
                }
            });
            $title.addEventListener('click', function (e) {
                var $el = e.target.parentNode;
                if (!$el) return;
                var node = tree.retrieveNode($el.id);
                if (!node) return;
                if (node.hasChildNodes()) {
                    Array.prototype.forEach.call($tree.querySelectorAll('.tree-folder.is-active'), function (element) {
                        return element.classList.remove('is-active');
                    });
                    $el.classList.add('is-active');
                    $mainframeList.innerHTML = '';
                    $breadcrumb.innerHTML = '';
                    node.breadcrumb().forEach(function (item) {
                        var span = document.createElement('span');
                        span.textContent = ' / ' + item.name;
                        $breadcrumb.appendChild(span);
                    });
                    node.childNodes().forEach(function (childnode) {
                        $mainframeDetails.innerHTML = '';
                        var el = document.createElement('a');
                        var icon = document.createElement('i');
                        var name = document.createElement('span');
                        icon.classList.add('mainframe-item-icon', 'far');
                        var iconName = 'fa-folder';
                        if (childnode.type === 'file') {
                            iconName = 'fa-file';
                            for (var i in iconskeymap) {
                                if (iconskeymap.hasOwnProperty(i) && iconskeymap[i].test(childnode.extension)) iconName += '-' + i;
                            }
                        }
                        icon.classList.add(iconName);
                        el.appendChild(icon);
                        el.id = childnode.getId();
                        el.classList.add('mainframe-item');
                        name.textContent = childnode.name;
                        el.appendChild(name);
                        el.addEventListener('click', function (e) {
                            if (childnode.type === 'file') {
                                var element = e.target.parentNode;
                                var n = tree.retrieveNode(element.id);
                                $mainframeDetails.innerHTML = '\n                                        <strong>Nom</strong> : ' + n.name + '<br>\n                                        <strong>Type</strong> : ' + n.extension + '<br>\n                                        <strong>Date de cr\xE9ation</strong> : ' + n.creation_date + '<br>\n                                        <strong>Date de derni\xE8re modification</strong> : ' + n.last_modification_date + '\n                                    ';
                            }
                        });
                        $mainframeList.appendChild(el);
                    });
                }
            });

            if (item.__parentid) $item.dataset.parentid = item.getParentId();

            $item.appendChild($icon);
            $item.appendChild($title);
            $list.appendChild($item);
        }
        if (item.hasChildNodes()) $list.appendChild(buildList(item.childNodes()));
    });
    return $list;
};

$tree.appendChild(buildList(tree.data, true));
},{"../../src/Nested":20}]},{},[4], null)
//# sourceMappingURL=/app.8e46537c.map