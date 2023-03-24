import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { toast } from 'react-toastify';
import { deleteUserServices } from '../../../services';
import actionTypes from '../../../store/actions/actionTypes';

import { CRUD_ACTIONS, CommonUtils } from '../../../utils';

import './UserRedux.scss';

import ModalUser from '../ModalUser';
import ModalConfirm from '../ModalConfirm.js';
import SearchInput from '../../../components/SearchInput.js';
import FooterPaging from '../../../components/FooterPaging.js';

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

            currentAction: CRUD_ACTIONS.CREATE,
            currentIdUserEdit: '',
            isOpenModel: false, // model create user
            isShowModalConfirm: false, // model confirm
            currentUserId: '',

            keywordSearchUser: '',
            page: 1,
            limit: 10,

            PageIndex: 1,
        };
    }

    async componentDidMount() {
        this.props.fetchKeyFromRedux();
        await this.props.fetchAllUSerRedux(this.props.paramsSearchRedux);
    }

    async componentDidUpdate(prevProps, prevState) {
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

    handleToggleModel = () => {
        this.setState({ isOpenModel: !this.state.isOpenModel });
    };

    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({ previewImageUrl: objectUrl, isShowBoxImage: true, avatar: base64, file: file });
        }
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
        this.handleToggleModel();
    };

    handleShowModal = () => {
        this.handleToggleModel();
        this.setState({ currentAction: CRUD_ACTIONS.CREATE, previewImageUrl: '', isShowBoxImage: false });
    };

    handleShowPreviewAvatar = () => {
        this.setState({ isRoomImage: true });
    };
    handleOnchangeInput = (e, key) => {
        let copyState = { ...this.state };
        copyState[key] = e.target.value;
        this.setState({
            ...copyState,
        });
    };
    toggleModelConfirm = (userId) => {
        this.setState({
            isShowModalConfirm: !this.state.isShowModalConfirm,
            currentUserId: userId,
        });
    };

    handleSearchUser = (currentKeyword) => {
        let { keywordSearchUser, page, limit } = this.state;
        try {
            // this.setState({
            //     keywordSearchUser: currentKeyword,
            // });
            this.props.setCurrentKeywordRedux(currentKeyword, page, limit);
            console.log(this.props.paramsSearchRedux);
            this.props.fetchAllUSerRedux(this.props.paramsSearchRedux);
        } catch (error) {
            console.log(error);
        }
    };

    handleChangePage = async (numberPage) => {
        let { currentKeyword, page, limit } = this.state;
        if (numberPage === 'next') {
            if (page < this.props.totalPageRedux) {
                this.setState({
                    page: this.state.page + 1,
                });
                await this.props.setCurrentKeywordRedux(currentKeyword, numberPage, limit);
            }
        } else if (numberPage === 'back') {
            if (page > 1) {
                this.setState({
                    page: this.state.page - 1,
                });
                await this.props.setCurrentKeywordRedux(currentKeyword, numberPage, limit);
            }
        } else {
            console.log('numberPage', numberPage);
            this.setState({
                page: +numberPage,
            });
            await this.props.setCurrentKeywordRedux(currentKeyword, numberPage, limit);
        }
        await this.props.fetchAllUSerRedux(this.props.paramsSearchRedux);
    };

    // delete user:
    deleteUser = async (userId) => {
        try {
            let res = await deleteUserServices(userId);
            if (res && res.errorCode === 0) {
                toast.success('Xoá người dùng thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({
                    isShowModalConfirm: !this.state.isShowModalConfirm,
                    currentUserId: '',
                });
                this.props.fetchAllUSerRedux();
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
        } catch (error) {
            console.log('delete user fail: ', error);
        }
    };

    render() {
        let { isShowModalConfirm, page } = this.state;
        let { paramsSearchRedux } = this.props;

        return (
            <div className="user-redux-container" id="user-redux">
                <div className="title">Quản lý người dùng</div>
                <div className="wrapper-container">
                    <div className="action-modal">
                        <SearchInput placeholder="Tìm kiếm..." handleSearchUser={this.handleSearchUser} delay={800} />
                        <button className="btn btn-primary btn-add-user" onClick={() => this.handleShowModal()}>
                            <FormattedMessage id="manage-user.add" />
                        </button>
                    </div>
                    <ModalUser
                        isOpenModel={this.state.isOpenModel}
                        toggleModel={this.handleToggleModel}
                        data={this.state}
                        handleOnchangeInput={this.handleOnchangeInput}
                        handleOnchangeImage={this.handleOnchangeImage}
                        handleShowPreviewAvatar={this.handleShowPreviewAvatar}
                    />
                    {/* {this.state.isRoomImage && (
                        <Lightbox
                            mainSrc={this.state.previewImageUrl}
                            onCloseRequest={() => this.setState({ isRoomImage: false })}
                        />
                    )} */}
                    <TableManageUser
                        handleClickEditUser={this.handleClickEditUser}
                        toggleModelConfirm={this.toggleModelConfirm}
                    />
                    <FooterPaging
                        TotalPage={this.props.totalPageRedux}
                        PageIndex={paramsSearchRedux.page}
                        TotalRecord={this.props.countRedux}
                        handleChangePage={this.handleChangePage}
                    />
                    {isShowModalConfirm ? (
                        <ModalConfirm
                            toggleModel={this.toggleModel}
                            isShowModalConfirm={isShowModalConfirm}
                            toggleModelConfirm={this.toggleModelConfirm}
                            handleDestroy={this.deleteUser}
                            text="Xoá người dùng vĩnh viễn bạn chắc chắn chứ!"
                            type="confirm"
                            size="nm"
                            currentUserId={this.state.currentUserId}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        keyForm: state.admin.keyForm,
        allUserRedux: state.admin.allUser,
        totalPageRedux: state.admin.totalPage,
        countRedux: state.admin.count,
        paramsSearchRedux: state.user.paramsSearch,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchKeyFromRedux: () => dispatch(actions.fetchKeyForm()),
        fetchAllUSerRedux: (paramsSearch) => dispatch(actions.filterAndPagingUserRedux(paramsSearch)),
        editUserRedux: (user) => dispatch(actions.editUserRedux(user)),
        setCurrentKeywordRedux: (keyword, page, limit) =>
            dispatch({
                type: actionTypes.SET_PARAMS_SEARCH,
                data: { keyword, page, limit },
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
