import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './DetailDoctor.scss';
import DoctorSchedule from './DoctorSchedule';
import BookingModal from './BookingModal';
import IntroDoctor from './IntroDoctor';
import { Link } from 'react-router-dom';
import Comment from '../SocialPlugin/Comment';

import { getDetailDoctorService } from '../../../services/doctorServices';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCurrentDoctor: '',
            isShowModalBooking: false,
            currentRangeTime: '',

            doctorId: '',
        };
    }
    async componentDidMount() {
        let doctorId = this.props.doctorId ? this.props.doctorId : this.props.match.params.id;

        let detailDoctor = await getDetailDoctorService(doctorId);
        if (detailDoctor) {
            this.setState({
                dataCurrentDoctor: detailDoctor.data,
                doctorId: doctorId,
            });
        }
    }
    async componentDidUpdate(prevProps) {
        if (
            prevProps.doctorsRedux !== this.props.doctorsRedux ||
            prevProps.selectedProvinceIdRedux !== this.props.selectedProvinceIdRedux
        ) {
        }
    }
    toggleModel = () => {
        this.setState({
            isShowModalBooking: !this.state.isShowModalBooking,
        });
    };
    handleShowModal = (rangeTime) => {
        this.toggleModel();
        this.setState({
            currentRangeTime: rangeTime,
        });
    };

    render() {
        let { languageRedux, typeStyle } = this.props;
        let { dataCurrentDoctor, isShowModalBooking, currentRangeTime, doctorId } = this.state;

        let nameDoctor = '';
        if (dataCurrentDoctor && dataCurrentDoctor.positionData) {
            nameDoctor =
                languageRedux === LANGUAGES.VI
                    ? `${dataCurrentDoctor.positionData.valueVi}, ${dataCurrentDoctor.firstName} ${dataCurrentDoctor.lastName}`
                    : `${dataCurrentDoctor.positionData.valueEn}, ${dataCurrentDoctor.lastName} ${dataCurrentDoctor.firstName}`;
        }

        const currentURL = process.env.REACT_APP_IS_LOCALHOST == 1 ? window.location.href : 'https://bookingcare.vn';
        return (
            <div className="doctor-container">
                {isShowModalBooking && (
                    <BookingModal
                        toggleModel={this.toggleModel}
                        isShowModalBooking={isShowModalBooking}
                        rangeTimeData={currentRangeTime}
                        doctorId={doctorId}
                        nameDoctor={nameDoctor}
                        dataCurrentDoctor={dataCurrentDoctor}
                    />
                )}
                <div
                    className={
                        typeStyle === 'specialty' ? ' detail-doctor-container mr0 specialty' : 'detail-doctor-container'
                    }
                >
                    <div className={typeStyle === 'specialty' ? 'left' : ''}>
                        {typeStyle === 'specialty' ? (
                            <Link style={{ textDecoration: 'none' }} to={`/detail-doctor/${doctorId}`}>
                                {dataCurrentDoctor && (
                                    <IntroDoctor typeStyle={typeStyle} dataCurrentDoctor={dataCurrentDoctor} />
                                )}
                            </Link>
                        ) : (
                            <div className="intro-doctor-container">
                                {dataCurrentDoctor && (
                                    <IntroDoctor
                                        dataHref={currentURL}
                                        typeStyle={typeStyle}
                                        dataCurrentDoctor={dataCurrentDoctor}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        className={
                            typeStyle === 'specialty'
                                ? 'schedule-doctor-container right'
                                : 'schedule-doctor-container coverArea'
                        }
                    >
                        {dataCurrentDoctor && (
                            <DoctorSchedule
                                typeStyle={typeStyle}
                                doctorId={doctorId}
                                handleShowModal={this.handleShowModal}
                                dataCurrentDoctor={dataCurrentDoctor}
                            />
                        )}
                    </div>
                    {typeStyle === 'specialty' ? (
                        ''
                    ) : (
                        <div className="detail-about-doctor">
                            {dataCurrentDoctor &&
                                dataCurrentDoctor.Markdown &&
                                dataCurrentDoctor.Markdown.contentHTML && (
                                    <>
                                        <div
                                            className="detail-container"
                                            dangerouslySetInnerHTML={{ __html: dataCurrentDoctor.Markdown.contentHTML }}
                                        ></div>
                                        <div className="comment-doctor"></div>
                                    </>
                                )}
                        </div>
                    )}
                </div>
                {!typeStyle && <Comment dataHref={currentURL} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
