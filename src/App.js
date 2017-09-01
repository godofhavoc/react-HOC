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

const fetchData = (dataDepsFn) => (Component) =>
    class extends React.Component {
        state = {
            isLoading: true,
            data: {}
        };

        componentDidMount() {
            const dataDeps = dataDepsFn(this.props);
            const promises = Object.keys(dataDeps)
                .map(key => fetch(dataDeps[key], key));

            const mergeData = (obj, data) => ({ ...obj, ...data });

            Promise.all(promises)
                .then(data => data.reduce(mergeData, {}))
                .then(dataObj => this.setState({
                    data: dataObj,
                    isLoading: false
                }));
        }

        render() {
            const { isLoading, data } = this.state;
            return isLoading ? <Loader /> : <Component { ...this.props } { ...data } />;
        }
    }

const dataDependencies = (props) => {
    user: `/api/user/${props.userId}`
};

@fetchData(dataDependencies)
class User extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div>User: { user.name }</div>
        );
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
