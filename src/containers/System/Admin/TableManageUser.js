import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllUSerRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allUserRedux !== this.props.allUserRedux) {
            this.setState({
                users: this.props.allUserRedux,
            });
        }
    }
    handleDeleteUser = (userId) => {
        this.props.deleteUserRedux(userId);
    };

    render() {
        return (
            <React.Fragment>
                <div className="users-table mt-3 mx-5 mr-2 ml-2 mb-5">
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
                                                onClick={() => {
                                                    this.props.handleClickEditUser(user);
                                                }}
                                            >
                                                <FaPencilAlt />
                                            </button>
                                            <button
                                                className=" trans btn btn-delete"
                                                onClick={() => this.handleDeleteUser(user.id)}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUSerRedux: () => dispatch(actions.fetchAllUser()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUserRedux(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
