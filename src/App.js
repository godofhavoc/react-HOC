import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const monitor = (component) =>
    class extends Component {
        componentWillMount() {
            const startTime = Date.now();
            this.setState({ startTime });
            console.log('Mounting ', startTime);
        }

        componentDidMount() {
            const endTime = Date.now();
            console.log('Mounted ', endTime);
            console.log('Total Time ', endTime - this.state.startTime);
        }

        render(){
            return <component {...this.props} />;
        }
    }

@monitor
class App extends Component {
    render(){
        return <button>Slick Button</button>;
    }
}

// App = monitor(App)

export default App
