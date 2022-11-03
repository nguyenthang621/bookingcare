import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../../../containers/Header/Header';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './ManageSchedule.scss';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctor: [],
            selectedDoctor: '',
            initDate: new Date().setHours(0, 0, 0, 0),
            // dateSelected: moment(new Date()).format(dateFormat.SEND_TO_SERVER),
            listSchedule: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllcodeScheduleRedux();
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

    handleChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor,
        });
    };

    buildInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            result = data.map((item, index) => {
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

    handleSetDate = (date) => {
        this.setState({
            initDate: date.setHours(0, 0, 0, 0),
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
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.warning('Missing information doctor');
            return;
        }
        listSchedule.forEach((item) => {
            let object = {};
            if (item.isSelected === true) {
                object.doctorId = selectedDoctor.value;
                object.date = initDate;
                object.timeType = item.keyMap;
                return arrResult.push(object);
            }
        });
        if (arrResult && arrResult.length > 0) {
            this.props.saveScheduleDoctorRedux({
                arrSchedule: arrResult,
                doctorId: selectedDoctor.value,
                date: initDate,
            });
        } else {
            toast.warning('Missing information range date');
        }
    };

    render() {
        let { allDoctor, initDate, listSchedule } = this.state;
        let { languageRedux } = this.props;
        return (
            <div className="manage-schedule-container">
                {this.props.isLoggedIn && <Header />}
                <div className="title">
                    <h2>
                        <FormattedMessage id="schedule.title" />
                    </h2>
                </div>
                <div className="wrapper">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>
                                <FormattedMessage id="schedule.chooseDoctor" />
                            </label>
                            <Select onChange={(e) => this.handleChange(e)} options={allDoctor} />
                        </div>
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
        isLoggedIn: state.user.isLoggedIn,
        allDoctorRedux: state.doctor.allDoctor,
        languageRedux: state.app.language,
        scheduleRedux: state.doctor.schedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleRedux: () => dispatch(actions.fetchAllcodeSchedule()),
        saveScheduleDoctorRedux: (data) => dispatch(actions.saveScheduleDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
