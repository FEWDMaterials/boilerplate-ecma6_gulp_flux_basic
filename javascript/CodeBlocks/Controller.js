import React, {
    Component
} from 'react';

export class Controller extends Component {
    click( e ) {
        this.props.ee.emit('foobar', 1, 2);
    }
    render() {
        return (<h1 onClick={() => this.click()}>Hello, Wrold! {this.props.data.foo} </h1>);
    };
}

