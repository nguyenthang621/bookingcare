import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './ManageSchedule.scss';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { IoCheckboxOutline } from 'react-icons/io5';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctor: [],
            selectedDoctor: '',
            initDate: new Date().setHours(0, 0, 0, 0),
            // dateSelected: moment(new Date()).format(dateFormat.SEND_TO_SERVER),
            listSchedule: [],
            scheduleDoctorCurrent: '',
            isSelectedAll: false,
        };
    }

    async componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllcodeScheduleRedux();

        this.setState({
            selectedDoctor: this.props.userInfo?.id,
        });

        if (this.props.roleId === 'R2') {
            await this.props.getScheduleDoctorByDateRedux(this.props.userInfo?.id, this.state.initDate);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let listDoctor = this.buildInputSelect(this.props.allDoctorRedux);
            this.setState({
                allDoctor: listDoctor,
            });
        }
        if (prevProps.languageRedux !== this.props.languageRedux) {
            let listDoctor = this.buildInputSelect(this.props.allDoctorRedux);
            this.setState({
                allDoctor: listDoctor,
            });
        }
        if (prevProps.scheduleDoctorCurrentRedux !== this.props.scheduleDoctorCurrentRedux) {
            let { listSchedule } = this.state;
            let { scheduleDoctorCurrentRedux } = this.props;
            let arrScheduleSelected = scheduleDoctorCurrentRedux.map((item) => item.timeType);
            listSchedule.map((item) => {
                if (arrScheduleSelected.includes(item.keyMap)) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            });
            this.setState({
                listSchedule: listSchedule,
            });
        }
        if (prevProps.scheduleRedux !== this.props.scheduleRedux) {
            let data = this.props.scheduleRedux;
            if (data && data.length > 0) {
                data = data.map((item) => {
                    item.isSelected = false;
                    return item;
                });
            }
            this.setState({
                listSchedule: data,
            });
        }
    }
    handleChangeInput = () => {
        let { listSchedule, isSelectedAll } = this.state;
        if (!isSelectedAll) {
            listSchedule.map((item) => (item.isSelected = true));
        } else {
            listSchedule.map((item) => (item.isSelected = false));
        }
        this.setState({
            isSelectedAll: !this.state.isSelectedAll,
            listSchedule: listSchedule,
        });
    };
    // change doctor:
    handleChange = async (selectedDoctor) => {
        await this.props.getScheduleDoctorByDateRedux(selectedDoctor.value, this.state.initDate);
        this.setState({
            selectedDoctor: selectedDoctor,
            scheduleDoctorCurrent: this.props.scheduleDoctorCurrentRedux,
        });
    };

    buildInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            result = data.map((item) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = this.props.languageRedux === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                return object;
            });
        }
        return result;
    };

    handleSetDate = async (date) => {
        let { selectedDoctor } = this.state;
        let { roleId } = this.props;
        if (!_.isEmpty(selectedDoctor) && roleId === 'R1') {
            await this.props.getScheduleDoctorByDateRedux(selectedDoctor.value, date.setHours(0, 0, 0, 0));
        } else if (selectedDoctor) {
            await this.props.getScheduleDoctorByDateRedux(selectedDoctor, date.setHours(0, 0, 0, 0));
        }
        this.setState({
            initDate: date.setHours(0, 0, 0, 0),
            isSelectedAll: false,
        });
    };
    handleClickRange = (rangeTime) => {
        let { listSchedule } = this.state;
        if (listSchedule && listSchedule.length > 0) {
            listSchedule.map((item) => {
                if (rangeTime.id === item.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            this.setState({
                listSchedule: listSchedule,
            });
        }
    };

    handleClickSaveSchedule = () => {
        let { listSchedule, selectedDoctor, initDate } = this.state;
        let arrResult = [];
        listSchedule.forEach((item) => {
            let object = {};
            if (item.isSelected === true) {
                object.doctorId = selectedDoctor.value;
                object.date = initDate;
                object.timeType = item.keyMap;
                return arrResult.push(object);
            }
        });
        if (this.props.roleId === 'R2') {
            this.props.saveScheduleDoctorRedux({
                arrSchedule: arrResult,
                date: initDate,
            });
        } else {
            if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
                toast.warning('Select doctor');
                return;
            }
            if (arrResult && arrResult.length > 0) {
                this.props.saveScheduleDoctorRedux({
                    arrSchedule: arrResult,
                    doctorId: selectedDoctor.value,
                    date: initDate,
                });
            } else {
                toast.warning('Missing information range date');
            }
        }
    };

    render() {
        let { allDoctor, initDate, listSchedule, isSelectedAll } = this.state;
        let { languageRedux, roleId } = this.props;

        return (
            <div className="manage-schedule-container">
                <div className="title">
                    <h2>
                        <FormattedMessage id="schedule.title" />
                    </h2>
                </div>
                <div className="wrapper">
                    <div className="form-row">
                        {roleId === 'R1' && (
                            <div className="form-group col-md-4">
                                <label>
                                    <FormattedMessage id="schedule.chooseDoctor" />
                                </label>
                                <Select onChange={(e) => this.handleChange(e)} options={allDoctor} />
                            </div>
                        )}
                        <div className="form-group col-md-2">
                            <label>
                                <FormattedMessage id="schedule.chooseDate" />
                            </label>

                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                selected={initDate}
                                onChange={(date) => this.handleSetDate(date)}
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                    <div className="inputSelectAll">
                        <div
                            className={isSelectedAll ? 'selectedAll active' : 'selectedAll'}
                            onClick={() => this.handleChangeInput()}
                        >
                            <p>Chọn tất cả</p>
                            {isSelectedAll && <IoCheckboxOutline />}
                        </div>
                    </div>
                    <div className="col-12 schedule-container">
                        {listSchedule.map((range) => {
                            return (
                                <div
                                    key={range.id}
                                    className={range.isSelected ? 'range-time selected' : 'range-time'}
                                    onClick={() => {
                                        this.handleClickRange(range);
                                    }}
                                >
                                    {languageRedux === LANGUAGES.EN ? range.valueEn : range.valueVi}
                                </div>
                            );
                        })}
                    </div>
                    <button className="btn btn-primary btn-saveSchedule" onClick={() => this.handleClickSaveSchedule()}>
                        <FormattedMessage id="schedule.save" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        roleId: state.user.roleId,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        allDoctorRedux: state.doctor.allDoctor,
        languageRedux: state.app.language,
        scheduleRedux: state.doctor.schedule,
        scheduleDoctorCurrentRedux: state.doctor.scheduleDoctorCurrent,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleRedux: () => dispatch(actions.fetchAllcodeSchedule()),
        saveScheduleDoctorRedux: (data) => dispatch(actions.saveScheduleDoctor(data)),
        getScheduleDoctorByDateRedux: (doctorId, date) => dispatch(actions.getScheduleDoctorByDate(doctorId, date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
