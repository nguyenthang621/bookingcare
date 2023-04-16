import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { getDetailClinicByIdServices } from '../../../services/patientServices';
import { MdAddLocation } from 'react-icons/md';
import DetailDoctor from '../../Patient/Doctor/DetailDoctor';
import { BsLightbulbFill } from 'react-icons/bs';

import './DetailClinic.scss';
import FooterContent from '../../HomePage/FooterContent';

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
        let { clinicData, doctors } = this.state;
        return (
            <div className="detail-clinic-wrapper position-loading">
                {/* <HomeHeader /> */}
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
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người
                            dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng
                            nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </h4>
                    </div>
                    <div
                        className="detail-clinic coverArea"
                        dangerouslySetInnerHTML={{ __html: clinicData.descriptionHtml }}
                    ></div>
                    {doctors?.length > 0 && (
                        <div className="doctors-container coverArea">
                            <h4 className="title-doctors">Bác sĩ</h4>
                            <div className="doctors">
                                {doctors &&
                                    doctors.length > 0 &&
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
                                    })}
                            </div>
                        </div>
                    )}
                    <div className="coverArea">
                        <FooterContent />
                    </div>
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
    return {
        getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
