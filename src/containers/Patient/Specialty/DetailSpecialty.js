import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader/HomeHeader';
import { getSpecialtyByIdServices } from '../../../services/patientServices';
import DetailDoctor from '../Doctor/DetailDoctor';
import Select from 'react-select';
import { getAllCodeServices } from '../../../services/userServices';
import Footer from '../../HomePage/Sections/Footer';

import './DetailSpecialty.scss';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            introSpecialty: '',
            backgroundImage: '',
            nameSpecialty: '',
            doctors: [],
            listProvince: [],
            specialtyId: '',
            selectedProvinceId: '',
        };
    }
    async componentDidMount() {
        let { match } = this.props;
        if (match && match.params && match.params.id) {
            let specialtyId = match.params.id;
            let responseSpecialty = await getSpecialtyByIdServices(specialtyId, 'ALL');
            let listProvinceResponse = await getAllCodeServices('PROVINCE');
            this.setState({
                specialtyId: specialtyId,
                introSpecialty: responseSpecialty.data.descriptionHtml,
                backgroundImage: responseSpecialty.data.image,
                nameSpecialty: responseSpecialty.data.name,
                doctors: responseSpecialty.data.doctor_infor,
                listProvince: this.buildInputSelect(listProvinceResponse.data),
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
            this.setState({
                listProvince: this.buildInputSelect(this.state.listProvince),
            });
        }
    }

    buildInputSelect = (data, type) => {
        let result = [];
        data.unshift({ keyMap: 'ALL', valueVi: 'Toàn quốc', valueEn: 'Nationwide' });
        if (data && data.length > 0) {
            result = data.map((item, index) => {
                let object = {};

                object.label = this.props.languageRedux === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;

                return object;
            });
        }

        return result;
    };

    handleChange = async (selectedProvince) => {
        let { specialtyId } = this.state;
        let provinceId = selectedProvince.value;
        if (specialtyId) {
            let responseSpecialty = await getSpecialtyByIdServices(specialtyId, provinceId);
            this.setState({
                selectedProvinceId: provinceId,
                doctors: responseSpecialty.data.doctor_infor,
            });
        }
    };
    render() {
        let {} = this.props;
        let { introSpecialty, backgroundImage, nameSpecialty, doctors, listProvince } = this.state;

        return (
            <div className="detail-specialty-wrapper">
                <HomeHeader />
                <div className="detail-specialty-container">
                    <div className="header-intro" style={{ backgroundImage: `url(${backgroundImage})` }}>
                        <div className="header-image"></div>
                        <div className="header-text coverArea">
                            <div
                                className="detail-specialty"
                                dangerouslySetInnerHTML={{ __html: introSpecialty }}
                            ></div>
                        </div>
                    </div>

                    <div className="doctors-container coverArea">
                        <div className="location">
                            <div className="box-select-province">
                                <Select
                                    placeholder="Toàn quốc"
                                    onChange={(e) => this.handleChange(e)}
                                    options={listProvince}
                                />
                            </div>
                        </div>
                        <div className="doctors">
                            {doctors && doctors.length > 0 ? (
                                doctors.map((item) => {
                                    return (
                                        <div className="sec-doctor" key={item.doctorId}>
                                            <div className="right">
                                                <DetailDoctor
                                                    className="item"
                                                    doctorId={item.doctorId}
                                                    typeStyle="specialty"
                                                    isComponentChild
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-not-found">
                                    <p>Không tìm được bác sĩ</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
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
    return {
        getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
