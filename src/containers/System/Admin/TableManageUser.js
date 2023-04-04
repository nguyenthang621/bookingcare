import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import ScrollIntoView from 'react-scroll-into-view';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            keyForm: [],
        };
    }
    componentDidMount() {
        // this.props.fetchAllUSerRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allUserRedux !== this.props.allUserRedux) {
            this.setState({
                users: this.props.allUserRedux,
            });
        }
    }
    handleClickDestroyUser = (userId) => {
        this.props.toggleModelConfirm(userId);
    };

    convertKeyToValue = (itemId, arrData) => {
        if (!itemId || arrData?.length <= 0) return '';
        for (let item of arrData) {
            if (item.keyMap === itemId) {
                return item.valueVi;
            }
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="users-table ">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="fixedTop">
                                <th>STT</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>Giới tính</th>
                                <th>Địa chỉ</th>
                                <th>Chức vụ</th>
                                <th>Hành động</th>
                            </tr>
                            {this.props.users.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.email}</td>
                                        <td>{`${user.firstName} ${user.lastName}`}</td>
                                        <td>
                                            {this.convertKeyToValue(user.gender, this.props?.keyForm?.genders || []) ||
                                                ''}
                                        </td>
                                        <td>{user.address || ''}</td>
                                        <td>
                                            {this.convertKeyToValue(user.roleId, this.props?.keyForm?.roles || []) ||
                                                ''}
                                        </td>
                                        <td className="dfc">
                                            <ScrollIntoView selector="#user-redux">
                                                <button
                                                    className=" trans btn btn-edit"
                                                    onClick={() => {
                                                        this.props.handleClickEditUser(user);
                                                    }}
                                                >
                                                    <FaPencilAlt />
                                                </button>
                                            </ScrollIntoView>
                                            <button
                                                className=" trans btn btn-delete"
                                                // onClick={() => this.handleDeleteUser(user.id)}
                                                onClick={() => this.handleClickDestroyUser(user.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allUserRedux: state.admin.allUser,
        keyForm: state.admin.keyForm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUSerRedux: () => dispatch(actions.filterAndPagingUserRedux()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
