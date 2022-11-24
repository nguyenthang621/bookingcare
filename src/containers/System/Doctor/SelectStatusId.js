import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import 'react-datepicker/dist/react-datepicker.css';

import _ from 'lodash';

class SelectStatusId extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        let {} = this.state;
    }
    componentDidUpdate(prevProps) {
        let { statusIdRedux } = this.props;
        if (prevProps.statusIdRedux !== this.props.statusIdRedux) {
        }
    }

    render() {
        let {} = this.state;
        let {} = this.props;
        return (
            <React.Fragment>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="S2"
                        onChange={(e) => this.props.handleChangeInput(e)}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                        <FormattedMessage id="appointment.newSchedule" />
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="S3"
                        onChange={(e) => this.props.handleChangeInput(e)}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                        <FormattedMessage id="appointment.confirmed" />
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio3"
                        value="S4"
                        onChange={(e) => this.props.handleChangeInput(e)}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                        <FormattedMessage id="appointment.cancel" />
                    </label>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctorRedux: state.doctor.allDoctor,
        listAppointmentRedux: state.doctor.listAppointment,
        statusIdRedux: state.doctor.statusId,
        languageRedux: state.app.language,
        userInfoRedux: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleRedux: () => dispatch(actions.fetchAllcodeSchedule()),
        getAppointmentDoctorRedux: (doctorId, initDate, statusId) =>
            dispatch(actions.getAppointmentDoctor(doctorId, initDate, statusId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectStatusId);
