import React, {Component} from 'react';
import CardList from '../components/CardList';
// import { robots } from './robots';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import '../containers/app.css';

// STATE = an object that describes your app, can be changed
// Props = things that come out of state. receives it from state and cannot be changed
// STATE >> props
// components with state are called SMART COMPONENTS
// life cycle hooks - methods that come with React

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({ robots: users})
        });
}

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value }) 
    }
    
    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        // if (robots.length === 0) {
            return !robots.length ?
             <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <Searchbox searchChange={this.onSearchChange}/>
                    <Scroll>
                    <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                    </Scroll>
                </div>
             );
         }
}

export default App;