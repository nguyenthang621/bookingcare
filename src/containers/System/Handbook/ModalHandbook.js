import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsLightbulbFill } from 'react-icons/bs';

import { toast } from 'react-toastify';
import DetailHandbook from '../../Patient/Handbook/DetailHandbook';
import { getHandbookServices } from '../../../services/patientServices';
import { confirmHandbookServices } from '../../../services/userServices';
import moment from 'moment';
import './ModalHandbook.scss';
import _ from 'lodash';

class ModalHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handbookData: {},
        };
    }
    async componentDidMount() {
        let handbookId = this.props.id;
        let response = await getHandbookServices(handbookId, 'detail');
        if (response && response.errorCode === 0) {
            this.setState({
                handbookData: response.data,
            });
        }
    }
    componentDidUpdate(prevProps) {}

    handleConfirm = async (id) => {
        let response = await confirmHandbookServices(id);
        if (response && response.errorCode === 0) {
            this.props.toggleModelConfirm();
            await this.props.handleGetHandbook(this.props.statusId);
            await this.props.checkQueueHandbookRedux();

            toast.success(response.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
        let { isShowModalHandbook, id } = this.props;

        let { handbookData } = this.state;
        return (
            <>
                <Modal
                    className="modal-booking-container"
                    isOpen={isShowModalHandbook}
                    toggle={() => this.props.toggleModelConfirm()}
                    size="lg"
                    centered={true}
                >
                    <ModalHeader toggle={() => this.props.toggleModelConfirm()}>Chi ti???t c???m nang</ModalHeader>
                    <ModalBody>
                        {' '}
                        <div className="handbook-container coverArea">
                            <div className="handbook-wrapper">
                                <h1 className="handbook-title">{handbookData?.title}</h1>
                                <div className="handbook-detail-info">
                                    <p>Nh??m t??c gi???:{handbookData?.authors}</p>
                                    <p>Ng?????i ki???m duy???t:{handbookData?.censor}</p>
                                    <p>C??? v???n y khoa:{handbookData?.adviser}</p>
                                    <p>
                                        Xu???t b???n: {moment(handbookData?.createdAt).format('LL')}, C???p nh???t l???n cu???i:
                                        {moment(handbookData?.updatedAt).format('LL')}
                                    </p>
                                </div>

                                <div className="intro-bookingCare ">
                                    <div className="icon">
                                        <BsLightbulbFill />
                                    </div>
                                    <h4>
                                        BookingCare l?? N???n t???ng Y t??? ch??m s??c s???c kh???e to??n di???n h??ng ?????u Vi???t Nam k???t
                                        n???i ng?????i d??ng v???i tr??n 150 b???nh vi???n - ph??ng kh??m uy t??n, h??n 1,000 b??c s??
                                        chuy??n khoa gi???i v?? h??ng ngh??n d???ch v???, s???n ph???m y t??? ch???t l?????ng cao.
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
                        <Button className=" button btn-save" color="success" onClick={() => this.handleConfirm(id)}>
                            Confirm
                        </Button>{' '}
                        <Button
                            className="button btn btn-cancel"
                            color="warning"
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postBookingAppointmentRedux: (data) => dispatch(actions.postBookingAppointment(data)),
        getAppointmentDoctorRedux: (doctorId, initDate, statusId) =>
            dispatch(actions.getAppointmentDoctor(doctorId, initDate, statusId)),

        checkQueueHandbookRedux: () => dispatch(actions.checkQueueHandbookRedux()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalHandbook);
