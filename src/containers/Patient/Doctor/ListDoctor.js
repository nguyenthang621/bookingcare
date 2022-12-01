import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { BsLightbulbFill } from 'react-icons/bs';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../Specialty/ListSpecialty.scss';

class ListDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    componentDidUpdate(prevProps) {}

    render() {
        let { modalDoctor, topDoctorsRedux, languageRedux, listDataSpecialtyRedux } = this.props;
        let {} = this.state;

        return (
            <div className="list-specialty-container">
                <Modal
                    className="modal-booking-container"
                    isOpen={modalDoctor}
                    toggle={() => this.props.toggleModel('modalDoctor')}
                    size="mn"
                    centered={false}
                >
                    <ModalHeader toggle={() => this.props.toggleModel('modalDoctor')}>Danh sách bác sĩ</ModalHeader>
                    <ModalBody>
                        <div className="list-specialty-content">
                            {topDoctorsRedux.length > 0 &&
                                topDoctorsRedux.map((item) => {
                                    let nameSpecialty = '';
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName} `;
                                    let idSpecialty = item.Doctor_Infor.specialtyId;
                                    if (idSpecialty) {
                                        nameSpecialty = listDataSpecialtyRedux.filter(
                                            (item) => item.id === idSpecialty,
                                        );
                                        nameSpecialty = nameSpecialty[0].name;
                                    }
                                    return (
                                        <Link className="item" to={`/detail-doctor/${item.id}`} key={item.id}>
                                            <div className="item-specialty" key={item.id}>
                                                <div className={modalDoctor ? 'image-doctor' : 'image-specialty'}>
                                                    <img src={item?.image} alt="img"></img>
                                                </div>
                                                <div className="name-doctor">
                                                    <h2>{languageRedux === LANGUAGES.VI ? nameVi : nameEn}</h2>
                                                    <p>{nameSpecialty}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="intro-bookingCare ">
                            <div className="icon">
                                <BsLightbulbFill />
                            </div>
                            <h4>
                                BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người
                                dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và
                                hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                            </h4>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        listDataSpecialtyRedux: state.patient.listDataSpecialty,
        topDoctorsRedux: state.doctor.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
