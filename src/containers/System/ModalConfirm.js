import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { toast } from 'react-toastify';
import { confirmRemedyService } from '../../services/doctorServices';
import _ from 'lodash';

class ModalConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailPatient: '',
            title: 'Đơn của bạn đã bị huỷ',
            reason: 'Do ko đến khám',
        };
    }
    async componentDidMount() {
        let { currentPatient } = this.props;
        if (currentPatient && !_.isEmpty(currentPatient) && currentPatient.dataAcc.email) {
            this.setState({
                emailPatient: currentPatient.dataAcc.email,
            });
        }
    }
    componentDidUpdate(prevProps) {}
    toggle = () => {
        this.props.toggleModelConfirm();
    };
    handleChangeInput = (e, key) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    handleDestroy = async () => {
        let { emailPatient, title, reason } = this.state;
        let { currentPatient, doctorId, initDate, languageRedux, type, currentUserId } = this.props;
        if (type === 'cancel-appointment') {
            this.setState({
                isLoading: true,
            });
            let response = await confirmRemedyService({
                email: emailPatient,
                title,
                reason,
                doctorId: currentPatient.doctorId,
                patientId: currentPatient.patientId,
                timeType: currentPatient.timeType,
                namePatient: currentPatient.namePatient,
                exactTime: currentPatient.timeAppointment,
                dataAccDoctor: currentPatient.dataAccDoctor,
                language: languageRedux,
                isDestroyAppointment: true,
            });
            if (response && response.errorCode === 0) {
                this.setState({
                    isLoading: false,
                    title: '',
                    email: '',
                    reason: '',
                    isDestroyAppointment: false,
                });
                toast.success(response.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.props.toggleModelConfirm();
                await this.props.getAppointmentDoctorRedux(doctorId, initDate, this.props.statusIdRedux);
            } else {
                toast.error('Some thing wrong, pls again', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            this.props.handleDeleteItem(currentUserId);
        }
    };

    render() {
        let { isShowModalConfirm, type, text, size } = this.props;

        return (
            <>
                <Modal
                    className="modal-booking-container"
                    isOpen={isShowModalConfirm}
                    toggle={() => this.toggle()}
                    size={size || 'lg'}
                    centered={true}
                >
                    <ModalHeader toggle={() => this.toggle()}>Bạn thật sự muốn xoá</ModalHeader>
                    <ModalBody>
                        {' '}
                        {type === 'cancel-appointment' ? (
                            <div>
                                <div className="form-row ">
                                    <div className="form-group col-5">
                                        <label>Email bệnh nhân</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email patient"
                                            onChange={(e) => this.handleChangeInput(e, 'emailPatient')}
                                            value={this.state.emailPatient}
                                        />
                                    </div>
                                    {type === 'cancel-appointment' && (
                                        <div className="form-group col-md-7">
                                            <label htmlFor="inputCity">Tiêu đề mail</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="reason"
                                                onChange={(e) => this.handleChangeInput(e, 'title')}
                                                value={this.state.title}
                                            />
                                        </div>
                                    )}
                                </div>
                                <textarea
                                    className="info-doctor form-control"
                                    rows="4"
                                    onChange={(e) => this.handleChangeInput(e, 'reason')}
                                    value={this.state.reason}
                                    placeholder="Lý do"
                                ></textarea>
                            </div>
                        ) : (
                            <p>{text}</p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button className=" button btn-save" color="danger" onClick={() => this.handleDestroy()}>
                            Xoá
                        </Button>{' '}
                        <Button className="button btn btn-cancel" color="success" onClick={() => this.toggle()}>
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
        getAppointmentDoctorRedux: (doctorId, initDate, statusId) =>
            dispatch(actions.getAppointmentDoctor(doctorId, initDate, statusId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
