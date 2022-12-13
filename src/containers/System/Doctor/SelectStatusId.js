import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import 'react-datepicker/dist/react-datepicker.css';

import _ from 'lodash';
import { getAppointmentDoctor } from '../../../store/actions';

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
        let { listSelect, statusId } = this.props;
        return (
            <React.Fragment>
                <div
                    className={
                        statusId === listSelect.states.new
                            ? `form-check form-check-inline select-active`
                            : 'form-check form-check-inline'
                    }
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value={listSelect.states.new}
                        onChange={(e) => this.props.handleChangeInput(e)}

                        // hidden
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                        {listSelect.new}
                    </label>
                </div>
                <div
                    className={
                        statusId === listSelect.states.confirmed
                            ? `form-check form-check-inline select-active`
                            : 'form-check form-check-inline'
                    }
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value={listSelect.states.confirmed}
                        onChange={(e) => this.props.handleChangeInput(e)}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                        {listSelect.confirmed}
                    </label>
                </div>
                <div
                    className={
                        statusId === listSelect.states.canceled
                            ? `form-check form-check-inline select-active`
                            : 'form-check form-check-inline'
                    }
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio3"
                        value={listSelect.states.canceled}
                        onChange={(e) => this.props.handleChangeInput(e)}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                        {listSelect.canceled}
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
