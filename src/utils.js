let utils = {

    isBrowser() {
        try {
            return window !== undefined && window.document !== undefined
        } catch(e) {
            return false
        }
    },

    isNode() {
        try {
            return module !== undefined && module.exports !== undefined
        } catch(e) {
            return false
        }
    },

    retrieveContext() {
        let _context = null
        if (utils.isBrowser()) _context = window
        else if (utils.isNode()) _context = global
        return _context
    },

    getContext(context_id) {
        if (utils.isBrowser() && window.__nestedjs)
            return window.__nestedjs[context_id] || null
        if (utils.isNode() && global.__nestedjs)
            return global.__nestedjs[context_id] || null
        return null
    },

    setContext(context) {
        let _context = utils.retrieveContext()
        if (_context === null || _context === undefined) throw new Error('NestedJS.setContext - no context found')
        if (!_context.__nestedjs) _context.__nestedjs = {}
        let uniqueid = Math.floor(utils.randomNum() * (+new Date / 1000))
        _context.__nestedjs[uniqueid] = context
        return uniqueid
    },

    clearContext() {
        let _context = utils.retrieveContext()
        if (_context === null || _context === undefined) throw new Error('NestedJS.clearContext - no context found')
        _context.__nestedjs = {}
    },

    randomNum(start = 1, length = 10000) {
        return Math.floor((Math.random() * length) + start)
    }

}

module.exports = utils