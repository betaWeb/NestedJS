# NestedJS
This library allows you to deal with deep nested arrays in JavaScript.<br>
Navigate into nested collections can be tricky, so NestedJS try to get it easier.

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
> **IMPORTANT** : The property of every node's children if there are, have to be named `_children`

<br>

The created instance transform the collection and add several properties and methods to each collection's node :
#### Properties
 - `__nodeid` : this property is unique and allows you to retrieve a specific node
 - `__parentid` : tag the parent node id of a node if exists, null otherwise
 - `__previd` : tag the previous node id of a node if exists, null otherwise
 - `__nextid` : tag the next node id of a node if exists, null otherwise

 > To know the added properties on each node you must debug your collection, or you can simply browse it with a recursive loop.

#### Methods
Each node is now an instance of the NestedJS's `Node` class and has several methods :

- returns original properties of the node :
```JS
    Node.properties
```

- returns node unique id :
```JS
    Node.getId()
```

- returns node parent unique id :
```JS
    Node.getParentId()
```

- returns next node unique id :
```JS
    Node.getNextId()
```

- returns previous node unique id :
```JS
    Node.getPreviousId()
```

- check if node property exists :
```JS
    Node.hasProperty(key)
```

- returns node property if exists, defaultValue otherwise :
```JS
    Node.getProperty(key, defaultValue)
```

- set node's property :
```JS
    Node.setProperty(key, value)
```

- returns an array of previous nodes if exists, null otherwise :
```JS
    Node.previousNodes()
```

- returns previous node if exists, null otherwise :
```JS
    Node.previousNode()
```

- returns true if the node has a predecessor, false otherwise :
```JS
    Node.hasPreviousNode()
```

- returns an array of next nodes if exists, null otherwise :
```JS
    Node.nextNodes()
```

- returns next node if exists, null otherwise :
```JS
    Node.nextNode()
```

- returns true if the node has a successor, false otherwise :
```JS
    Node.hasNextNode()
```

- returns an array of siblings nodes if exists, null otherwise
```JS
    Node.siblingsNodes()
```

- returns an array of child nodes :
```JS
    Node.childNodes()
```

- returns node's first child if it has, null otherwise :
```JS
    Node.firstChild()
```

- returns node's last child if is has, null otherwise :
```JS
    Node.lastChild()
```

- returns node's child by index if it has, null otherwise :
```JS
    Node.nthChild()
```

- return true if the node has children, false otherwise :
```JS
    Node.hasChildNodes()
```

- returns parent node if exists, null otherwise :
```JS
    Node.parentNode()
```

- returns true if the node has an ancestor, false otherwise :
```JS
    Node.hasParentNode()
```

- returns current node breadcrumb :
```JS
    Node.breadcrumb()
```

- returns NestedJS instance :
```JS
    Node.getTree()
```

> Each node original properties are preserved and are transferred as properties of the NestedJS's `Node` class.