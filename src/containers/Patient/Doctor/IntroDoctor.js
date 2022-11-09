import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import './IntroDoctor.scss';
import { MdAddLocation } from 'react-icons/md';

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
        let { dataCurrentDoctor, typeStyle } = this.props;
        let { nameDoctor, provinceDoctor } = this.state;

        return (
            <div className="intro-doctor">
                <div className="image-doctor">
                    <img
                        className={typeStyle === 'specialty' ? 'size-specialty' : ''}
                        src={dataCurrentDoctor.image}
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
