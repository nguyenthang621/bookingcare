import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsLightbulbFill } from 'react-icons/bs';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../Specialty/ListSpecialty.scss';

class ListHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    componentDidUpdate() {}

    render() {
        let { modalHandbook, listDataHandbookRedux } = this.props;
        let {} = this.state;

        return (
            <div className="list-specialty-container">
                <Modal
                    className="modal-booking-container"
                    isOpen={modalHandbook}
                    toggle={() => this.props.toggleModel('modalHandbook')}
                    size="lg"
                    centered={false}
                >
                    <ModalHeader toggle={() => this.props.toggleModel('modalHandbook')}>Danh sách cẩm nang</ModalHeader>
                    <ModalBody>
                        <div className="list-specialty-content">
                            {listDataHandbookRedux.length > 0 &&
                                listDataHandbookRedux.map((item) => {
                                    return (
                                        <Link className="item" to={`/detail-clinic/${item.id}`} key={item.id}>
                                            <div className="item-specialty" key={item.id}>
                                                <div className={'image-specialty'}>
                                                    <img src={item.image} alt="img"></img>
                                                </div>
                                                <div className="name-specialty">{item.title}</div>
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
        listDataHandbookRedux: state.patient.listDataHandbook,
        topDoctorsRedux: state.doctor.topDoctors,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHandbook);
