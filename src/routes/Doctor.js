import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManageAppointment from '../containers/System/Doctor/ManageAppointment';
import { TYPE_USER } from '../utils';

import Header from '../containers/Header/Header';

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}
    render() {
        let { roleId } = this.props;
        let isAuth = roleId === TYPE_USER.DOCTOR || roleId === TYPE_USER.ADMIN;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {isAuth && (
                            <Switch>
                                <Route path="/doctor/manage-schedule" exact component={ManageSchedule} />
                                <Route path="/doctor/manage-patient-appointment" component={ManageAppointment} />
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
        isLoggedIn: state.user.isLoggedIn,
        roleId: state.user.roleId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);