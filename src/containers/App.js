import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils';
import Home from '../routes/Home';
import Login2 from './Auth/Login2';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import DetailHandbook from './Patient/Handbook/DetailHandbook';
import DetailNews from './Patient/News/DetailNews';
import DetailUser from './Patient/DetailUser/DetailUser';
import HomePage from './HomePage/HomePage';
import System from '../routes/System';
import 'react-toastify/dist/ReactToastify.css';
import Doctor from '../routes/Doctor';
import ListSpecialty from './Patient/Specialty/ListSpecialty';

import * as actions from '../store/actions';

import CustomScrollbars from '../components/CustomScrollbars';
import VerifyBooking from './Patient/VerifyBooking';

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    async componentDidMount() {
        this.handlePersistorState();
    }
    async componentDidUpdate(prevProps) {}

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ width: '100%', height: '100vh' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={userIsAuthenticated(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login2)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />
                                    <Route path={path.DETAIL_NEWS} component={DetailNews} />
                                    <Route path={path.USER_DETAIL} component={DetailUser} />
                                    {/* ----------- */}
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.VERIFY_BOOING} component={VerifyBooking} />
                                </Switch>
                            </CustomScrollbars>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
