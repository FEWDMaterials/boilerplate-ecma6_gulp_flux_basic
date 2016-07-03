/*
 *  CAPACITOR: a (_very_ basic) flux implementation that abstracts away
 *  sync and asynch changes to a Model object
 */
var Emitter = require('event-emitter');

function Capacitor( Model, onRender ) {
    // main purpose for capacitor: abstract away the event emitter layer
    this.emitter = Emitter({});
    // no opinions on the Model, pass it in to instance
    // can be anything
    this.model = Model;
    // keep track of events
    this.events = {};
    // how to render the react components
    this.renderCallback = onRender;
}

Capacitor.prototype.triggerRender = function() {
    // call render
    this.renderCallback( this.model, this.emitter );
}

// model helper function, in case there is a need to revamp entire data model
Capacitor.prototype.updateModel = function( Model ) {
    this.model = Model;
};

// render factory method that will apply callback method and then call the render
// abstracts away the asynch / synch nature of Model updates
// renderCallback is run only after the callback has completed running
Capacitor.prototype.renderFactory = function( callback ) {
    return function() {
        var args = [].slice.call( arguments );
        args.push( this.model );

        var returnable;
        if ( callback ) {
            returnable = callback.apply(null, args);
        }

        if ( typeof returnable === "object" && returnable.then ) {
            // handle both success and fail the same way
            // assume that the model handles actual failures
            returnable.then(function() {
                this.renderCallback( this.model, this.emitter );
            }.bind(this), function() {
                this.renderCallback( this.model, this.emitter );
            }.bind(this));
        }
        else {
            this.renderCallback( this.model, this.emitter );
        }
    }.bind( this );
}


// bind events via the renderFactory
// on event call, it will run the callback
Capacitor.prototype.registerEvent = function( eventName, callback, skipFactory ) {
    if ( this.events[ eventName ] === true ) {
        console.log('error: this event is already bound! ' + eventName);
        return;
    }

    this.events[ eventName ] = true;

    if ( skipFactory ) {
        this.emitter.on( eventName, callback );
        return;
    }

    this.emitter.on( eventName, this.renderFactory( callback ) );
}

// unbind an event
Capacitor.prototype.deRegisterEvent = function( eventName ) {
    if ( this.events[ eventName ] === true ) {
        this.emitter.off( eventName );
        this.events[ eventName ] = false;
    }
}

module.exports = {
  init: function( Model, onRender ) {
    return new Capacitor( Model, onRender );
  }
}kj
