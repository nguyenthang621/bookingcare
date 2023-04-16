import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from 'react-datepicker';
import RemedyModal from './RemedyModal';
import 'react-datepicker/dist/react-datepicker.css';
import './ManageAppointment.scss';
import { classCookies } from '../../../cookies';
import { FaUserMd } from 'react-icons/fa';
import Loading from '../../../components/Loading';
import SelectStatusId from '../../../components/SelectStatusId';
import ModalConfirm from '../ModalConfirm.js';

import moment from 'moment';

class ManageAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: classCookies.getDataAccessToken().id,
            initDate: new Date().setHours(0, 0, 0, 0),
            listAppointment: [],
            doctorInfo: classCookies.getDataAccessToken(),
            isShowModalRemedy: false,

            currentPatient: '',
            isLoading: false,
            isRemind: false,
            isShowModalConfirm: false,
        };
    }

    async componentDidMount() {
        let { doctorId, initDate } = this.state;
        await this.props.getAppointmentDoctorRedux(doctorId, initDate, this.props.statusIdRedux);
    }
    componentDidUpdate(prevProps) {
        let { listAppointmentRedux } = this.props;
        if (prevProps.listAppointmentRedux !== listAppointmentRedux) {
            this.setState({
                listAppointment: listAppointmentRedux,
            });
        }
    }

    handleSetDate = async (date) => {
        let { doctorId } = this.state;
        let currentSelectedDate = date.setHours(0, 0, 0, 0);
        let response = await this.props.getAppointmentDoctorRedux(
            doctorId,
            currentSelectedDate,
            this.props.statusIdRedux,
        );
        if (response && response.data && response.data.length > 0) {
            this.setState({
                initDate: currentSelectedDate,
            });
        } else {
            this.setState({
                initDate: currentSelectedDate,
            });
        }
    };
    toggleModel = () => {
        this.setState({
            isShowModalRemedy: !this.state.isShowModalRemedy,
        });
    };
    toggleModelConfirm = () => {
        this.setState({
            isShowModalConfirm: !this.state.isShowModalConfirm,
        });
    };

    handleClickConfirm = (item, isRemind) => {
        this.setState({
            currentPatient: item,
            isRemind: isRemind,
        });
        this.toggleModel();
    };
    // change input radio
    handleChangeInput = async (id) => {
        let { doctorId, initDate } = this.state;
        await this.props.changeStatusIdRedux(id);
        await this.props.getAppointmentDoctorRedux(doctorId, initDate, this.props.statusIdRedux);
    };

    handleClickCancel = (item) => {
        this.setState({
            currentPatient: item,
        });
        this.toggleModelConfirm();
    };

    render() {
        let {
            initDate,
            listAppointment,
            doctorInfo,
            isShowModalRemedy,
            currentPatient,
            doctorId,
            isLoading,
            isShowModalConfirm,
        } = this.state;
        let { languageRedux, statusIdRedux } = this.props;

        let listSelect = [
            { text: <FormattedMessage id="appointment.newSchedule" />, id: 'S2' },
            { text: <FormattedMessage id="appointment.confirmed" />, id: 'S3' },
            { text: <FormattedMessage id="appointment.canceled" />, id: 'S4' },
        ];

        return (
            <div className="manage-schedule-container mt-2">
                {isLoading && (
                    <div className="loading-container">
                        <div className="icon-loading">
                            <Loading />
                        </div>
                    </div>
                )}
                {isShowModalRemedy ? (
                    <RemedyModal
                        currentPatient={currentPatient}
                        toggleModel={this.toggleModel}
                        isShowModalRemedy={isShowModalRemedy}
                        doctorId={doctorId}
                        initDate={initDate}
                    />
                ) : (
                    ''
                )}
                {isShowModalConfirm ? (
                    <ModalConfirm
                        currentPatient={currentPatient}
                        toggleModel={this.toggleModel}
                        isShowModalConfirm={isShowModalConfirm}
                        toggleModelConfirm={this.toggleModelConfirm}
                        handleDestroy={this.handleDestroy}
                        text="Xoá lịch hẹn này :("
                        doctorId={doctorId}
                        initDate={initDate}
                        type="cancel-appointment"
                    />
                ) : (
                    ''
                )}
                <div className="title">
                    <h2>
                        <FormattedMessage id="appointment.title" />
                    </h2>
                </div>
                <div className="wrapper">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label>
                                <FormattedMessage id="appointment.doctor" />
                            </label>

                            <div className="doctor-info-container">
                                <div className="doctor-info">
                                    <span className="iconDoctor">
                                        <FaUserMd />
                                    </span>
                                    {doctorInfo && <p>{`${doctorInfo?.firstName} ${doctorInfo?.lastName} `}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-md-3 ">
                            <label>
                                <FormattedMessage id="appointment.chooseDate" />
                            </label>

                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                selected={initDate}
                                onChange={(date) => this.handleSetDate(date)}
                                // minDate={new Date()}
                            />
                        </div>
                    </div>
                    <div className="table-appointment-container mt-5">
                        <div className="title-table">
                            <span>
                                <FormattedMessage id="appointment.appointment-title" />{' '}
                                {moment(initDate).locale(languageRedux).format('LL')}
                            </span>
                            <span>
                                <SelectStatusId
                                    handleChangeInput={this.handleChangeInput}
                                    listSelect={listSelect}
                                    appointment
                                    statusId={statusIdRedux}
                                />
                            </span>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <FormattedMessage id="appointment.stt" />
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id="appointment.time" />
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id="appointment.fullname" />
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id="appointment.birth" />
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id="appointment.gender" />
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id="appointment.address" />
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id="appointment.reason" />
                                    </th>
                                    {statusIdRedux === 'S2' && (
                                        <th scope="col">
                                            <FormattedMessage id="appointment.confirm" />
                                        </th>
                                    )}
                                    {statusIdRedux === 'S3' && (
                                        <th scope="col">
                                            <FormattedMessage id="appointment.remind" />
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {listAppointment && listAppointment.length > 0 ? (
                                    listAppointment.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    {languageRedux === LANGUAGES.VI
                                                        ? item.timeAppointment.valueVi
                                                        : item.timeAppointment.valueEn}
                                                </td>
                                                <td>{item.namePatient}</td>
                                                <td>{item.YearOfBirth}</td>
                                                <td>
                                                    {' '}
                                                    {languageRedux === LANGUAGES.VI
                                                        ? item.genderDT.valueVi
                                                        : item.genderDT.valueEn}
                                                </td>
                                                <td>{item.address}</td>
                                                <td>{item.reason}</td>
                                                <td>
                                                    {statusIdRedux === 'S2' && (
                                                        <span>
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                onClick={() => this.handleClickConfirm(item, false)}
                                                            >
                                                                <FormattedMessage id="appointment.confirm" />
                                                            </button>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => this.handleClickCancel(item)}
                                                            >
                                                                <FormattedMessage id="appointment.cancel" />
                                                            </button>
                                                        </span>
                                                    )}
                                                    {statusIdRedux === 'S3' && (
                                                        <button
                                                            className="btn btn-warning"
                                                            onClick={() => this.handleClickConfirm(item, true)}
                                                        >
                                                            <FormattedMessage id="appointment.remind" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr className="title-no-appointment">
                                        <FormattedMessage id="appointment.noAppointment" />
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
        changeStatusIdRedux: (statusId) => dispatch(actions.changeStatusId(statusId)),
        getAppointmentDoctorRedux: (doctorId, initDate, statusId) =>
            dispatch(actions.getAppointmentDoctor(doctorId, initDate, statusId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAppointment);
