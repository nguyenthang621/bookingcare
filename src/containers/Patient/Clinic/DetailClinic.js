import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader/HomeHeader';
import { getDetailClinicByIdServices } from '../../../services/patientServices';
import { MdAddLocation } from 'react-icons/md';
import DetailDoctor from '../../Patient/Doctor/DetailDoctor';
import { BsLightbulbFill } from 'react-icons/bs';
import Footer from '../../HomePage/Sections/Footer';

import './DetailClinic.scss';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicData: {},
            doctors: [],
        };
    }
    async componentDidMount() {
        let { match } = this.props;
        if (match && match.params && match.params.id) {
            let clinicId = match.params.id;
            let response = await getDetailClinicByIdServices(clinicId);
            if (response && response.errorCode === 0) {
                this.setState({
                    clinicData: response.data,
                    doctors: response.data.doctors,
                });
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
        }
    }

    render() {
        let {} = this.props;
        let { clinicData, doctors } = this.state;
        return (
            <div className="detail-clinic-wrapper">
                <HomeHeader />
                <div className="detail-clinic-container">
                    <div className="detail-clinic-header">
                        <div className="clinic-header coverArea">
                            <div
                                className="clinic-image"
                                style={{ backgroundImage: `url(${clinicData.imageClinic})` }}
                            ></div>
                            <div className="clinic-intro">
                                <div
                                    className="image-logo"
                                    style={{ backgroundImage: `url(${clinicData.imageLogo})` }}
                                ></div>
                                <div className="intro">
                                    <h1>{clinicData.nameClinic}</h1>
                                    <p>
                                        <MdAddLocation />
                                        <span>{clinicData.addressClinic}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-bookingCare coverArea">
                        <div className="icon">
                            <BsLightbulbFill />
                        </div>
                        <h4>
                            BookingCare l?? N???n t???ng Y t??? ch??m s??c s???c kh???e to??n di???n h??ng ?????u Vi???t Nam k???t n???i ng?????i
                            d??ng v???i tr??n 150 b???nh vi???n - ph??ng kh??m uy t??n, h??n 1,000 b??c s?? chuy??n khoa gi???i v?? h??ng
                            ngh??n d???ch v???, s???n ph???m y t??? ch???t l?????ng cao.
                        </h4>
                    </div>
                    <div
                        className="detail-clinic coverArea"
                        dangerouslySetInnerHTML={{ __html: clinicData.descriptionHtml }}
                    ></div>
                    <div className="doctors-container coverArea">
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
                                    <p>Kh??ng t??m ???????c b??c s??</p>
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
