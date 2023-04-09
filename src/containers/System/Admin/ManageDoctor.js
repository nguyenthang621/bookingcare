import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

import './ManageDoctor.scss';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { saveDetailDoctorServices } from '../../../services';

import CKeditor from '../../../components/CKeditor/CKeditor';
import Loading from '../../../components/Loading';

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            contentHtml: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            allDoctor: [],
            detailDoctor: {},
            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinics: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            addressClinic: '',
            note: '',

            isShowLoading: false,
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchRelateToDoctorInforRedux();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let listDoctor = this.buildInputSelectName(this.props.allDoctorRedux);
            this.setState({
                allDoctor: listDoctor,
            });
        }
        if (prevProps.languageRedux !== this.props.languageRedux) {
            let listDoctor = this.buildInputSelectName(this.props.allDoctorRedux);
            let allRelatedToDoctorInfor = this.props.DoctorRelatedInforRedux;

            this.setState({
                allDoctor: listDoctor,
                listPrice: this.buildInputSelect(allRelatedToDoctorInfor.listPrice, 'currency'),
                listPayment: this.buildInputSelect(allRelatedToDoctorInfor.listPayment),
                listProvince: this.buildInputSelect(allRelatedToDoctorInfor.listProvince),
                listClinics: this.buildInputSelect(allRelatedToDoctorInfor.listClinics, 'clinics'),
                listSpecialty: this.buildInputSelect(allRelatedToDoctorInfor.listSpecialty, 'specialty'),
            });
        }
        if (prevProps.DoctorRelatedInforRedux !== this.props.DoctorRelatedInforRedux) {
            let allRelatedToDoctorInfor = this.props.DoctorRelatedInforRedux;
            this.setState({
                listPrice: this.buildInputSelect(allRelatedToDoctorInfor.listPrice, 'currency'),
                listPayment: this.buildInputSelect(allRelatedToDoctorInfor.listPayment),
                listProvince: this.buildInputSelect(allRelatedToDoctorInfor.listProvince),
                listClinics: this.buildInputSelect(allRelatedToDoctorInfor.listClinics, 'clinics'),
                listSpecialty: this.buildInputSelect(allRelatedToDoctorInfor.listSpecialty, 'specialty'),
            });
        }
    }

    buildInputSelectName = (data) => {
        let result = [];
        if (data && data.length > 0) {
            result = data.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = this.props.languageRedux === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                return object;
            });
        }
        return result;
    };
    buildInputSelect = (data, type) => {
        let result = [];
        if (data && data.length > 0) {
            result = data.map((item, index) => {
                let object = {};
                if (type === 'currency') {
                    object.label =
                        this.props.languageRedux === LANGUAGES.VI ? `${item.valueVi} VND` : `${item.valueEn} $`;
                    object.value = item.keyMap;
                } else if (type === 'specialty') {
                    object.label = item.name;
                    object.value = item.id;
                } else if (type === 'clinics') {
                    object.label = item.nameClinic;
                    object.value = item.id;
                } else {
                    object.label = this.props.languageRedux === LANGUAGES.VI ? item.valueVi : item.valueEn;
                    object.value = item.keyMap;
                }
                return object;
            });
        }
        return result;
    };

    findValueDefault = (key, data) => {
        let result = '';
        if (key && data) {
            result = data.find((item) => item && item.value === key);
            return result;
        }
        return result;
    };

    handleChangeDoctor = async (selectedDoctor) => {
        let doctorId = selectedDoctor.value;
        await this.props.getDetailDoctorRedux(doctorId);
        let { detailDoctorRedux } = this.props;
        if (detailDoctorRedux) {
            let Markdown = detailDoctorRedux.Markdown;
            let doctor_infor = detailDoctorRedux.Doctor_Infor;

            this.setState({
                selectedDoctor: selectedDoctor,
                detailDoctor: this.props.detailDoctorRedux,
                contentHtml: Markdown.contentHTML || '',
                contentMarkdown: Markdown.contentMarkdown || '',
                description: Markdown.description || '',
                nameClinic: doctor_infor.nameClinic || '',
                addressClinic: doctor_infor.addressClinic || '',
                note: doctor_infor.note || '',
                selectedPrice: this.findValueDefault(doctor_infor.priceId, this.state.listPrice) || {},
                selectedPayment: this.findValueDefault(doctor_infor.paymentId, this.state.listPayment) || {},
                selectedProvince: this.findValueDefault(doctor_infor.provinceId, this.state.listProvince) || {},
                selectedSpecialty: this.findValueDefault(doctor_infor.specialtyId, this.state.listSpecialty) || {},
                selectedClinic: this.findValueDefault(doctor_infor.clinicData.id, this.state.listClinics) || {},
            });
        }
    };

    handleChangeSelect = (select, nameKeyState) => {
        this.setState({
            [nameKeyState]: select,
        });
    };
    handleChangeTextArea = (e) => {
        this.setState({
            description: e.target.value,
        });
    };

    handleEditorChange = (data) => {
        this.setState({
            contentHtml: data,
        });
    };

    handleClickSave = async () => {
        window.scrollTo(0, 0);
        this.setState({
            isShowLoading: true,
        });
        let data = {
            contentHTML: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value,
            nameClinic: this.state.selectedClinic.value,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        };
        let res = await saveDetailDoctorServices(data);
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
            this.setState({
                contentHtml: '',
                contentMarkdown: '',
                selectedDoctor: '',
                description: '',
                //save to doctor_infor table
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',

                addressClinic: '',
                note: '',
            });
        } else {
            toast.error(res.message, {
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
            isShowLoading: false,
        });
    };

    onChangeInput = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        let {
            allDoctor,
            description,
            contentHtml,
            listPrice,
            listPayment,
            listProvince,
            listSpecialty,
            listClinics,

            addressClinic,
            note,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            selectedSpecialty,
            selectedClinic,
            isShowLoading,
        } = this.state;

        return (
            <div className="manage-doctor-container position-loading">
                {isShowLoading && <Loading />}
                <div className="wrapper-manager-doctor w60">
                    <div className="manage-doctor-title title">
                        <h3>
                            <FormattedMessage id="admin.manage-doctor.title" />
                        </h3>
                    </div>
                    <div className="container-infor-doctor ">
                        <div className="form-row">
                            <div className=" form-group col-md-6">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.select-doctor" />
                                </label>
                                <Select
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                    onChange={(e) => this.handleChangeDoctor(e)}
                                    options={allDoctor}
                                />
                            </div>
                            <div className="form-group col-md-6 ">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.select-province" />
                                </label>
                                <Select
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-province" />}
                                    onChange={(e) => this.handleChangeSelect(e, 'selectedProvince')}
                                    options={listProvince}
                                    value={selectedProvince}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label forhtml="inputEmail4">
                                <FormattedMessage id="admin.manage-doctor.name-clinic" />
                            </label>

                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-price" />}
                                onChange={(e) => this.handleChangeSelect(e, 'selectedClinic')}
                                options={listClinics}
                                value={selectedClinic}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label forhtml="inputPassword4">
                                <FormattedMessage id="admin.manage-doctor.address-clinic" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                value={addressClinic}
                                onChange={(e) => this.onChangeInput('addressClinic', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label forhtml="inputEmail4">
                                <FormattedMessage id="admin.manage-doctor.select-price" />
                            </label>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-price" />}
                                onChange={(e) => this.handleChangeSelect(e, 'selectedPrice')}
                                options={listPrice}
                                value={selectedPrice}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label forhtml="inputPassword4">
                                <FormattedMessage id="admin.manage-doctor.select-payment" />
                            </label>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-payment" />}
                                onChange={(e) => this.handleChangeSelect(e, 'selectedPayment')}
                                options={listPayment}
                                value={selectedPayment}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label forhtml="inputPassword4">
                                <FormattedMessage id="admin.manage-doctor.select-specialty" />
                            </label>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-specialty" />}
                                onChange={(e) => this.handleChangeSelect(e, 'selectedSpecialty')}
                                options={listSpecialty}
                                value={selectedSpecialty}
                            />
                        </div>
                    </div>
                    <div className="from-row">
                        <label forhtml="inputPassword4">
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            value={note}
                            onChange={(e) => this.onChangeInput('note', e.target.value)}
                        />
                    </div>
                    <div className="form-row mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            className="info-doctor form-control"
                            rows="4"
                            onChange={(e) => this.onChangeInput('description', e.target.value)}
                            value={description}
                        ></textarea>
                    </div>
                    <div className="manage-doctor-editor">
                        <label className="title-editor">
                            <FormattedMessage id="admin.manage-doctor.detail-doctor" />
                        </label>

                        <CKeditor handleEditorChange={this.handleEditorChange} value={contentHtml} />
                    </div>
                    <div className="container_btn">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                this.handleClickSave();
                            }}
                        >
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctorRedux: state.doctor.allDoctor,
        languageRedux: state.app.language,
        detailDoctorRedux: state.doctor.detailDoctor,
        DoctorRelatedInforRedux: state.doctor.DoctorRelatedInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchRelateToDoctorInforRedux: () => dispatch(actions.fetchRelateToDoctorInfor()),
        getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
