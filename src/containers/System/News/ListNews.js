import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getNewsServices } from '../../../services/patientServices';
import { deleteNewsServices } from '../../../services/userServices';

import 'react-datepicker/dist/react-datepicker.css';
import './ListNews.scss';
import { toast } from 'react-toastify';
import ConfirmModal from '../../../components/ConfirmModal';

import ModalNews from './ModalNews';
import SelectStatusId from '../Doctor/SelectStatusId';

import _ from 'lodash';

class ListNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: [],
            isShowModalNews: false,
            id: '',
            statusId: 'S1',
        };
    }

    async componentDidMount() {
        let { statusId } = this.state;
        await this.handleGetNews(statusId);
    }
    componentDidUpdate(prevProps) {}
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
    handleChangeInput = async (e) => {
        let statusId = e.target.value;
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
        let { listNews, isShowModalNews, id, statusId, isShowConfirmModal } = this.state;
        let {} = this.props;
        let listSelect = {
            new: <FormattedMessage id="admin.status.new" />,
            confirmed: <FormattedMessage id="admin.status.confirmed" />,
            canceled: <FormattedMessage id="admin.status.canceled" />,
            states: { new: 'S1', confirmed: 'S2', canceled: 'S3' },
        };
        return (
            <div className="manage-handbook-container mt-2">
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
                    />
                ) : (
                    ''
                )}
                <div className="handbook-title">
                    <h3>Danh sách tin tức</h3>
                </div>
                <div className="manage-handbook-wrapper">
                    <div className="handbook-table coverArea">
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
                                    <th scope="col">Title</th>
                                    <th scope="col">Sender</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Confirm</th>
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
                                                    {this.state.statusId === 'S1' && (
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
                                                        Delete
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
