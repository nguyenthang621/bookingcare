import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

import './ManageDoctor.scss';
import Ckeditor from './Ckeditor';
import Select from 'react-select';

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
            isChange: false,
            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
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
                listSpecialty: this.buildInputSelect(allRelatedToDoctorInfor.listSpecialty, 'specialty'),
            });
        }
        if (prevProps.DoctorRelatedInforRedux !== this.props.DoctorRelatedInforRedux) {
            let allRelatedToDoctorInfor = this.props.DoctorRelatedInforRedux;
            this.setState({
                listPrice: this.buildInputSelect(allRelatedToDoctorInfor.listPrice, 'currency'),
                listPayment: this.buildInputSelect(allRelatedToDoctorInfor.listPayment),
                listProvince: this.buildInputSelect(allRelatedToDoctorInfor.listProvince),
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

    handleChange = async (selectedDoctor) => {
        let doctorId = selectedDoctor.value;
        await this.props.getDetailDoctorRedux(doctorId);
        let { detailDoctorRedux } = this.props;
        if (detailDoctorRedux) {
            let Markdown = detailDoctorRedux.Markdown;
            let doctor_infor = detailDoctorRedux.Doctor_Infor;

            this.setState({
                isChange: false,
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
            });
        }
    };
    handleChangeSelectedProvince = (selectedProvince) => {
        let keySelectedProvince = selectedProvince;
        this.setState({
            isChange: true,
            selectedProvince: keySelectedProvince,
        });
    };
    handleChangeSelectedPrice = (selectedPrice) => {
        let keySelectedPrice = selectedPrice;
        this.setState({
            isChange: true,
            selectedPrice: keySelectedPrice,
        });
    };
    handleChangeSelectedPayment = (selectedPayment) => {
        let keySelectedPayment = selectedPayment;
        this.setState({
            isChange: true,
            selectedPayment: keySelectedPayment,
        });
    };
    handleChangeSelectedSpecialty = (selectedSpecialty) => {
        let keySelectedSpecialty = selectedSpecialty;
        this.setState({
            isChange: true,
            selectedSpecialty: keySelectedSpecialty,
        });
    };
    handleChangeTextArea = (e) => {
        this.setState({
            isChange: true,
            description: e.target.value,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            isChange: true,
            contentHtml: html,
            contentMarkdown: text,
        });
    };

    handleClickSave = () => {
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            isChange: this.state.isChange,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
    };
    onChangeInput = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        let {
            isChange,
            allDoctor,
            description,
            contentMarkdown,
            listPrice,
            listPayment,
            listProvince,
            listSpecialty,
            nameClinic,
            addressClinic,
            note,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            selectedSpecialty,
        } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <h3>
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </h3>
                </div>
                <div className="container-infor-doctor">
                    <div className="form-row">
                        <div className=" form-group col-md-6">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            </label>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                onChange={(e) => this.handleChange(e)}
                                options={allDoctor}
                            />
                        </div>
                        <div className="form-group col-md-6 ">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-province" />
                            </label>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-province" />}
                                onChange={(e) => this.handleChangeSelectedProvince(e)}
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
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            value={nameClinic}
                            onChange={(e) => this.onChangeInput('nameClinic', e.target.value)}
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
                            onChange={(e) => this.handleChangeSelectedPrice(e)}
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
                            onChange={(e) => this.handleChangeSelectedPayment(e)}
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
                            onChange={(e) => this.handleChangeSelectedSpecialty(e)}
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
                    <Ckeditor handleEditorChange={this.handleEditorChange} value={contentMarkdown} />
                </div>
                <div className="container_btn">
                    {isChange ? (
                        <button
                            className="btn btn-warning"
                            onClick={() => {
                                this.handleClickSave();
                            }}
                        >
                            <FormattedMessage id="admin.manage-doctor.change" />
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                this.handleClickSave();
                            }}
                        >
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </button>
                    )}
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
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
