import React, {
    Component
} from 'react';

export default class ListInput extends Component {
    constructor( props ) {
        super( props );

        // these are the component state variables
        // everytime they change, the render() is 
        // executed
        this.state = {
            listItemVal: '' 
        };
    }
    click( e ) {
        this.props.ee.emit('newTask', this.state.listItemVal);
        this.setState({
            listItemVal: '',
        });
    }
    change( e ) {
        this.setState({
            listItemVal: e.target.value,
        });
    }
    render() {
        return (<div className="ui input fluid huge">
            <input 
                type="text"
                placeholder="Add item to do..."
                value={this.state.listItemVal} 
                onChange={(e) => this.change(e)} />
            <button className="ui primary button" onClick={(e) => this.click(e)}>Submit</button>
        </div>);
    }
}

