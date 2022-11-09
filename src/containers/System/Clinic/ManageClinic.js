import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FaFileUpload } from 'react-icons/fa';
import { postDetailClinicServices } from '../../../services/userServices';
import { toast } from 'react-toastify';
import './ManageClinic.scss';
import Ckeditor from '../Admin/Ckeditor';

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            descriptionHtml: '',
            descriptionMarkdown: '',
            imageClinic: '',
            imageLogo: '',
            nameClinic: '',
            addressClinic: '',
            previewImageClinicUrl: '',
            previewImageLogoUrl: '',

            isShowBoxImageClinic: false,
            isShowBoxImageLogo: false,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps) {}
    handleOnchangeImage = async (e, image, previewImageUrl, isShowBoxImage) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({ [previewImageUrl]: objectUrl, [isShowBoxImage]: true, [image]: base64 });
        }
    };

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
                } else {
                    object.label = this.props.languageRedux === LANGUAGES.VI ? item.valueVi : item.valueEn;
                }
                object.value = item.keyMap;
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHtml: html,
            descriptionMarkdown: text,
        });
    };

    handleClickSave = async () => {
        let { descriptionHtml, descriptionMarkdown, imageClinic, imageLogo, nameClinic, addressClinic } = this.state;
        console.log('send: ', {
            descriptionHtml,
            descriptionMarkdown,
            imageClinic,
            imageLogo,
            nameClinic,
            addressClinic,
        });
        let response = await postDetailClinicServices({
            descriptionHtml,
            descriptionMarkdown,
            imageClinic,
            imageLogo,
            nameClinic,
            addressClinic,
        });
        if (response && response.errorCode === 0) {
            toast.success(response.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                descriptionHtml: '',
                descriptionMarkdown: '',
                imageClinic: '',
                imageLogo: '',
                nameClinic: '',
                addressClinic: '',
                previewImageClinicUrl: '',
                previewImageLogoUrl: '',

                isShowBoxImageClinic: false,
                isShowBoxImageLogo: false,
            });
        } else {
            toast.error(response?.data?.message, {
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
    onChangeInput = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        let {
            isChange,
            descriptionHtml,
            descriptionMarkdown,
            imageClinic,
            imageLogo,
            nameClinic,
            addressClinic,
            previewImageClinicUrl,
            previewImageLogoUrl,

            isShowBoxImageClinic,
            isShowBoxImageLogo,
        } = this.state;

        return (
            <div className="specialty-container">
                <div className="specialty-title">
                    <h3>Quản lý cơ sở khám bệnh</h3>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label forhtml="inputEmail4">
                            {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                            Tên cơ sở
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            value={nameClinic}
                            onChange={(e) => this.onChangeInput('nameClinic', e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-2 upload-file-container">
                        <label forhtml="inputEmail4">
                            {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                            Upload clinic
                        </label>
                        <div className="btn-container">
                            <input
                                id="uploadFileClinic"
                                type="file"
                                className="form-control"
                                hidden
                                onChange={(e) =>
                                    this.handleOnchangeImage(
                                        e,
                                        'imageClinic',
                                        'previewImageClinicUrl',
                                        `isShowBoxImageClinic`,
                                    )
                                }
                            />
                            <label className="text-upload" htmlFor="uploadFileClinic">
                                <FormattedMessage id="manage-user.uploadImage" />
                                <FaFileUpload className="icon-upload" />
                            </label>
                            {isShowBoxImageClinic && (
                                <div
                                    className="preview-clinic "
                                    style={{ backgroundImage: `url(${previewImageClinicUrl})` }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label forhtml="inputEmail4">
                            {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                            Địa chỉ cơ sở
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            value={addressClinic}
                            onChange={(e) => this.onChangeInput('addressClinic', e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-2 upload-file-container">
                        <label forhtml="inputEmail4">
                            {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                            Upload logo
                        </label>
                        <div className="btn-container">
                            <input
                                id="uploadFileLogo"
                                type="file"
                                className="form-control"
                                hidden
                                onChange={(e) =>
                                    this.handleOnchangeImage(
                                        e,
                                        'imageLogo',
                                        'previewImageLogoUrl',
                                        `isShowBoxImageLogo`,
                                    )
                                }
                            />
                            <label className="text-upload" htmlFor="uploadFileLogo">
                                <FormattedMessage id="manage-user.uploadImage" />
                                <FaFileUpload className="icon-upload" />
                            </label>
                            {isShowBoxImageLogo && (
                                <div
                                    className="preview-logo"
                                    style={{ backgroundImage: `url(${previewImageLogoUrl})` }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="specialty-editor">
                    <label className="title-editor">
                        {/* <FormattedMessage id="admin.manage-doctor.detail-doctor" /> */}
                        Detail specialty
                    </label>
                    <Ckeditor handleEditorChange={this.handleEditorChange} value={descriptionMarkdown} />
                </div>
                <div className="btn-save">
                    {isChange ? (
                        <button
                            className="btn btn-warning flex-end"
                            onClick={() => {
                                this.handleClickSave();
                            }}
                        >
                            <FormattedMessage id="admin.manage-doctor.change" />
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary flex-end"
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
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
