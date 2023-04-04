import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { toast } from 'react-toastify';
import { deleteUserServices, filterAndPagingUser } from '../../../services';
import actionTypes from '../../../store/actions/actionTypes';

import { CRUD_ACTIONS, CommonUtils } from '../../../utils';

import './UserRedux.scss';

import ModalUser from '../ModalUser';
import ModalConfirm from '../ModalConfirm.js';
import SearchInput from '../../../components/SearchInput.js';
import FooterPaging from '../../../components/FooterPaging.js';
import SelectStatusId from '../../../components/SelectStatusId';
import Loading from '../../../components/Loading';

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

            users: [],
            totalPage: 1, // toltalPage
            count: 1,

            keywordSearchUser: '',
            roleIdSelected: '', // roleId filter
            PageIndex: 1,
            limit: 10,

            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.props.fetchKeyFromRedux();
        await this.handleRefreshTable();
    }

    reRenderFilterAndPaging = async (keywordSearchUser, roleIdSelected, PageIndex, limit) => {
        this.isShowLoading();
        let response = await filterAndPagingUser({
            keyword: keywordSearchUser,
            roleId: roleIdSelected,
            page: PageIndex,
            limit,
        });
        if (response && response.errorCode === 0) {
            this.setState({
                keywordSearchUser: keywordSearchUser,
                roleIdSelected: roleIdSelected,
                PageIndex: PageIndex,
                limit: limit,
                totalPage: response.data.totalPage,
                count: response.data.count,
                users: response.data.rows,
                isShowLoading: false,
            });
        }
    };

    handleRefreshTable = async () => {
        let { keywordSearchUser, roleIdSelected, PageIndex, limit } = this.state;
        await this.reRenderFilterAndPaging(keywordSearchUser, roleIdSelected, PageIndex, limit);
    };

    async componentDidUpdate(prevProps) {
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
        let { roleIdSelected, limit } = this.state;
        try {
            console.log(currentKeyword);
            this.reRenderFilterAndPaging(currentKeyword, roleIdSelected, 1, limit);
        } catch (error) {
            console.log(error);
        }
    };

    handleChangePage = async (numberPage) => {
        let { keywordSearchUser, roleIdSelected, PageIndex, limit, totalPage } = this.state;

        if (numberPage === 'next') {
            if (+PageIndex < +totalPage) {
                console.log('next');
                this.reRenderFilterAndPaging(keywordSearchUser, roleIdSelected, +this.state.PageIndex + 1, limit);
                this.setState({
                    PageIndex: this.state.PageIndex + 1,
                });
            }
        } else if (numberPage === 'back') {
            if (+PageIndex > 1) {
                console.log('back');
                this.reRenderFilterAndPaging(keywordSearchUser, roleIdSelected, +this.state.PageIndex - 1, limit);
                this.setState({
                    PageIndex: this.state.PageIndex - 1,
                });
            }
        } else {
            this.setState({
                PageIndex: +numberPage,
            });
            this.reRenderFilterAndPaging(keywordSearchUser, roleIdSelected, numberPage, limit);
        }
    };

    // delete user:
    deleteUser = async (userId) => {
        try {
            let { keywordSearchUser, roleIdSelected, PageIndex, limit } = this.state;
            let res = await deleteUserServices(userId);
            if (res && res.errorCode === 0) {
                toast.success(res?.message, {
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

                await this.reRenderFilterAndPaging(keywordSearchUser, roleIdSelected, PageIndex, limit);
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

    refreshForm = () => {
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

    handleChangeInput = async (id) => {
        // change input radio
        let { keywordSearchUser, PageIndex, limit } = this.state;
        this.reRenderFilterAndPaging(keywordSearchUser, id, PageIndex, limit);
    };

    isShowLoading = () => {
        this.setState({
            isShowLoading: true,
        });
    };
    isHideLoading = () => {
        this.setState({
            isShowLoading: false,
        });
    };

    render() {
        let { isShowModalConfirm, users } = this.state;
        let {} = this.props;

        let listSelect = [
            { text: <FormattedMessage id="admin.role.all" />, id: '' },
            { text: <FormattedMessage id="admin.role.admin" />, id: 'R1' },
            { text: <FormattedMessage id="admin.role.doctor" />, id: 'R2' },
            { text: <FormattedMessage id="admin.role.patient" />, id: 'R3' },
        ];

        return (
            <div className="user-redux-container position-loading" id="user-redux">
                {this.state.isShowLoading && <Loading />}
                <div className="title">Quản lý người dùng</div>
                <div className="wrapper-container">
                    <div className="action-modal">
                        <div className="df filter">
                            <SearchInput
                                placeholder="Tìm kiếm..."
                                handleSearch={this.handleSearchUser}
                                delay={800}
                                className="mr8"
                            />
                            <div className="filter-role ml8">
                                <SelectStatusId
                                    handleChangeInput={this.handleChangeInput}
                                    listSelect={listSelect}
                                    appointment
                                    statusId={this.state.roleIdSelected}
                                />
                            </div>
                        </div>
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
                        handleRefreshTable={this.handleRefreshTable}
                        refreshForm={this.refreshForm}
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
                        users={users}
                    />
                    <FooterPaging
                        titleTotalRecord="Tổng người dùng"
                        TotalPage={this.state.totalPage}
                        PageIndex={this.state.PageIndex}
                        TotalRecord={this.state.count}
                        handleChangePage={this.handleChangePage}
                    />
                    {isShowModalConfirm ? (
                        <ModalConfirm
                            toggleModel={this.toggleModel}
                            isShowModalConfirm={isShowModalConfirm}
                            toggleModelConfirm={this.toggleModelConfirm}
                            handleDeleteItem={this.deleteUser}
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
        paramsSearchRedux: state.admin.paramsSearch,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchKeyFromRedux: () => dispatch(actions.fetchKeyForm()),
        fetchAllUSerRedux: (paramsSearch) => dispatch(actions.filterAndPagingUserRedux(paramsSearch)),
        editUserRedux: (user) => dispatch(actions.editUserRedux(user)),
        setCurrentKeywordRedux: (keyword, page, limit, roleId) =>
            dispatch({
                type: actionTypes.SET_PARAMS_SEARCH,
                data: { keyword, page, limit, roleId },
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
