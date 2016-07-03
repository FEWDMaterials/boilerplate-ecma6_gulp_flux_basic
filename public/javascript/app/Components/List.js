import React, {
    Component
} from 'react';

import ListItem from './ListItem';
import ListInput from './ListInput';

export default class List extends Component {
    constructor( props ) {
        super( props );
    }
    render() {
        return (<div className="ui two column centered grid">
            <div className="column">
                <div className="ui segment">
                    <h3 className="ui header">To Do List</h3>
                    <ListInput {...this.props} />
                    <ListItem {...this.props} />
                </div>
            </div>
        </div>);
    }
}
