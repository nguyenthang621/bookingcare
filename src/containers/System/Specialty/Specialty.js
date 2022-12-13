import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils, PATH_FIREBASE } from '../../../utils';
import { FaFileUpload } from 'react-icons/fa';
import { postSpecialtyServices } from '../../../services/userServices';
import { toast } from 'react-toastify';
import { uploadFileToFirebase } from '../../../firebase/uploadFile';

import './Specialty.scss';
import Ckeditor from '../Admin/Ckeditor';
import Select from 'react-select';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            descriptionHtml: '',
            descriptionMarkdown: '',
            image: '',
            specialty: '',
            previewImageUrl: '',
            file: '',
            isRoomImage: false,
            isShowBoxImage: false,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps) {}
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({ previewImageUrl: objectUrl, isShowBoxImage: true, image: base64, file: file });
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
        let { descriptionHtml, descriptionMarkdown, specialty, file } = this.state;
        let imageURL = await uploadFileToFirebase(PATH_FIREBASE.SPECIALTY_IMAGE, file);

        let response = await postSpecialtyServices({
            descriptionHtml,
            descriptionMarkdown,
            image: imageURL,
            specialty,
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
                image: '',
                specialty: '',
                previewImageUrl: '',

                isRoomImage: false,
                isShowBoxImage: false,
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
            image,
            specialty,
            previewImageUrl,
            isRoomImage,
            isShowBoxImage,
        } = this.state;
        return (
            <div className="specialty-container">
                <div className="specialty-title">
                    <h3>Quản lý chuyên khoa</h3>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label forhtml="inputEmail4">
                            {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                            Chuyên khoa
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            value={specialty}
                            onChange={(e) => this.onChangeInput('specialty', e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-2 upload-file-container">
                        <label forhtml="inputEmail4">
                            {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                            Upload
                        </label>
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
                                    className="preview "
                                    style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                    onClick={() => this.setState({ isRoomImage: true })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
