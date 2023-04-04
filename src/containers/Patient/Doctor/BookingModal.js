import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './BookingModal.scss';
import Loading from '../../../components/Loading';
import { getAllCodeServices } from '../../../services/userServices';
import { toast } from 'react-toastify';
import { postBookingAppointmentServices } from '../../../services/patientServices';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookFor: 'others',
            nameScheduler: '',
            phoneNumberScheduler: '',
            namePatient: '',
            IDNumber: '',
            genderPatient: '',
            phoneNumberPatient: '',
            birthPatient: '',
            addressPatient: '',
            reason: '',
            rangeTime: '',
            doctorId: '',
            email: '',
            isLoading: false,

            listGender: [],
            nameDoctor: '',
            provinceDoctor: '',
        };
    }
    async componentDidMount() {
        let { languageRedux, dataCurrentDoctor } = this.props;
        let rangeTime = this.props.rangeTimeData;
        let genderRes = await getAllCodeServices('gender');
        let timeSchedule =
            languageRedux === LANGUAGES.VI ? rangeTime.timeTypeData?.valueVi : rangeTime.timeTypeData?.valueEn;
        let date = '';
        if (rangeTime.date) {
            date = moment
                .unix(rangeTime.date / 1000)
                .local(languageRedux)
                .format('dddd - DD/MM/YYYY');
            date = this.capitalizeFirstLetter(date);
        }
        this.buildNameAndProvinceByLanguage(dataCurrentDoctor, languageRedux);
        let exactTime = `${timeSchedule} - ${date}`;
        this.setState({
            rangeTime: this.props.rangeTimeData,
            doctorId: this.props.doctorId,
            exactTime: exactTime,
            listGender: genderRes.data,
        });
    }
    componentDidUpdate(prevProps) {
        let { languageRedux } = this.props;
        let { rangeTime } = this.state;

        if (prevProps.languageRedux !== this.props.languageRedux) {
            let timeSchedule =
                languageRedux === LANGUAGES.VI ? rangeTime.timeTypeData?.valueVi : rangeTime.timeTypeData?.valueEn;
            let date = '';
            if (rangeTime.date) {
                date = moment
                    .unix(rangeTime.date / 1000)
                    .local(languageRedux)
                    .format('dddd - DD/MM/YYYY');
                date = this.capitalizeFirstLetter(date);
            }
            let exactTime = `${timeSchedule} - ${date}`;
            this.setState({
                exactTime: exactTime,
            });
        }
    }
    toggle = () => {
        this.props.toggleModel();
    };

    handleOnchangeInputRadio = (e) => {
        this.setState({
            bookFor: e.target.value,
        });
    };

    handleChangeInput = (e, key) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    handleSubmitBooking = async (data) => {
        this.setState({
            isLoading: true,
        });
        let result = {
            bookFor: data.bookFor,
            email: data.email,
            nameScheduler: data.nameScheduler,
            phoneNumberScheduler: data.phoneNumberScheduler,
            namePatient: data.namePatient.trim(),
            IDNumber: data.IDNumber,
            gender: data.genderPatient,
            phoneNumber: data.phoneNumberPatient,
            YearOfBirth: data.birthPatient,
            address: data.addressPatient,
            reason: data.reason,
            timeType: data.rangeTime.timeType,
            date: data.rangeTime.date,
            doctorId: data.doctorId,
            exactTime: data.exactTime,

            nameDoctor: this.props.nameDoctor,
            language: this.props.languageRedux,
        };
        let res = await postBookingAppointmentServices(result);
        if (res && res.errorCode === 0) {
            toast.success(res.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.toggle();
        } else {
            toast.error(res?.message || 'Vui lòng điền đủ thông tin.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        this.setState({
            isLoading: false,
        });
    };
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    buildNameAndProvinceByLanguage = (dataCurrentDoctor, languageRedux) => {
        let nameDoctor = '';
        let provinceDoctor = '';
        if (dataCurrentDoctor && dataCurrentDoctor.positionData) {
            nameDoctor =
                languageRedux === LANGUAGES.VI
                    ? `${dataCurrentDoctor.positionData.valueVi}, ${dataCurrentDoctor.firstName} ${dataCurrentDoctor.lastName}`
                    : `${dataCurrentDoctor.positionData.valueEn}, ${dataCurrentDoctor.lastName} ${dataCurrentDoctor.firstName}`;
        }
        if (dataCurrentDoctor && dataCurrentDoctor.Doctor_Infor && dataCurrentDoctor.Doctor_Infor.provinceData) {
            provinceDoctor =
                languageRedux === LANGUAGES.VI
                    ? dataCurrentDoctor.Doctor_Infor.provinceData.valueVi
                    : dataCurrentDoctor.Doctor_Infor.provinceData.valueEn;
        }
        this.setState({
            nameDoctor: nameDoctor,
            provinceDoctor: provinceDoctor,
        });
    };

    render() {
        let { isShowModalBooking, languageRedux } = this.props;
        let { bookFor, exactTime, isLoading, listGender, nameDoctor } = this.state;
        // let selected = bookFor === 'others' ? 'checked' : '';
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
                    isOpen={isShowModalBooking}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered={true}
                >
                    <ModalHeader toggle={() => this.toggle()}>ĐẶT LỊCH KHÁM</ModalHeader>
                    <ModalBody>
                        <div className="infor-doctor">
                            <div className="infor">
                                {nameDoctor && <h2>{nameDoctor}</h2>}
                                <h4>
                                    Thời gian khám: <b>{exactTime}</b>
                                </h4>
                            </div>
                        </div>
                        <div className="scheduler">
                            <label>
                                <input
                                    className="input1"
                                    type="radio"
                                    name="book_for"
                                    value="self"
                                    onChange={(e) => this.handleOnchangeInputRadio(e)}
                                />{' '}
                                Đặt cho mình
                            </label>
                            <label>
                                <input
                                    className="input2"
                                    type="radio"
                                    name="book_for"
                                    value="others"
                                    onChange={(e) => this.handleOnchangeInputRadio(e)}
                                />{' '}
                                Đặt cho người thân
                            </label>
                        </div>
                        <div className="form-user-container">
                            {bookFor === 'others' && <label className="label-primary">Thông tin người đặt lịch</label>}
                            {bookFor === 'others' && (
                                <div className="form-row ">
                                    <div className="form-group col-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Họ tên người đặt lịch"
                                            onChange={(e) => this.handleChangeInput(e, 'nameScheduler')}
                                            value={this.state.nameScheduler}
                                        />
                                    </div>
                                    <div className="form-group col-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Số điện thoại người đặt lịch"
                                            onChange={(e) => this.handleChangeInput(e, 'phoneNumberScheduler')}
                                            value={this.state.phoneNumberScheduler}
                                        />
                                    </div>
                                </div>
                            )}
                            {bookFor === 'others' && (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email(bắt buộc)"
                                        onChange={(e) => this.handleChangeInput(e, 'email')}
                                        value={this.state.email}
                                    />
                                </div>
                            )}

                            <label className="label-primary">Thông tin bệnh nhân</label>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Họ tên bệnh nhân(bắt buộc)"
                                    onChange={(e) => this.handleChangeInput(e, 'namePatient')}
                                    value={this.state.namePatient}
                                />
                                <small>
                                    Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú
                                </small>
                            </div>
                            {bookFor === 'self' && (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email(bắt buộc)"
                                        onChange={(e) => this.handleChangeInput(e, 'email')}
                                        value={this.state.email}
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                {listGender.map((item) => {
                                    return (
                                        <div className="form-check form-check-inline" key={item.id}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                value={item.keyMap}
                                                onChange={(e) => this.handleChangeInput(e, 'genderPatient')}
                                            />
                                            <label className="form-check-label">
                                                {languageRedux === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Số điện thoại bệnh nhân"
                                        onChange={(e) => this.handleChangeInput(e, 'phoneNumberPatient')}
                                        value={this.state.phoneNumberPatient}
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Năm sinh(bắt buộc) VD: 27/01/2001"
                                        onChange={(e) => this.handleChangeInput(e, 'birthPatient')}
                                        value={this.state.birthPatient}
                                    />
                                </div>
                            </div>
                            <div className="form-group ">
                                <div className="">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Số căn cước"
                                        onChange={(e) => this.handleChangeInput(e, 'IDNumber')}
                                        value={this.state.IDNumber}
                                    />
                                </div>
                            </div>
                            <div className="form-group ">
                                <div className="">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Địa chỉ"
                                        onChange={(e) => this.handleChangeInput(e, 'addressPatient')}
                                        value={this.state.addressPatient}
                                    />
                                </div>
                            </div>
                            <textarea
                                className="info-doctor form-control"
                                rows="4"
                                onChange={(e) => this.handleChangeInput(e, 'reason')}
                                value={this.state.reason}
                                placeholder="Lý do khám"
                            ></textarea>
                        </div>
                        <div className="content-payment">
                            <div>
                                <div>Giá khám</div>
                                <div>300000VND</div>
                            </div>
                            <div className="border-bottom">
                                <div>Phí đặt lịch</div>
                                <div>Miễn phí</div>
                            </div>
                            <div>
                                <div>Tổng cộng</div>
                                <div>300000VND</div>
                            </div>
                        </div>
                        <div className="text-note">
                            <p>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className=" button btn-save"
                            color="primary"
                            onClick={() => this.handleSubmitBooking(this.state)}
                        >
                            Xác nhận đặt khám
                        </Button>{' '}
                        <Button className="button btn btn-cancel" color="secondary" onClick={() => this.toggle()}>
                            Cancel
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
