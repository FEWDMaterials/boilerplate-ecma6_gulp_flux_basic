// this file bootstraps all the event callbacks
// EventHandlers object defines the callbacks
const EventHandlers = {
    onFoobar( a, b, Model ) {
        Model.setFoo( a+b );
    }
};
// bootstrap the event callbacks
// TODO: this can be done better so that
// Model does not have to be passed in over and over
export function _handleEmitters( renderFactory, ee, Model ) {
    ee.on(
        'foobar',
        renderFactory( EventHandlers.onFoobar, Model )
    );
}
