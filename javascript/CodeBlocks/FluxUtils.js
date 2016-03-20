import React from 'react';
import { Controller } from './Controller';

// render method
export function _render( DOMref, ee, Model ) {
    React.render(
        <Controller ee={ee} data={Model.getData()} />,
        DOMref
    );
}

// the render factory
export function _renderFactoryClosure( DOMref, ee, Model, _render ) {
    return function( callback, Model ) {
        return function() {
            var args = [].slice.call( arguments );
            args.push( Model );

            var returnable;
            if ( callback ) {
                returnable = callback.apply(null, args);
            }

            if ( typeof returnable === "object" && returnable.then ) {
                returnable.then(function() {
                    _render( DOMref, ee, Model );
                });
            }
            else {
                _render( DOMref, ee, Model );
            }
        };
    } // renderFactory
}

