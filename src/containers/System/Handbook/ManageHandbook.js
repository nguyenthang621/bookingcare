import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils, PATH_FIREBASE } from '../../../utils';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { postHandbookServices } from '../../../services/userServices';
import { FaFileUpload } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import './ManageHandbook.scss';
import Ckeditor from '../Admin/Ckeditor';
import { toast } from 'react-toastify';
import { uploadFileToFirebase } from '../../../firebase/uploadFile';

import _ from 'lodash';

class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBoxImage: false,
            isRoomImage: false,
            previewImageUrl: '',
            image: '',
            file: '',

            allDoctor: [],
            adviser: '',
            authors: '',
            title: '',
            contentHtml: '',
            contentMarkdown: '',
        };
    }
    async componentDidMount() {
        let { languageRedux } = this.props;
        this.props.fetchAllDoctorRedux();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let listDoctor = this.buildInputSelectName(this.props.allDoctorRedux);
            this.setState({
                allDoctor: listDoctor,
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

    onChangeInput = (key, value) => {
        this.setState({
            [key]: value,
        });
    };
    handlePickDoctor = (e) => {
        let adviser = e.map((item) => item.value);
        this.setState({
            adviser: adviser.join(),
        });
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        });
    };
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({ previewImageUrl: objectUrl, isShowBoxImage: true, image: base64, file: file });
        }
    };
    handleClickSubmit = async () => {
        let { adviser, authors, title, contentMarkdown, contentHtml, file } = this.state;
        let imageURL = await uploadFileToFirebase(PATH_FIREBASE.HANDBOOK_IMAGE, file);

        let response = await postHandbookServices({
            adviser,
            authors,
            title,
            contentMarkdown,
            contentHtml,
            image: imageURL,
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
                isShowBoxImage: false,
                isRoomImage: false,
                previewImageUrl: '',
                image: '',

                adviser: '',
                authors: '',
                title: '',
                contentHtml: '',
                contentMarkdown: '',
            });
        } else if (response && response.errorCode === 1) {
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
        let { allDoctor, authors, title, contentMarkdown } = this.state;
        return (
            <div className="handbook_container">
                <div className="handbook-title">
                    <h3>Qu???n l?? c???m nang</h3>
                </div>

                <div className="wrapper-handbook coverArea">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label forhtml="inputEmail4">
                                {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                                Ti??u ?????
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                value={title}
                                onChange={(e) => this.onChangeInput('title', e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-3 upload-file-container">
                            <label htmlFor="inputCity">Ch???n ???nh ch??? ?????</label>
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
                                        className="preview pv-left"
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
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label forhtml="inputEmail4">
                                {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                                Nh??m t??c gi???
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                value={authors}
                                onChange={(e) => this.onChangeInput('authors', e.target.value)}
                            />
                        </div>
                        <div className=" form-group col-md-6">
                            <label>Nh??m c??? v???n</label>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                isMulti
                                defaultValue={''}
                                onChange={(e) => this.handlePickDoctor(e)}
                                options={allDoctor}
                            />
                        </div>
                    </div>
                    <div className="manage-doctor-editor">
                        <label className="title-editor">
                            {/* <FormattedMessage id="admin.manage-doctor.detail-doctor" /> */}
                            B??i vi???t:
                        </label>
                        <Ckeditor handleEditorChange={this.handleEditorChange} value={contentMarkdown} />
                    </div>
                </div>
                <div className="container_btn coverArea">
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            this.handleClickSubmit();
                        }}
                    >
                        ????ng b??i
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        listAppointmentRedux: state.doctor.listAppointment,
        allDoctorRedux: state.doctor.allDoctor,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
