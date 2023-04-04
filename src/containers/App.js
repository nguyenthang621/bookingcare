import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { history } from '../redux';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils';
import Login from './Auth/Login';
import System from '../routes/System';
import 'react-toastify/dist/ReactToastify.css';
import Doctor from '../routes/Doctor';
import { ToastContainer } from 'react-toastify';
import CustomScrollbars from '../components/CustomScrollbars';

import * as actions from '../store/actions';

import HomePage from './HomePage/HomePage';

import DetailDoctor from '../containers/Patient/Doctor/DetailDoctor';
import DetailSpecialty from '../containers/Patient/Specialty/DetailSpecialty';
import DetailClinic from '../containers/Patient/Clinic/DetailClinic';
import DetailHandbook from '../containers/Patient/Handbook/DetailHandbook';
import DetailNews from '../containers/Patient/News/DetailNews';
import DetailUser from '../containers/Patient/DetailUser/DetailUser';
import VerifyBooking from '../containers/Patient/VerifyBooking';

import withLayoutHome from '../hoc/withLayoutHome';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        await this.props.getAllSpecialtyRedux();
        await this.props.getAllClinicRedux('true');
        await this.props.getHandbookRedux();
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.listDataSpecialtyRedux !== this.props.listDataSpecialtyRedux) {
            this.setState({
                listSpecialty: this.props.listDataSpecialtyRedux,
            });
        }
    }

    toggleModel = (modal) => {
        this.setState({
            [modal]: !this.state[modal],
        });
    };
    render() {
        return (
            <Fragment>
                <div className="main-container">
                    <div className="content-container">
                        <CustomScrollbars style={{ width: '100%', height: '100vh' }}>
                            <Router history={history}>
                                <Switch>
                                    <Route path={path.HOME} exact component={withLayoutHome(HomePage)} />
                                    <Route path={path.HOMEPAGE} exact component={withLayoutHome(HomePage)} />

                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />

                                    <Route path={path.DETAIL_DOCTOR} component={withLayoutHome(DetailDoctor)} />
                                    <Route path={path.DETAIL_SPECIALTY} component={withLayoutHome(DetailSpecialty)} />
                                    <Route path={path.DETAIL_CLINIC} component={withLayoutHome(DetailClinic)} />
                                    <Route path={path.DETAIL_HANDBOOK} component={withLayoutHome(DetailHandbook)} />
                                    <Route path={path.DETAIL_NEWS} component={withLayoutHome(DetailNews)} />
                                    <Route path={path.DETAIL_USER} component={withLayoutHome(DetailUser)} />
                                    <Route path={path.VERIFY_BOOING} component={withLayoutHome(VerifyBooking)} />
                                </Switch>
                            </Router>
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
        getAllSpecialtyRedux: () => dispatch(actions.getAllSpecialty()),
        getHandbookRedux: () => dispatch(actions.getHandbookRedux()),
        getAllClinicRedux: (isGetImage) => dispatch(actions.getAllClinicRedux(isGetImage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
