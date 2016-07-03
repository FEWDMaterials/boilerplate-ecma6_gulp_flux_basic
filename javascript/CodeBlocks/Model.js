var Tree = null;
var foo = 0;

let Model = {
    getTree() {
        return Tree;
    },
    setTree( ref ) {
        Tree = ref;
    },
    getFoo() {
        return foo;
    },
    setFoo( val ) {
        foo = val;
    },
    getData() {
        return { Tree, foo };
    }
};

export { Model };
