import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { getNewsServices } from '../../../services/patientServices';
import { deleteNewsServices } from '../../../services/userServices';

import 'react-datepicker/dist/react-datepicker.css';
import './ListNews.scss';
import { toast } from 'react-toastify';
import ConfirmModal from '../../../components/ConfirmModal';

import ModalNews from './ModalNews';
import SelectStatusId from '../../../components/SelectStatusId';

import Loading from '../../../components/Loading';

class ListNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: [],
            isShowModalNews: false,
            id: '',
            statusId: 'S1',

            isShowLoading: false,
        };
    }

    async componentDidMount() {
        let { statusId } = this.state;
        await this.handleGetNews(statusId);
    }
    componentDidUpdate() {}
    handleClickDetail = async (id) => {
        this.toggleModelConfirm();
        this.setState({
            id: id,
        });
    };

    handleGetNews = async () => {
        let { statusId } = this.state;
        let listNews = await getNewsServices('', 'manage', statusId);
        this.setState({
            listNews: listNews.data,
        });
    };

    toggleModelConfirm = () => {
        this.setState({
            isShowModalNews: !this.state.isShowModalNews,
        });
    };
    handleChangeInput = async (statusId) => {
        let listNews = await getNewsServices('', 'manage', statusId);
        this.setState({
            listNews: listNews.data,
            statusId: statusId,
        });
    };
    toggleConfirmModal = () => {
        this.setState({
            isShowConfirmModal: !this.state.isShowConfirmModal,
        });
    };
    handleClickDelete = async (id) => {
        this.toggleConfirmModal();
        this.setState({
            id: id,
        });
    };
    handleShowLoading = () => {
        this.setState({
            isShowLoading: true,
        });
    };

    handleHideLoading = () => {
        this.setState({
            isShowLoading: false,
        });
    };

    acceptDeleteNews = async () => {
        let response = await deleteNewsServices(this.state.id);
        if (response && response.errorCode === 0) {
            await this.handleGetNews(this.state.statusId);
            await this.props.checkQueueNewsRedux();

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
            this.toggleConfirmModal();
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
        let { listNews, isShowModalNews, id, statusId, isShowConfirmModal, isShowLoading } = this.state;
        let {} = this.props;

        let listSelect = [
            { text: <FormattedMessage id="admin.status.new" />, id: 'S1' },
            { text: <FormattedMessage id="admin.status.confirmed" />, id: 'S2' },
            { text: <FormattedMessage id="admin.status.canceled" />, id: 'S3' },
        ];
        return (
            <div className="manage-handbook-container mt-2  position-loading">
                {isShowLoading && <Loading />}

                {isShowConfirmModal && (
                    <ConfirmModal
                        toggleConfirmModal={this.toggleConfirmModal}
                        isShowConfirmModal={isShowConfirmModal}
                        deleteFunc={this.acceptDeleteNews}
                    />
                )}
                {isShowModalNews ? (
                    <ModalNews
                        isShowModalNews={isShowModalNews}
                        toggleModelConfirm={this.toggleModelConfirm}
                        id={id}
                        statusId={statusId}
                        handleGetNews={this.handleGetNews}
                        handleShowLoading={this.handleShowLoading}
                        handleHideLoading={this.handleHideLoading}
                        handleClickDelete={this.handleClickDelete}
                    />
                ) : (
                    ''
                )}

                <div className="handbook-title">
                    <h3>Danh sách tin tức</h3>
                </div>
                <div className="manage-handbook-wrapper w60">
                    <div className="handbook-table">
                        <SelectStatusId
                            handleChangeInput={this.handleChangeInput}
                            listSelect={listSelect}
                            statusId={statusId}
                        />
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Tiêu đề</th>
                                    <th scope="col">Người gửi</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listNews &&
                                    listNews.length > 0 &&
                                    listNews.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <img src={item.image} atl="img"></img>
                                                </td>
                                                <td>{item.title}</td>
                                                <td>{`${item.senderDataNews.firstName} ${item.senderDataNews.lastName}`}</td>
                                                <td>{item.statusId}</td>
                                                <td>
                                                    {(this.state.statusId === 'S1' || this.state.statusId === 'S2') && (
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => this.handleClickDetail(item.id)}
                                                        >
                                                            Detail
                                                        </button>
                                                    )}

                                                    {'  '}

                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => this.handleClickDelete(item.id)}
                                                    >
                                                        {this.state.statusId === 'S3' ? 'Đăng lại' : 'Xoá'}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctorRedux: state.doctor.allDoctor,
        listAppointmentRedux: state.doctor.listAppointment,
        statusIdRedux: state.doctor.statusId,
        languageRedux: state.app.language,
        userInfoRedux: state.user.userInfo,
        queueNews: state.user.queueNews,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleRedux: () => dispatch(actions.fetchAllcodeSchedule()),
        changeStatusIdRedux: (statusId) => dispatch(actions.changeStatusId(statusId)),
        getAppointmentDoctorRedux: (doctorId, initDate, statusId) =>
            dispatch(actions.getAppointmentDoctor(doctorId, initDate, statusId)),
        checkQueueNewsRedux: () => dispatch(actions.checkQueueNewsRedux()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNews);
