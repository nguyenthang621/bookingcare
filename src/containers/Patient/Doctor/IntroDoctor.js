import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './IntroDoctor.scss';
import { MdAddLocation } from 'react-icons/md';
import LikeAndShare from '../SocialPlugin/LikeAndShare';

class IntroDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            nameDoctor: '',
            provinceDoctor: '',
        };
    }
    async componentDidMount() {
        let { dataCurrentDoctor, languageRedux } = this.props;

        this.buildNameAndProvinceByLanguage(dataCurrentDoctor, languageRedux);
    }
    componentDidUpdate(prevProps) {
        let { dataCurrentDoctor, languageRedux } = this.props;
        if (prevProps.languageRedux !== this.props.languageRedux) {
            this.buildNameAndProvinceByLanguage(dataCurrentDoctor, languageRedux);
        }
    }
    buildNameAndProvinceByLanguage = (dataCurrentDoctor, languageRedux) => {
        let nameDoctor = '';
        let provinceDoctor = '';
        if (dataCurrentDoctor && dataCurrentDoctor.positionData) {
            nameDoctor =
                languageRedux === LANGUAGES.VI
                    ? `${dataCurrentDoctor.positionData.valueVi}, ${dataCurrentDoctor.firstName} ${dataCurrentDoctor.lastName}`
                    : `${dataCurrentDoctor.positionData.valueEn}, ${dataCurrentDoctor.lastName} ${dataCurrentDoctor.firstName}`;
        }
        if (dataCurrentDoctor && dataCurrentDoctor.Doctor_Infor && dataCurrentDoctor.Doctor_Infor.provinceData) {
            provinceDoctor =
                languageRedux === LANGUAGES.VI
                    ? dataCurrentDoctor.Doctor_Infor.provinceData.valueVi
                    : dataCurrentDoctor.Doctor_Infor.provinceData.valueEn;
        }
        this.setState({
            nameDoctor: nameDoctor,
            provinceDoctor: provinceDoctor,
        });
    };

    render() {
        let { dataCurrentDoctor, typeStyle, dataHref } = this.props;
        let { nameDoctor, provinceDoctor } = this.state;

        return (
            <div className="intro-doctor">
                <div className="image-doctor">
                    <img
                        className={typeStyle === 'specialty' ? 'size-specialty' : ''}
                        src={
                            dataCurrentDoctor?.imageURL ||
                            'https://firebasestorage.googleapis.com/v0/b/bookingcare-6a74c.appspot.com/o/files%2Fuser%2Fuser_d%C3%A8ault.png?alt=media&token=22bdda3a-856e-416d-bce5-b9e52a6004c7'
                        }
                        alt="img"
                    />
                    {typeStyle === 'specialty' && <span className="more-detail-doctor">Xem thêm</span>}
                </div>
                <div className="about-doctor">
                    <h2
                        className={typeStyle === 'specialty' ? 'info font-specialty' : ''}
                        src={dataCurrentDoctor.image}
                    >
                        {nameDoctor}
                    </h2>
                    <p className="about">
                        {dataCurrentDoctor &&
                            dataCurrentDoctor.Markdown &&
                            dataCurrentDoctor.Markdown.description &&
                            `${dataCurrentDoctor.Markdown.description}`}
                    </p>
                    <LikeAndShare dataHref={dataHref} />
                    {typeStyle === 'specialty' && (
                        <span className="address-doctor">
                            <MdAddLocation />
                            {provinceDoctor && <p>{provinceDoctor}</p>}
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        detailDoctorRedux: state.doctor.detailDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroDoctor);
