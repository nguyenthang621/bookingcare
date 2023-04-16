import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { FormattedMessage } from 'react-intl';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

// import './TopDoctor.scss';
import { PrevArrow, NextArrow } from '../../../components/CustomArrow';

class TopDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        };
    }

    componentDidMount() {
        this.props.fetchTopDoctorRedux('');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                topDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    handleClickDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: this.props.slideShow,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        let { topDoctors } = this.state;
        let { listDataSpecialtyRedux } = this.props;
        return (
            <div className={`section-container ${this.props.background}`}>
                <div className="w60">
                    <div className="section-content">
                        <div className="section-header">
                            <span className="section-title">
                                <FormattedMessage id="homepage.out-standing-doctor" />
                            </span>
                            <button
                                className="more"
                                onClick={() => {
                                    this.props.toggleModel(this.props.modal);
                                }}
                            >
                                <FormattedMessage id="homepage.more" />
                            </button>
                        </div>
                        <Slider {...settings}>
                            {topDoctors &&
                                topDoctors.length > 0 &&
                                topDoctors.map((doctor) => {
                                    let nameSpecialty = '';
                                    let nameVi = `${doctor.positionData.valueVi}, ${doctor.firstName} ${doctor.lastName} `;
                                    let nameEn = `${doctor.positionData.valueEn}, ${doctor.lastName} ${doctor.firstName} `;
                                    let idSpecialty = doctor.Doctor_Infor.specialtyId;
                                    if (idSpecialty) {
                                        nameSpecialty = listDataSpecialtyRedux.filter(
                                            (item) => item.id === idSpecialty,
                                        );
                                        nameSpecialty = nameSpecialty[0]?.name;
                                    }
                                    return (
                                        <div
                                            className="item-slide hover"
                                            key={doctor.id}
                                            onClick={() => this.handleClickDetailDoctor(doctor)}
                                        >
                                            <div className={`item-${this.props.type}`}>
                                                <div className={`img-${this.props.type}`}>
                                                    <img
                                                        className="img"
                                                        src={
                                                            doctor?.imageURL ||
                                                            'https://firebasestorage.googleapis.com/v0/b/bookingcare-6a74c.appspot.com/o/files%2Fuser%2Fuser_d%C3%A8ault.png?alt=media&token=22bdda3a-856e-416d-bce5-b9e52a6004c7'
                                                        }
                                                        alt="img"
                                                    />
                                                </div>

                                                <h4 className="position">
                                                    {this.props.languageRedux === LANGUAGES.VI ? nameVi : nameEn}
                                                </h4>

                                                {nameSpecialty && (
                                                    <p className={`text-${this.props.type}`}>{nameSpecialty}</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languageRedux: state.app.language,
        keyForm: state.admin.keyForm,
        topDoctorsRedux: state.doctor.topDoctors,
        listDataClinicRedux: state.patient.listDataClinic,
        listDataSpecialtyRedux: state.patient.listDataSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchKeyFromRedux: () => dispatch(actions.fetchKeyForm()),
        fetchTopDoctorRedux: (limit) => dispatch(actions.fetchTopDoctor(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopDoctor));
