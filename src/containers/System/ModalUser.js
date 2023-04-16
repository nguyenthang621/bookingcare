import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import 'react-image-lightbox/style.css';

import { LANGUAGES, CRUD_ACTIONS, PATH_FIREBASE } from '../../utils';
import { uploadFileToFirebase } from '../../firebase/uploadFile';
import { editUserServices, createUserServices } from '../../services/userServices';

import './Admin/UserRedux.scss';
import { FaFileUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Modal.scss';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {},
        };
    }

    componentDidMount() {}
    componentDidUpdate() {}

    toggle = () => {
        this.props.toggleModel();
    };

    handleClickSubmit = async () => {
        let { file } = this.props.data;
        let imageURL = '';
        if (!file) return;
        if (Object.keys(file).length > 0) {
            // await uploadFileToFirebase(PATH_FIREBASE.USER, file, this.handleSaveUser);
            imageURL = await uploadFileToFirebase(PATH_FIREBASE.USER, file);
        }

        this.handleSaveUser(imageURL);
    };

    handleSaveUser = async (imageURL) => {
        let checkValidate = this.checkValidate();
        let response = '';
        if (!checkValidate) return;
        if (this.props.data.currentAction === CRUD_ACTIONS.CREATE) {
            response = await createUserServices({
                email: this.props.data.email,
                password: this.props.data.password,
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                address: this.props.data.address,
                phoneNumber: this.props.data.phoneNumber,
                gender: this.props.data.gender,
                position: this.props.data.position,
                roleId: this.props.data.roleId,
                // avatar: this.props.data.avatar,
                fileURL: imageURL,
            });
        }
        if (this.props.data.currentAction === CRUD_ACTIONS.EDIT) {
            response = await editUserServices({
                id: this.props.data.currentIdUserEdit,
                email: this.props.data.email,
                password: this.props.data.password,
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                address: this.props.data.address,
                phoneNumber: this.props.data.phoneNumber,
                gender: this.props.data.gender,
                position: this.props.data.position,
                roleId: this.props.data.roleId,
                fileURL: imageURL,
            });
        }

        if (response?.errorCode === 0) {
            this.props.refreshForm();

            this.props.handleRefreshTable();
            this.props.toggleModel();
            toast.success(response?.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(response?.message || 'Đã có lỗi xảy ra! Vui lòng thử lại.', {
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

    checkValidate = () => {
        let check = true;
        const inputs = [
            { field: 'email', text: 'Chưa điền email' },
            { field: 'firstName', text: 'Chưa điền Họ' },
            { field: 'lastName', text: 'Chưa điền tên' },
            { field: 'address', text: 'Chưa điền địa chỉ' },
            { field: 'password', text: 'Chưa điền mật khẩu' },
            // { field: 'gender', text: 'Chưa chọn giới tính' },
            // { field: 'position', text: 'Chưa chọn chuyên khoa' },
            // { field: 'roleId', text: 'Chưa điền thông tin giới thiệu bác sĩ' },
        ];
        for (let i = 0; i < inputs.length; i++) {
            if (!this.props.data[inputs[i]['field']]) {
                check = false;
                // this.setState({
                //     error[[inputs[i]['field']]:[inputs[i]['text']
                // })
                toast.warning(inputs[i]['text'], {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;
            }
        }
        return check;
    };

    render() {
        let { languageRedux } = this.props;
        let {
            email,
            firstName,
            lastName,
            address,
            password,
            phoneNumber,
            genders,
            positions,
            roles,
            gender,
            position,
            roleId,
            currentAction,
        } = this.props.data;
        console.log(languageRedux);
        return (
            <>
                <Modal
                    className="modal-user-container"
                    isOpen={this.props.isOpenModel}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered={true}
                >
                    <ModalHeader toggle={() => this.toggle()}>Thêm mới người dùng</ModalHeader>
                    <ModalBody>
                        <div className="user-redux-body">
                            <div className="container">
                                <div className="form-container">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">
                                                <FormattedMessage id="manage-user.email" />
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'email')}
                                                disabled={currentAction === CRUD_ACTIONS.EDIT ? true : false}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">
                                                <FormattedMessage id="manage-user.password" />
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'password')}
                                                disabled={currentAction === CRUD_ACTIONS.EDIT ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">
                                                <FormattedMessage id="manage-user.firstName" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First name"
                                                value={firstName}
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'firstName')}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">
                                                <FormattedMessage id="manage-user.lastName" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last name"
                                                value={lastName}
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'lastName')}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-9">
                                            <label htmlFor="inputAddress">
                                                <FormattedMessage id="manage-user.address" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="1234 Main St"
                                                value={address}
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'address')}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputPassword4">
                                                <FormattedMessage id="manage-user.phoneNumber" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="098"
                                                value={phoneNumber}
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'phoneNumber')}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputState">
                                                <FormattedMessage id="manage-user.gender" />
                                            </label>
                                            <select
                                                id="inputState"
                                                className="form-control"
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'gender')}
                                                value={gender}
                                            >
                                                {genders &&
                                                    genders.length > 0 &&
                                                    genders.map((gender) => {
                                                        return (
                                                            <option key={gender.id} value={gender.keyMap}>
                                                                {languageRedux === LANGUAGES.VI
                                                                    ? gender.valueVi
                                                                    : gender.valueEn}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputState">Position</label>

                                            <select
                                                value={position}
                                                id="inputState"
                                                className="form-control"
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'position')}
                                            >
                                                {positions &&
                                                    positions.length > 0 &&
                                                    positions.map((position) => {
                                                        return (
                                                            <option key={position.id} value={position.keyMap}>
                                                                {languageRedux === LANGUAGES.VI
                                                                    ? position.valueVi
                                                                    : position.valueEn}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputState">Role</label>
                                            <select
                                                value={roleId}
                                                id="inputState"
                                                className="form-control"
                                                onChange={(e) => this.props.handleOnchangeInput(e, 'roleId')}
                                            >
                                                {roles &&
                                                    roles.length > 0 &&
                                                    roles.map((role) => {
                                                        return (
                                                            <option key={role.id} value={role.keyMap}>
                                                                {languageRedux === LANGUAGES.VI
                                                                    ? role.valueVi
                                                                    : role.valueEn}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3 upload-file-container">
                                            <label htmlFor="inputCity">
                                                <FormattedMessage id="manage-user.image" />
                                            </label>
                                            <div className="btn-container">
                                                <div className="change-image">
                                                    <input
                                                        id="uploadFile"
                                                        type="file"
                                                        className="form-control"
                                                        accept=".jpg, .jpeg, .png"
                                                        hidden
                                                        onChange={(e) => this.props.handleOnchangeImage(e)}
                                                    />
                                                    <label className="text-upload" htmlFor="uploadFile">
                                                        <FormattedMessage id="manage-user.uploadImage" />
                                                        <FaFileUpload className="icon-upload" />
                                                    </label>
                                                </div>
                                                {this.props.data.isShowBoxImage && (
                                                    <div
                                                        className="preview"
                                                        style={{
                                                            backgroundImage: `url(${this.props.data.previewImageUrl})`,
                                                        }}
                                                        onClick={() => this.props.handleShowPreviewAvatar()}
                                                    ></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="text"
                            className={
                                this.props.data.currentAction === CRUD_ACTIONS.EDIT
                                    ? 'btn btn-warning'
                                    : 'btn btn-primary'
                            }
                            onClick={() => this.handleClickSubmit()}
                        >
                            {this.props.data.currentAction === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage id="manage-user.edit" />
                            ) : (
                                <FormattedMessage id="manage-user.save" />
                            )}
                        </button>
                        <Button className="button btn btn-cancel" color="secondary" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        keyForm: state.admin.keyForm,
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchKeyFromRedux: () => dispatch(actions.fetchKeyForm()),
        fetchAllUSerRedux: () => dispatch(actions.filterAndPagingUserRedux()),
        createNewUser: (dataUser) => dispatch(actions.createNewUserRedux(dataUser)),
        editUserRedux: (user) => dispatch(actions.editUserRedux(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
