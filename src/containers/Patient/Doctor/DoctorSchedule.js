import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss';
import moment from 'moment';
import { FaCalendarAlt, FaRegHandPointUp } from 'react-icons/fa';
import ExtraInforDoctor from './ExtraInforDoctor';
import { getScheduleDoctorByDateService } from '../../../services/doctorServices';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDay: [],
            isShowPrice: false,
            listSchedule: [],
        };
    }
    async componentDidMount() {
        let { languageRedux } = this.props;
        this.setOptionsDay(languageRedux);
        let response = await getScheduleDoctorByDateService(this.props.doctorId, new Date().setHours(0, 0, 0, 0));
        this.setState({ listSchedule: response.data });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
            this.setOptionsDay(this.props.languageRedux);
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    setOptionsDay = (language) => {
        let allDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let firstText = language === 'en' ? 'ToDay ' : 'Hôm nay ';
                object.label =
                    firstText +
                    this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').locale(language).format('DD/MM'));
            } else {
                object.label = this.capitalizeFirstLetter(
                    moment(new Date()).add(i, 'days').locale(language).format('dddd - DD/MM'),
                );
            }
            object.timestamp = moment(new Date().setHours(0, 0, 0, 0)).add(i, 'days').valueOf();
            object.value = moment(new Date()).add(i, 'days').format('DD/MM/YYYY');
            allDay.push(object);
        }
        this.setState({
            arrDay: allDay,
        });
    };

    handleChangeSelect = async (e) => {
        let response = await getScheduleDoctorByDateService(this.props.doctorId, e.target.value);
        this.setState({
            listSchedule: response.data,
        });
    };
    handleShowPrice = () => {
        this.setState({ isShowPrice: !this.state.isShowPrice });
    };

    render() {
        let { languageRedux, doctorId, typeStyle, dataCurrentDoctor } = this.props;
        let { arrDay, isShowPrice, listSchedule } = this.state;
        return (
            <div className={typeStyle === 'specialty' ? `schedule-container pd50` : `schedule-container `}>
                <div className="schedule-date">
                    <select className="select-box" onChange={(e) => this.handleChangeSelect(e)}>
                        {arrDay.map((day, index) => {
                            return (
                                <option key={index} value={day.timestamp}>
                                    {day.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="schedule-title">
                    <FaCalendarAlt className="icon-schedule" />
                    <p>
                        <FormattedMessage id="patient.schedule.schedule-title" />
                    </p>
                </div>
                <div className={typeStyle === 'specialty' ? `schedule colum-specialty` : `schedule`}>
                    <div className={typeStyle === 'specialty' ? `schedule-left` : `schedule-left border-specialty`}>
                        <div className="schedule-list">
                            {listSchedule && listSchedule.length > 0 ? (
                                listSchedule.map((rangeTime, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="item-day"
                                            onClick={() => this.props.handleShowModal(rangeTime)}
                                        >
                                            {languageRedux === LANGUAGES.VI
                                                ? rangeTime.timeTypeData.valueVi
                                                : rangeTime.timeTypeData.valueEn}
                                        </div>
                                    );
                                })
                            ) : (
                                <p>
                                    <FormattedMessage id="patient.schedule.text-no-schedule" />
                                </p>
                            )}
                        </div>
                        {listSchedule && listSchedule.length > 0 ? (
                            <div className="text">
                                <span>
                                    <FormattedMessage id="patient.schedule.text1" />{' '}
                                </span>
                                <FaRegHandPointUp />{' '}
                                <span>
                                    <FormattedMessage id="patient.schedule.text2" />
                                </span>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={typeStyle === 'specialty' ? `schedule-info` : `schedule-info pd50`}>
                        {dataCurrentDoctor && (
                            <ExtraInforDoctor
                                isShowPrice={isShowPrice}
                                doctorId={doctorId}
                                dataCurrentDoctor={dataCurrentDoctor}
                            />
                        )}
                        <h3 className="btn-show-price" onClick={() => this.handleShowPrice()}>
                            {isShowPrice ? 'Ẩn bảng giá' : 'Xem chi tiết'}
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
