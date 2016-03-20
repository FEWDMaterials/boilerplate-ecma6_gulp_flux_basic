import Emitter from 'event-emitter';
import { Model } from './Model';
import {
    _render,
    _renderFactoryClosure
} from './FluxUtils';
import { _handleEmitters } from './FluxEvents';


export class CodeBlocks {
    constructor( ref ) {
        // react controller view root
        this.$ref = document.querySelector( ref );
        // event handler
        this.eventEmitter = Emitter({});

        // this will give us a renderFactory function that 
        // has the ref, eventHandler, Model, and render
        // methods scoped
        var renderFactory = _renderFactoryClosure(
            this.$ref,
            this.eventEmitter,
            Model,
            _render
        );

        // initially, we want to run a render
        _render(
            this.$ref,
            this.eventEmitter,
            Model
        );

        // this will set up all the custom events
        _handleEmitters( 
            renderFactory,
            this.eventEmitter,
            Model
        );
    } // constructor
} // CodeBlocks
