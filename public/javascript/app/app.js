/* CURRENTLY IN: javascript/main.js */

import React from 'react';
import List from './Components/List';
import Emitter from 'event-emitter';
import request from 'superagent';

let data = window.localStorage.getItem('todos');
if ( data ) {
    data = JSON.parse( data ).items;
}
else {
    data = [];
}

const Model = {
    todos: data,
    addTask( data ) {
        this.todos.push( data );
    },
    updateTask( data, index ) {
        this.todos.splice( index, 1, data );
    },
    removeTask( data, index ) {
        this.todos.splice( index, 1 );
    },
    save( task ) {
        return new Promise((resolve, reject) => {
            request
                .post('http://localhost:9012/list')
                .send({
                    isDone: false,
                    value: task,
                })
                .end((err, resp) => {
                    this.addTask({
                        isDone: false,
                        value: task,
                    });

                    var obj = {
                        items: this.todos,
                    };

                    window.localStorage.setItem(
                        'todos',
                        JSON.stringify( obj )
                    );

                    resolve();
                });
        });

    },
    getTodos() {
        return this.todos;
    }
};

const ee = Emitter({});
function wrapPromise( cb ) {
    return function() {

    }
}

ee.on('newTask', ( task ) => {
    console.log('NEW TASK IS', task );
    Model.save( task ).then(() => {
        render( ee, Model );
    });

});

ee.on('markDone', ( idx ) => {
    const item = Model.getTodos()[ idx ];
    item.isDone = true;
    Model.updateTask( item, idx );
    console.log( Model.getTodos() );

    render( ee, Model );
});

// super test
function render( ee, Model ) {
    React.render(
        <List ee={ee} todos={Model.getTodos()} />,
        document.querySelector('.react-container')
    );
}
render( ee, Model );
