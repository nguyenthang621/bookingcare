import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { BsLightbulbFill } from 'react-icons/bs';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../Specialty/ListSpecialty.scss';

class ListClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    componentDidUpdate(prevProps) {}

    render() {
        let { modalClinic, listDataClinicRedux } = this.props;
        let {} = this.state;

        return (
            <div className="list-specialty-container">
                <Modal
                    className="modal-booking-container"
                    isOpen={modalClinic}
                    toggle={() => this.props.toggleModel('modalClinic')}
                    size="mn"
                    centered={false}
                >
                    <ModalHeader toggle={() => this.props.toggleModel('modalClinic')}>Danh sách cơ sở y tế</ModalHeader>
                    <ModalBody>
                        <div className="list-specialty-content">
                            {listDataClinicRedux.length > 0 &&
                                listDataClinicRedux.map((item) => {
                                    return (
                                        <Link className="item" to={`/detail-clinic/${item.id}`} key={item.id}>
                                            <div className="item-specialty" key={item.id}>
                                                <div className={'image-specialty'}>
                                                    <img src={item.imageClinic} alt="img"></img>
                                                </div>
                                                <div className="name-specialty">{item.nameClinic}</div>
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
        listDataClinicRedux: state.patient.listDataClinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
