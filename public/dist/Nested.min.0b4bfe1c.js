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
})({7:[function(require,module,exports) {
var define;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define("Nested", [], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Nested = t() : e.Nested = t();
}(window, function () {
  return function (e) {
    var t = {};function r(n) {
      if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }return r.m = e, r.c = t, r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: n });
    }, r.r = function (e) {
      Object.defineProperty(e, "__esModule", { value: !0 });
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 6);
  }([function (e, t, r) {
    (function (e, t) {
      var r = {
        isBrowser: function isBrowser() {
          try {
            return void 0 !== window && void 0 !== window.document;
          } catch (e) {
            return !1;
          }
        },
        isNode: function isNode() {
          try {
            return void 0 !== e && void 0 !== e.exports;
          } catch (e) {
            return !1;
          }
        },
        retrieveContext: function retrieveContext() {
          var e = null;return r.isBrowser() ? e = window : r.isNode() && (e = t), e;
        },
        getContext: function getContext(e) {
          return r.isBrowser() && window.__nestedjs ? window.__nestedjs[e] || null : r.isNode() && t.__nestedjs && t.__nestedjs[e] || null;
        }, setContext: function setContext(e) {
          var t = r.retrieveContext();if (null === t || void 0 === t) throw new Error("NestedJS.setContext - no context found");t.__nestedjs || (t.__nestedjs = {});var n = Math.floor(r.randomNum() * (+new Date() / 1e3));return t.__nestedjs[n] = e, n;
        },
        clearContext: function clearContext() {
          var e = r.retrieveContext();if (null === e || void 0 === e) throw new Error("NestedJS.clearContext - no context found");e.__nestedjs = {};
        },
        randomNum: function randomNum() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e4;
          return Math.floor(Math.random() * t + e);
        } };e.exports = r;
    }).call(this, r(5)(e), r(4));
  }, function (e, t) {
    e.exports = { properties: { node_id: "__nodeid", node_id_prefix: "node-", parent_id: "__parentid", root_id: "__rootid", prev_id: "__previd", next_id: "__nextid", depth: "__depth" } };
  }, function (e, t, r) {
    var _r = r(1),
        n = _r.properties,
        _r2 = r(0),
        o = _r2.getContext,
        i = [n.node_id, n.parent_id, n.next_id, n.prev_id, n.depth];

    e.exports = function () {
      function _class() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, _class);

        this._properties = this._mapProperties(e), this._tree_uniqueid = t;
      }

      _createClass(_class, [{
        key: "hasProperty",
        value: function hasProperty(e) {
          return void 0 !== this._properties[e];
        }
      }, {
        key: "getProperty",
        value: function getProperty(e) {
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          return this._properties[e] || t;
        }
      }, {
        key: "setProperty",
        value: function setProperty(e, t) {
          this._properties[e] = t;
        }
      }, {
        key: "getId",
        value: function getId() {
          return this.getProperty(n.node_id);
        }
      }, {
        key: "getParentId",
        value: function getParentId() {
          return this.getProperty(n.parent_id);
        }
      }, {
        key: "getPreviousId",
        value: function getPreviousId() {
          return this.getProperty(n.prev_id);
        }
      }, {
        key: "getNextId",
        value: function getNextId() {
          return this.getProperty(n.next_id);
        }
      }, {
        key: "getRootId",
        value: function getRootId() {
          return this.getProperty(n.root_id);
        }
      }, {
        key: "childNodes",
        value: function childNodes() {
          return this.getProperty(this.getTree().options.children_key, []);
        }
      }, {
        key: "previousNodes",
        value: function previousNodes() {
          var e = this.getTree();return null !== e ? e.getPreviousNodes(this) : null;
        }
      }, {
        key: "previousNode",
        value: function previousNode() {
          var e = this.getTree();return null !== e ? e.getPreviousNode(this) : null;
        }
      }, {
        key: "nextNodes",
        value: function nextNodes() {
          var e = this.getTree();return null !== e ? e.getNextNodes(this) : null;
        }
      }, {
        key: "nextNode",
        value: function nextNode() {
          var e = this.getTree();return null !== e ? e.getNextNode(this) : null;
        }
      }, {
        key: "parentNode",
        value: function parentNode() {
          var e = this.getTree();return null !== e ? e.getParentNode(this) : null;
        }
      }, {
        key: "rootNode",
        value: function rootNode() {
          var e = this.getTree();return null !== e ? e.getRootNode(this) : null;
        }
      }, {
        key: "siblingsNodes",
        value: function siblingsNodes() {
          var e = this.getTree();return null !== e ? e.getSiblingsNodes(this) : null;
        }
      }, {
        key: "getTree",
        value: function getTree() {
          return o(this._tree_uniqueid);
        }
      }, {
        key: "breadcrumb",
        value: function breadcrumb() {
          var e = this.getTree();return null !== e ? e.getBreadcrumb(this).reverse() : [];
        }
      }, {
        key: "firstChild",
        value: function firstChild() {
          if (!this.hasChildNodes()) return null;var e = this.childNodes();return e && e.length ? e[0] : null;
        }
      }, {
        key: "lastChild",
        value: function lastChild() {
          if (!this.hasChildNodes()) return null;var e = this.childNodes();return e && e.length ? e[e.length - 1] : null;
        }
      }, {
        key: "nthChild",
        value: function nthChild(e) {
          if (!this.hasChildNodes()) return null;var t = this.childNodes();return t && t.length ? t[e] : null;
        }
      }, {
        key: "countChildren",
        value: function countChildren() {
          return this.hasChildNodes() ? this.childNodes().length : 0;
        }
      }, {
        key: "hasChildNodes",
        value: function hasChildNodes() {
          var e = this.childNodes();return Boolean(void 0 !== e && null !== e && e.length > 0);
        }
      }, {
        key: "hasParentNode",
        value: function hasParentNode() {
          return Boolean(null !== this.getParentId());
        }
      }, {
        key: "hasPreviousNode",
        value: function hasPreviousNode() {
          return Boolean(null !== this.getPreviousId());
        }
      }, {
        key: "hasNextNode",
        value: function hasNextNode() {
          return Boolean(null !== this.getNextId());
        }
      }, {
        key: "hasRootNode",
        value: function hasRootNode() {
          return Boolean(null !== this.getRootId());
        }
      }, {
        key: "depth",
        value: function depth() {
          return this.getProperty(n.depth) || 0;
        }
      }, {
        key: "_mapProperties",
        value: function _mapProperties(e) {
          for (var _t in e) {
            e.hasOwnProperty(_t) && (this[_t] || i.includes(_t) || (this[_t] = e[_t]));
          }return e;
        }
      }, {
        key: "properties",
        get: function get() {
          return this._properties;
        }
      }]);

      return _class;
    }();
  }, function (e, t, r) {
    var n = r(2),
        _r3 = r(1),
        o = _r3.properties,
        _r4 = r(0),
        i = _r4.getContext,
        s = _r4.setContext,
        d = _r4.randomNum,
        u = { children_key: "children" };e.exports = function () {
      function _class2() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class2);

        return this.options = Object.assign({}, u, t), this._uniqueid = s(this), this.data = this.buildTree(e), this.currentNode = null, i(this._uniqueid);
      }

      _createClass(_class2, [{
        key: "getUniqueId",
        value: function getUniqueId() {
          return this._uniqueid;
        }
      }, {
        key: "getTreeSize",
        value: function getTreeSize() {
          return this._count || 0;
        }
      }, {
        key: "retrieveNode",
        value: function retrieveNode(e) {
          return this._retrieveNode(e, this.data);
        }
      }, {
        key: "retrieveNodesBy",
        value: function retrieveNodesBy(e, t) {
          return e ? this._retrieveNodesBy(e, t, this.data) : null;
        }
      }, {
        key: "retrieveNodesByDepth",
        value: function retrieveNodesByDepth() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          return this._retrieveNodesByDepth(e, this.data);
        }
      }, {
        key: "getParentNode",
        value: function getParentNode(e) {
          var t = e.constructor === n ? e.getParentId() : e;return this.retrieveNode(t);
        }
      }, {
        key: "getSiblingsNodes",
        value: function getSiblingsNodes(e) {
          return [].concat(this.getPreviousNodes(e), this.getNextNodes(e));
        }
      }, {
        key: "getPreviousNodes",
        value: function getPreviousNodes(e) {
          e.constructor === String && (e = this.retrieveNode(e));var t = [];return null !== e && null !== e.getPreviousId() && (t.push(e.previousNode()), t = t.concat(this.getPreviousNodes(e.getPreviousId()))), t;
        }
      }, {
        key: "getPreviousNode",
        value: function getPreviousNode(e) {
          var t = e.constructor === n ? e.getPreviousId() : e;return null !== t ? this.retrieveNode(t) : null;
        }
      }, {
        key: "getNextNodes",
        value: function getNextNodes(e) {
          e.constructor === String && (e = this.retrieveNode(e));var t = [];return null !== e && null !== e.getNextId() && (t.push(e.nextNode()), t = t.concat(this.getNextNodes(e.getNextId()))), t;
        }
      }, {
        key: "getNextNode",
        value: function getNextNode(e) {
          var t = e.constructor === n ? e.getNextId() : e;return null !== t ? this.retrieveNode(t) : null;
        }
      }, {
        key: "getRootNode",
        value: function getRootNode(e) {
          var t = e.constructor === n ? e.getRootId() : e;return null !== t ? this.retrieveNode(t) : null;
        }
      }, {
        key: "getBreadcrumb",
        value: function getBreadcrumb(e) {
          e.constructor === String && (e = this.retrieveNode(e));var t = [];return t.push(e), null !== e.getParentId() && (t = t.concat(this.getBreadcrumb(e.getParentId()))), t;
        }
      }, {
        key: "buildTree",
        value: function buildTree() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _this = this;

          var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          var s = e.reduce(function (e, s) {
            return s.constructor !== n && (s = new n(s, _this._uniqueid)), s.setProperty(o.node_id, _this._setUniqueId()), s.setProperty(o.parent_id, t), null === t ? (r = s.getId(), i = 0, s.setProperty(o.root_id, null)) : s.setProperty(o.root_id, r), s.setProperty(o.depth, i), s.hasChildNodes() && s.setProperty(_this.options.children_key, _this.buildTree(s.childNodes(), s.getId(), r, i += 1)), e.push(s), e;
          }, []);for (var _e = 0; _e < s.length; _e++) {
            var _t2 = void 0 !== s[_e - 1] && s[_e - 1].constructor === n,
                _r5 = void 0 !== s[_e + 1] && s[_e + 1].constructor === n;s[_e].setProperty(o.prev_id, _t2 ? s[_e - 1].getId() : null), s[_e].setProperty(o.next_id, _r5 ? s[_e + 1].getId() : null);
          }return s;
        }
      }, {
        key: "_retrieveNode",
        value: function _retrieveNode(e, t) {
          if (void 0 === e || null === e) return null;if (null !== this.currentNode && this.currentNode.getId() === e) return this.currentNode;var r = null;for (var _n = 0; _n < t.length; _n++) {
            if ((r = t[_n]).getId() === e) {
              this.currentNode = r;break;
            }r = r.hasChildNodes() ? this._retrieveNode(e, r.childNodes()) : null;
          }return this.currentNode;
        }
      }, {
        key: "_retrieveNodesBy",
        value: function _retrieveNodesBy(e, t, r) {
          var n = [];for (var _o = 0; _o < r.length; _o++) {
            var _i = r[_o];_i.hasProperty(e) && _i.getProperty(e) === t && n.push(_i), _i.hasChildNodes() && (n = n.concat(this._retrieveNodesBy(e, t, _i.childNodes())));
          }return n;
        }
      }, {
        key: "_retrieveNodesByDepth",
        value: function _retrieveNodesByDepth() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var n = [];for (var _o2 = 0; _o2 < t.length; _o2++) {
            var _i2 = t[_o2];_i2.hasParentNode() || (r = 0), e === r ? n.push(_i2) : _i2.hasChildNodes() && (n = n.concat(this._retrieveNodesByDepth(e, _i2.childNodes(), r += 1)));
          }return n;
        }
      }, {
        key: "_setUniqueId",
        value: function _setUniqueId() {
          return this._count || (this._count = 0), this._count += 1, "" + o.node_id_prefix + this._count * d();
        }
      }]);

      return _class2;
    }();
  }, function (e, t) {
    var r;r = function () {
      return this;
    }();try {
      r = r || Function("return this")() || (0, eval)("this");
    } catch (e) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (r = window);
    }e.exports = r;
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: !0, get: function get() {
          return e.l;
        } }), Object.defineProperty(e, "id", { enumerable: !0, get: function get() {
          return e.i;
        } }), e.webpackPolyfill = 1), e;
    };
  }, function (e, t, r) {
    var _r6 = r(0),
        n = _r6.isNode,
        o = r(3);

    if (!n()) throw new Error("[Fatal Error] NestedJS - No valid context found");e.exports = o;
  }]);
});
},{}]},{},[7], null)
//# sourceMappingURL=/Nested.min.0b4bfe1c.map