import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getUsersById, createUserServices, deleteUserServices, editUserServices } from '../../services/userServices';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import './UserManage.scss';
import { FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModel: false,
            isEdit: false,
            dataUserEdit: {},
        };
    }

    async componentDidMount() {
        await this.getUsers('ALL');
    }

    async getUsers(id) {
        let data = await getUsersById(id);
        if (data && data.errorCode === 0) {
            this.setState({ users: data.users });
        }
    }

    handleAddNewUser = () => {
        this.setState({ isOpenModel: true, isEdit: false });
    };

    re_renderModalEdit = () => {
        this.setState({ isEdit: false });
    };

    handleToggleModel = () => {
        this.setState({ isOpenModel: !this.state.isOpenModel });
    };

    createNewUser = async (data) => {
        let response = await createUserServices(data);
        if (response.errorCode === 0) {
            this.setState({ isOpenModel: false });
            await this.getUsers('ALL');
        } else {
            alert(response.message);
        }
    };

    handleDeleteUserServices = async (userId) => {
        try {
            let response = await deleteUserServices(userId);
            if (response && response.errorCode === 0) {
                await this.getUsers('ALL');
            }
        } catch (error) {
            console.log('error delete', error);
        }
    };

    updateUser = async (user) => {
        try {
            let response = await editUserServices(user);
            if (response && response.errorCode === 0) {
                this.setState({ isOpenModel: false });
                await this.getUsers('ALL');
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleEditUser = async (userId) => {
        try {
            let data = await getUsersById(userId);
            this.setState({
                isEdit: true,
                isOpenModel: true,
                dataUserEdit: data.users,
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className="users-container">
                {this.state.isEdit ? (
                    <ModalEditUser
                        isOpenModel={this.state.isOpenModel}
                        toggleModel={this.handleToggleModel}
                        isEdit={this.state.isEdit}
                        currentUser={this.state.dataUserEdit}
                        re_renderModalEdit={this.re_renderModalEdit}
                        updateUser={this.updateUser}
                    />
                ) : (
                    <ModalUser
                        isOpenModel={this.state.isOpenModel}
                        toggleModel={this.handleToggleModel}
                        createNewUser={this.createNewUser}
                    />
                )}
                <div className="title text-center">Manage users</div>
                <div className="box-btn ml-5">
                    <button type="button" className="btn-add" onClick={() => this.handleAddNewUser()}>
                        <FaPlus />
                        <span className="ml-1">Add new user</span>
                    </button>
                </div>
                <div className="users-table mt-3 mx-5">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {this.state.users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <button
                                                className=" trans btn btn-edit"
                                                onClick={() => this.handleEditUser(user.id)}
                                            >
                                                <FaPencilAlt />
                                            </button>
                                            <button
                                                className=" trans btn btn-delete"
                                                onClick={() => this.handleDeleteUserServices(user.id)}
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
