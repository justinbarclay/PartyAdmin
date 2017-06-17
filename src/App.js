import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Full from './containers/Full';
import Simple from './containers/Simple';
import { connect, Provider } from 'react-redux'
import { setAuthState } from './actions/auth';
class App extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(setAuthState(window.localStorage.getItem('jwt') ? true : false ));
    }
    render() {
        let signedout = (
            <Simple login={this.authStateChange} />
        );

        let signedin = (
            <Full store={this.props.store} />
        );

        let app = this.props.auth ? signedin : signedout;
        return (
            <Provider {...this.props}>
                {app}
            </Provider>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth.state
    }
}
App = withRouter(connect(mapStateToProps)(App));
export default App;
