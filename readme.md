# NestedJS
This library allows you to deal with deep nested arrays in JavaScript.<br>
Navigate into nested collections can be tricky, so NestedJS try to get it easier.

You can find a [live demo](https://codepen.io/betaweb/full/wXvvpZ/) of NestedJS here.

<br>

## Getting started
### Installation
#### Browser :
Download the latest version of NestedJS and load the file `Nested.min.js` (on build folder) on your HTML page :
```HTML
    <script src="/path/to/Nested.min.js"></script>
```

#### NodeJS :
You just have to install ...
```bash
    # with NPM
    $ npm install nestedjs

    # with Yarn
    $ yarn add nestedjs
```

... and load the package on your script
```JS
const NestedJS = require('nestedjs')
// OR
import NestedJS from 'nestedjs'
```

### Usage
#### Instanciation
Once package loaded, NestedJS must ne instanciate with a nested collection.
```JS
const collection = [...] // Nested data collection
const tree = new NestedJS(collection)
```
> **IMPORTANT** : The property of every node's children if there are, is named `children` by default. You can change the name with the option `children_key`.

<br>

The created instance transform the collection and add several properties and methods to each collection's node :
#### Properties
 - `__nodeid` : this property is unique and allows you to retrieve a specific node
 - `__parentid` : tag the parent node id of a node if exists, null otherwise
 - `__rootid` : tag the root node id of a node if exists, null otherwise
 - `__previd` : tag the previous node id of a node if exists, null otherwise
 - `__nextid` : tag the next node id of a node if exists, null otherwise
 - `__depth` : tag the node depth (0 to n)

 > To know the added properties on each node you must debug your collection, or you can simply browse it with a recursive loop.

#### Methods
You can retrieve a node by his unique id :
```JS
    const node = tree.retrieveNode(/* __nodeid node unique id */)
```

This will returns a node which is an instance of the NestedJS's `Node` class. This class has several methods :

- returns original properties of the node :
```JS
    node.properties
```

- returns node unique id :
```JS
    node.getId()
```

- returns node parent unique id :
```JS
    node.getParentId()
```

- returns next node unique id :
```JS
    node.getNextId()
```

- returns previous node unique id :
```JS
    node.getPreviousId()
```

- check if node property exists :
```JS
    node.hasProperty(key)
```

- returns node property if exists, defaultValue otherwise :
```JS
    node.getProperty(key, defaultValue)
```

- set node's property :
```JS
    node.setProperty(key, value)
```

- returns an array of previous nodes if exists, null otherwise :
```JS
    node.previousNodes()
```

- returns previous node if exists, null otherwise :
```JS
    node.previousNode()
```

- returns true if the node has a predecessor, false otherwise :
```JS
    node.hasPreviousNode()
```

- returns an array of next nodes if exists, null otherwise :
```JS
    node.nextNodes()
```

- returns next node if exists, null otherwise :
```JS
    node.nextNode()
```

- returns true if the node has a successor, false otherwise :
```JS
    node.hasNextNode()
```

- returns an array of siblings nodes if exists, null otherwise
```JS
    node.siblingsNodes()
```

- returns an array of child nodes :
```JS
    node.childNodes()
```

- returns node's first child if it has, null otherwise :
```JS
    node.firstChild()
```

- returns node's last child if is has, null otherwise :
```JS
    node.lastChild()
```

- returns node's child by index if it has, null otherwise :
```JS
    node.nthChild()
```

- return true if the node has children, false otherwise :
```JS
    node.hasChildNodes()
```

- returns parent node if exists, null otherwise :
```JS
    node.parentNode()
```

- returns true if the node has an ancestor, false otherwise :
```JS
    node.hasParentNode()
```

- returns root node if exists, null otherwise :
```JS
    node.rootNode()
```

- returns true if the node has a root node, false otherwise :
```JS
    node.hasRootNode()
```

- returns current node breadcrumb :
```JS
    node.breadcrumb()
```

- returns NestedJS instance :
```JS
    node.getTree()
```

- returns node depth :
```JS
    node.depth()
```

> Each node original properties are preserved and are transferred as properties of the NestedJS's `Node` class.

You also retrieve one or several nodes by a key/value couple search :
```JS
const nodes = tree.retrieveNodesBy('name', 'lorem')
```