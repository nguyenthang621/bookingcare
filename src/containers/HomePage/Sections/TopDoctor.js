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
        console.log(doctor);
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
        return (
            <div className={`section-container ${this.props.background}`}>
                <div className="section-content">
                    <div className="section-header">
                        <span className="section-title">
                            <FormattedMessage id="homepage.out-standing-doctor" />
                        </span>
                        <button className="more">
                            <FormattedMessage id="homepage.more" />
                        </button>
                    </div>
                    <Slider {...settings}>
                        {topDoctors &&
                            topDoctors.length > 0 &&
                            topDoctors.map((doctor) => {
                                let imagebase64 = '';
                                if (doctor.image) {
                                    imagebase64 = new Buffer(doctor.image, 'base64').toString('binary');
                                }
                                let nameVi = `${doctor.positionData.valueVi}, ${doctor.firstName} ${doctor.lastName} `;
                                let nameEn = `${doctor.positionData.valueEn}, ${doctor.lastName} ${doctor.firstName} `;
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
                                                    src={!imagebase64 ? this.props.image : imagebase64}
                                                    alt="img"
                                                />
                                            </div>

                                            <h4 className="position">
                                                {this.props.languageRedux === LANGUAGES.VI ? nameVi : nameEn}
                                            </h4>

                                            <p className={`text-${this.props.type}`}>{doctor.email}</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchKeyFromRedux: () => dispatch(actions.fetchKeyForm()),
        fetchTopDoctorRedux: (limit) => dispatch(actions.fetchTopDoctor(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopDoctor));
