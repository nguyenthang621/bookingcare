import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

import { LANGUAGES, CRUD_ACTIONS, CommonUtils, PATH_FIREBASE } from '../../../utils';
import { uploadFileToFirebase } from '../../../firebase/uploadFile';

import './UserRedux.scss';
import { FaFileUpload } from 'react-icons/fa';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImageUrl: '',
            isShowBoxImage: false,
            isRoomImage: false,

            file: {},
            fileURL: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            roleId: '',
            avatar: '',
            previewImageUrl: '',

            currentAction: CRUD_ACTIONS.CREATE,
            currentIdUserEdit: '',
        };
    }

    componentDidMount() {
        this.props.fetchKeyFromRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.keyForm !== this.props.keyForm) {
            let { genders, positions, roles } = this.props.keyForm;
            this.setState({
                genders: genders,
                positions: positions,
                roles: roles,

                gender: genders && genders.length > 0 ? genders[0].keyMap : '',
                position: positions && positions.length > 0 ? positions[0].keyMap : '',
                roleId: roles && roles.length > 0 ? roles[0].keyMap : '',
            });
        }
        if (prevProps.allUserRedux !== this.props.allUserRedux) {
            let { genders, positions, roles } = this.props.keyForm;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                avatar: '',
                previewImageUrl: '',

                gender: genders && genders.length > 0 ? genders[0].keyMap : '',
                position: positions && positions.length > 0 ? positions[0].keyMap : '',
                roleId: roles && roles.length > 0 ? roles[0].keyMap : '',
            });
        }
    }
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({ previewImageUrl: objectUrl, isShowBoxImage: true, avatar: base64, file: file });
        }
    };
    handleOnchangeInput = (e, key) => {
        let copyState = { ...this.state };
        copyState[key] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleClickSubmit = async () => {
        let { file, fileURL } = this.state;
        if (!file) return;

        // await uploadFileToFirebase(PATH_FIREBASE.USER, file, this.handleSaveUser);
        let imageURL = await uploadFileToFirebase(PATH_FIREBASE.USER, file);
        this.handleSaveUser(imageURL);
    };

    handleSaveUser = async (imageURL) => {
        let checkValidate = this.checkValidate();
        if (!checkValidate) return;
        if (this.state.currentAction === CRUD_ACTIONS.CREATE) {
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                position: this.state.position,
                roleId: this.state.roleId,
                // avatar: this.state.avatar,
                fileURL: imageURL,
            });
        }
        if (this.state.currentAction === CRUD_ACTIONS.EDIT) {
            await this.props.editUserRedux({
                id: this.state.currentIdUserEdit,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                position: this.state.position,
                roleId: this.state.roleId,
                fileURL: imageURL,
            });
            this.setState({
                currentAction: CRUD_ACTIONS.CREATE,
                isShowBoxImage: false,
            });
        }
        let { genders, positions, roles } = this.props.keyForm;

        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            avatar: '',

            gender: genders && genders.length > 0 ? genders[0].keyMap : '',
            position: positions && positions.length > 0 ? positions[0].keyMap : '',
            roleId: roles && roles.length > 0 ? roles[0].keyMap : '',
        });
    };

    checkValidate = () => {
        let check = true;
        let inputs = [
            'email',
            'firstName',
            'lastName',
            'address',
            'password',
            'phoneNumber',
            'gender',
            'position',
            'roleId',
        ];
        for (let i = 0; i < inputs.length; i++) {
            if (!this.state[inputs[i]]) {
                check = false;
                alert('missing parameter ' + inputs[i]);
                break;
            }
        }
        return check;
    };

    handleClickEditUser = (dataUser) => {
        this.setState({
            email: dataUser.email,
            firstName: dataUser.firstName || '',
            lastName: dataUser.lastName || '',
            address: dataUser.address || '',
            password: '123456',
            phoneNumber: dataUser.phoneNumber || '',
            gender: dataUser.gender,
            position: dataUser.position,
            roleId: dataUser.roleId,
            previewImageUrl: dataUser.imageURL,
            isShowBoxImage: true,

            currentAction: CRUD_ACTIONS.EDIT,
            currentIdUserEdit: dataUser.id,
        });
    };
    handleCancelEdit = () => {
        let { genders, positions, roles } = this.props.keyForm;

        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            password: '',
            phoneNumber: '',

            gender: genders && genders.length > 0 ? genders[0].keyMap : '',
            position: positions && positions.length > 0 ? positions[0].keyMap : '',
            roleId: roles && roles.length > 0 ? roles[0].keyMap : '',
            currentAction: CRUD_ACTIONS.CREATE,
        });
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
        } = this.state;
        return (
            <div className="user-redux-container" id="user-redux">
                <div className="title">User react-redux</div>
                <div className="use-redux-body">
                    <div className="container mt-4">
                        <div className="text">
                            <span>
                                <FormattedMessage id="manage-user.add" />
                            </span>
                        </div>
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'password')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'gender')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'position')}
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
                                        onChange={(e) => this.handleOnchangeInput(e, 'roleId')}
                                    >
                                        {roles &&
                                            roles.length > 0 &&
                                            roles.map((role) => {
                                                return (
                                                    <option key={role.id} value={role.keyMap}>
                                                        {languageRedux === LANGUAGES.VI ? role.valueVi : role.valueEn}
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
                                                className="preview"
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
                            <button
                                type="text"
                                className={
                                    this.state.currentAction === CRUD_ACTIONS.EDIT
                                        ? 'btn btn-warning'
                                        : 'btn btn-primary'
                                }
                                onClick={() => this.handleClickSubmit()}
                            >
                                {this.state.currentAction === CRUD_ACTIONS.EDIT ? (
                                    <FormattedMessage id="manage-user.edit" />
                                ) : (
                                    <FormattedMessage id="manage-user.save" />
                                )}
                            </button>
                            {this.state.currentAction === CRUD_ACTIONS.EDIT && (
                                <button className="btn btn-secondary ml-3" onClick={() => this.handleCancelEdit()}>
                                    {this.state.currentAction === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.cancel" />
                                    ) : (
                                        <FormattedMessage id="manage-user.cancel" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <TableManageUser handleClickEditUser={this.handleClickEditUser} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        keyForm: state.admin.keyForm,
        allUserRedux: state.admin.allUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchKeyFromRedux: () => dispatch(actions.fetchKeyForm()),
        createNewUser: (dataUser) => dispatch(actions.createNewUserRedux(dataUser)),
        fetchAllUSerRedux: () => dispatch(actions.fetchAllUser()),
        editUserRedux: (user) => dispatch(actions.editUserRedux(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
