import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { confirmRemedyService } from '../../../services/doctorServices';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './RemedyModal.scss';
import Loading from '../../../components/Loading';
import { FaFileUpload } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import _ from 'lodash';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBoxImage: false,
            isRoomImage: false,
            previewImageUrl: '',
            image: '',
            emailPatient: '',
            note: '',
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
    componentDidUpdate(prevProps) {
        let { currentPatient } = this.props;
        if (prevProps.currentPatient !== currentPatient) {
        }
    }
    toggle = () => {
        this.props.toggleModel();
    };

    handleChangeInput = (e, key) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({ previewImageUrl: objectUrl, isShowBoxImage: true, image: base64 });
        }
    };

    handleSendConfirm = async () => {
        let { image, emailPatient, note } = this.state;
        let { currentPatient, doctorId, initDate, languageRedux } = this.props;
        this.setState({
            isLoading: true,
        });
        let response = await confirmRemedyService({
            image,
            email: emailPatient,
            note,
            doctorId: currentPatient.doctorId,
            patientId: currentPatient.patientId,
            timeType: currentPatient.timeType,
            namePatient: currentPatient.namePatient,
            exactTime: currentPatient.timeAppointment,
            dataAccDoctor: currentPatient.dataAccDoctor,
            language: languageRedux,
        });
        if (response && response.errorCode === 0) {
            this.setState({
                isLoading: false,
                image: '',
                email: '',
                note: '',
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
            this.props.toggleModel();
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
    };

    render() {
        let { isShowModalRemedy, statusIdRedux } = this.props;
        let { isLoading } = this.state;
        return (
            <div className="booking-modal-container">
                {isLoading && (
                    <div className="loading-container">
                        <div className="icon-loading">
                            <Loading />
                        </div>
                    </div>
                )}
                <Modal
                    className="modal-booking-container"
                    isOpen={isShowModalRemedy}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered={true}
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        {statusIdRedux === 'S2' && 'Gửi mail khám bệnh thành công'}
                        {statusIdRedux === 'S3' && 'Gửi mail'}
                    </ModalHeader>
                    <ModalBody>
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
                            {statusIdRedux === 'S2' && (
                                <div className="form-group col-md-3 upload-file-container">
                                    <label htmlFor="inputCity">Chọn file đơn thuốc</label>
                                    <div className="btn-container">
                                        <input
                                            id="uploadFile"
                                            type="file"
                                            className="form-control"
                                            hidden
                                            onChange={(e) => this.handleOnchangeImage(e)}
                                        />
                                        <label className="text-upload" htmlFor="uploadFile">
                                            <FormattedMessage id="manage-user.uploadImage" />
                                            <FaFileUpload className="icon-upload" />
                                        </label>
                                        {this.state.isShowBoxImage && (
                                            <div
                                                className="preview preview-right"
                                                style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                                onClick={() => this.setState({ isRoomImage: true })}
                                            ></div>
                                        )}
                                    </div>
                                    {this.state.isRoomImage && (
                                        <Lightbox
                                            mainSrc={this.state.previewImageUrl}
                                            onCloseRequest={() => this.setState({ isRoomImage: false })}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <textarea
                            className="info-doctor form-control"
                            rows="4"
                            onChange={(e) => this.handleChangeInput(e, 'note')}
                            value={this.state.note}
                            placeholder="note"
                        ></textarea>
                    </ModalBody>
                    <ModalFooter>
                        <Button className=" button btn-save" color="primary" onClick={() => this.handleSendConfirm()}>
                            <FormattedMessage id="appointment.send-mail" />
                        </Button>{' '}
                        <Button className="button btn btn-cancel" color="secondary" onClick={() => this.toggle()}>
                            <FormattedMessage id="appointment.cancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
