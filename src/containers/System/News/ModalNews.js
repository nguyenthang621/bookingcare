import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsLightbulbFill } from 'react-icons/bs';

import { toast } from 'react-toastify';
import { getNewsServices } from '../../../services/patientServices';
import { confirmNewsServices } from '../../../services/userServices';
import moment from 'moment';
import './ModalNews.scss';

class ModalNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handbookData: {},
        };
    }
    async componentDidMount() {
        let handbookId = this.props.id;
        let response = await getNewsServices(handbookId, 'detail');
        if (response && response.errorCode === 0) {
            this.setState({
                handbookData: response.data,
            });
        }
    }
    componentDidUpdate() {}

    handleConfirm = async (id) => {
        this.props.handleShowLoading();
        let response = await confirmNewsServices(id);
        if (response && response.errorCode === 0) {
            this.props.toggleModelConfirm();
            await this.props.handleGetNews(this.props.statusId);
            await this.props.checkQueueNewsRedux();

            toast.success(response.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.handleHideLoading();
        } else {
            toast.error(response.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    render() {
        let { isShowModalNews, id, statusId } = this.props;

        let { handbookData } = this.state;
        return (
            <>
                <Modal
                    className="modal-booking-container"
                    isOpen={isShowModalNews}
                    toggle={() => this.props.toggleModelConfirm()}
                    size="lg"
                    centered={true}
                >
                    <ModalHeader toggle={() => this.props.toggleModelConfirm()}>Chi tiết cẩm nang</ModalHeader>
                    <ModalBody>
                        {' '}
                        <div className="handbook-container coverArea">
                            <div className="handbook-wrapper">
                                <h1 className="handbook-title">{handbookData?.title}</h1>
                                <div className="handbook-detail-info">
                                    <p>Nhóm tác giả:{handbookData?.authors}</p>
                                    <p>Người kiểm duyệt:{handbookData?.censor}</p>
                                    <p>Cố vấn y khoa:{handbookData?.adviser}</p>
                                    <p>
                                        Xuất bản: {moment(handbookData?.createdAt).format('LL')}, Cập nhật lần cuối:
                                        {moment(handbookData?.updatedAt).format('LL')}
                                    </p>
                                </div>

                                <div className="intro-bookingCare ">
                                    <div className="icon">
                                        <BsLightbulbFill />
                                    </div>
                                    <h4>
                                        BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết
                                        nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ
                                        chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                                    </h4>
                                </div>
                                <div className="image-handbook">
                                    <img src={handbookData?.image} alt="img"></img>
                                </div>
                                <div
                                    className="detail-clinic"
                                    dangerouslySetInnerHTML={{ __html: handbookData.contentHtml }}
                                ></div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {statusId === 'S1' && (
                            <Button className=" button btn-save" color="success" onClick={() => this.handleConfirm(id)}>
                                Confirm
                            </Button>
                        )}{' '}
                        <Button
                            className="button btn btn-cancel"
                            color="warning"
                            onClick={() => this.props.handleClickDelete(id)}
                        >
                            Delete
                        </Button>
                        <Button
                            className="button btn btn-cancel"
                            color="success"
                            onClick={() => this.props.toggleModelConfirm()}
                        >
                            <FormattedMessage id="appointment.cancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        listAppointmentRedux: state.doctor.listAppointment,
        statusIdRedux: state.doctor.statusId,
        queueNews: state.user.queueNews,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAppointmentDoctorRedux: (doctorId, initDate, statusId) =>
            dispatch(actions.getAppointmentDoctor(doctorId, initDate, statusId)),
        checkQueueNewsRedux: () => dispatch(actions.checkQueueNewsRedux()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNews);
