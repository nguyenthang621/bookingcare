import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import Specialty from '../containers/System/Specialty/Specialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import Header from '../containers/Header/Header';
import SystemWelcome from '../containers/System/SystemWelcome/SystemWelcome';
import { withRouter } from 'react-router';
import * as actions from '../store/actions';

import { TYPE_USER } from '../utils';

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        let { roleId } = this.props;
        if (roleId === 'R3' || !roleId) {
            await this.props.processLogout();
            this.props.history.push(`/login`);
        }
    }
    render() {
        const { systemMenuPath, roleId } = this.props;

        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {roleId === TYPE_USER.ADMIN && (
                            <Switch>
                                <Route path="/system/user-redux" component={UserRedux} />
                                <Route path="/system/manage-doctor" component={ManageDoctor} />
                                <Route path="/system/manage-specialty" component={Specialty} />
                                <Route path="/system/manage-clinic" component={ManageClinic} />
                                <Route path="/system/welcome" component={SystemWelcome} />
                                <Route
                                    component={() => {
                                        return <Redirect to={SystemWelcome} />;
                                    }}
                                />
                            </Switch>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        roleId: state.user.roleId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(System));
