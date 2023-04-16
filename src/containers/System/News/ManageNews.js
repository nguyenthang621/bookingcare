import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils, PATH_FIREBASE } from '../../../utils';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { postNewsServices } from '../../../services/userServices';
import { FaFileUpload } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import './ManageNews.scss';
import { toast } from 'react-toastify';
import { uploadFileToFirebase } from '../../../firebase/uploadFile';
import CKeditor from '../../../components/CKeditor/CKeditor';

import Loading from '../../../components/Loading';

class ManageNews extends Component {
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
            type: 'Mới ra mắt',
            contentHtml: '',
            contentMarkdown: '',
            topic: '',
            focus: '',
            isShowLoading: false,
        };
    }
    async componentDidMount() {
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

    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({ previewImageUrl: objectUrl, isShowBoxImage: true, image: base64, file: file });
        }
    };

    handleEditorChange = (data) => {
        this.setState({
            contentHtml: data,
        });
    };
    handleClickSubmit = async () => {
        this.setState({
            isShowLoading: true,
        });
        let { adviser, authors, title, type, contentMarkdown, contentHtml, topic, focus, file } = this.state;
        let htmlFocus = focus
            .split('\n')
            .map((item) => {
                return `<li>${item}</li>`;
            })
            .join('');
        htmlFocus = `<ul>${htmlFocus}</ul>`;
        let imageURL = await uploadFileToFirebase(PATH_FIREBASE.NEWS_IMAGE, file);

        let data = { adviser, authors, title, type, contentMarkdown, contentHtml, image: imageURL, topic, htmlFocus };
        let response = await postNewsServices(data);
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
                type: '',
                topic: '',
                focus: '',

                contentHtml: '',
                contentMarkdown: '',
                isShowLoading: false,
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
        let { allDoctor, authors, title, type, isShowLoading } = this.state;
        return (
            <div className="handbook_container position-loading">
                {isShowLoading && <Loading />}
                <div className="handbook-title title">
                    <h3>Quản lý tin tức</h3>
                </div>

                <div className="wrapper-handbook coverArea">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label forhtml="inputEmail4">
                                {/* <FormattedMessage id="admin.manage-doctor.name-clinic" /> */}
                                Tiêu đề
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
                            <label htmlFor="inputCity">Chọn ảnh chủ đề</label>
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
                                        className="preview pv-left preview-right"
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
                                Nhóm tác giả
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                value={authors}
                                onChange={(e) => this.onChangeInput('authors', e.target.value)}
                            />
                        </div>
                        <div className=" form-group col-md-3">
                            <label>Nhãn tin(Ưu đãi, Mới ra mắt)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                value={type}
                                onChange={(e) => this.onChangeInput('type', e.target.value)}
                            />
                        </div>
                        <div className=" form-group col-md-3">
                            <label>Nhóm cố vấn</label>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                isMulti
                                defaultValue={''}
                                onChange={(e) => this.handlePickDoctor(e)}
                                options={allDoctor}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className=" form-group col-md-6">
                            <label>Chủ đề</label>
                            <textarea
                                className="info-doctor form-control"
                                rows="4"
                                onChange={(e) => this.onChangeInput('topic', e.target.value)}
                                value={this.state.topic}
                                placeholder="Chủ đề (50 từ<)"
                            ></textarea>
                        </div>
                        <div className=" form-group col-md-6">
                            <label>Tiêu điểm bài viết</label>
                            <textarea
                                className="info-doctor form-control"
                                rows="4"
                                onChange={(e) => this.onChangeInput('focus', e.target.value)}
                                value={this.state.focus}
                                placeholder="Viết thành từng dòng, ngắn gọn(50 từ<)"
                            ></textarea>
                        </div>
                    </div>

                    <div className="manage-doctor-editor">
                        <label className="title-editor">
                            {/* <FormattedMessage id="admin.manage-doctor.detail-doctor" /> */}
                            Bài viết:
                        </label>
                        <CKeditor handleEditorChange={this.handleEditorChange} value={this.state.contentHtml} />
                    </div>
                </div>
                <div className="container_btn coverArea">
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            this.handleClickSubmit();
                        }}
                    >
                        Đăng bài
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageNews);
