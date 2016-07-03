import React, {
    Component
} from 'react';

export default class ListItem extends Component {
    constructor( props ) {
        super( props );

    }
    complete( e, idx ) {
        this.props.ee.emit('markDone', idx);
    }
    render() {
        return (<ul>
            {this.props.todos.map((todo, idx) => {
                let item;
                if ( todo.isDone ) {
                    item = (<del>{todo.value}</del>);
                }
                else {
                    item = todo.value;
                }
                return (<li onClick={(e)=>this.complete(e, idx)}>
                    {item}
                </li>);
            })}
        </ul>);
    }
}
