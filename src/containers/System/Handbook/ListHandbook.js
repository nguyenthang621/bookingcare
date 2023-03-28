import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getHandbookServices } from '../../../services/patientServices';
import { deleteHandbookServices } from '../../../services/userServices';

import 'react-datepicker/dist/react-datepicker.css';
import './ListHandbook.scss';
import { toast } from 'react-toastify';

import ModalHandbook from './ModalHandbook';
import SelectStatusId from '../../../components/SelectStatusId';
import ConfirmModal from '../../../components/ConfirmModal';

import _ from 'lodash';

class ListHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHandbook: [],
            isShowModalHandbook: false,
            id: '',
            statusId: 'S1',
            isShowConfirmModal: false,
        };
    }

    async componentDidMount() {
        let { statusId } = this.state;
        await this.handleGetHandbook(statusId);
    }
    componentDidUpdate(prevProps) {}
    handleClickDetail = async (id) => {
        this.toggleModelConfirm();
        this.setState({
            id: id,
        });
    };

    handleGetHandbook = async () => {
        let { statusId } = this.state;
        let listHandbook = await getHandbookServices('', 'manage', statusId);
        this.setState({
            listHandbook: listHandbook.data,
        });
    };

    toggleModelConfirm = () => {
        this.setState({
            isShowModalHandbook: !this.state.isShowModalHandbook,
        });
    };
    handleChangeInput = async (statusId) => {
        let listHandbook = await getHandbookServices('', 'manage', statusId);
        this.setState({
            listHandbook: listHandbook.data,
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
    acceptDeleteHandbook = async () => {
        let response = await deleteHandbookServices(this.state.id);
        if (response && response.errorCode === 0) {
            await this.handleGetHandbook(this.state.statusId);
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
        let { listHandbook, isShowModalHandbook, id, statusId, isShowConfirmModal } = this.state;
        let {} = this.props;

        let listSelect = [
            { text: <FormattedMessage id="admin.status.new" />, id: 'S1' },
            { text: <FormattedMessage id="admin.status.confirmed" />, id: 'S2' },
            { text: <FormattedMessage id="admin.status.canceled" />, id: 'S3' },
        ];
        return (
            <div className="manage-handbook-container mt-2">
                {isShowConfirmModal && (
                    <ConfirmModal
                        toggleConfirmModal={this.toggleConfirmModal}
                        isShowConfirmModal={isShowConfirmModal}
                        deleteFunc={this.acceptDeleteHandbook}
                    />
                )}
                {isShowModalHandbook ? (
                    <ModalHandbook
                        isShowModalHandbook={isShowModalHandbook}
                        toggleModelConfirm={this.toggleModelConfirm}
                        id={id}
                        statusId={statusId}
                        handleGetHandbook={this.handleGetHandbook}
                    />
                ) : (
                    ''
                )}
                <div className="handbook-title">
                    <h3>Danh sách cẩm nang</h3>
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
                                    {this.state.statusId !== 'S3' && <th scope="col">Confirm</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {listHandbook &&
                                    listHandbook.length > 0 &&
                                    listHandbook.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <img src={item.image} atl="img"></img>
                                                </td>
                                                <td>{item.title}</td>
                                                <td>{`${item.senderData.firstName} ${item.senderData.lastName}`}</td>
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

                                                    {this.state.statusId !== 'S3' && (
                                                        <button
                                                            className="btn btn-warning"
                                                            onClick={() => this.handleClickDelete(item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleRedux: () => dispatch(actions.fetchAllcodeSchedule()),
        changeStatusIdRedux: (statusId) => dispatch(actions.changeStatusId(statusId)),
        getAppointmentDoctorRedux: (doctorId, initDate, statusId) =>
            dispatch(actions.getAppointmentDoctor(doctorId, initDate, statusId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHandbook);
