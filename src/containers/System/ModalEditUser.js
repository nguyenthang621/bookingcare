import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            id: '',
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        console.log(user);
        if (user && !_.isEmpty(user)) {
            this.setState({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                id: user.id,
            });
        }
    }

    toggle = () => {
        this.props.toggleModel();
        this.props.re_renderModalEdit();
    };

    handleChangeInput = (e, key) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    validateInput = () => {
        let inputNames = ['email', 'firstName', 'lastName', 'address'];
        let check = true;
        for (let name of inputNames) {
            if (!this.state[name]) {
                check = false;
                alert('missing ' + name);
                break;
            }
        }
        return check;
    };
    handleEditUser = async (user) => {
        if (this.validateInput()) {
            await this.props.updateUser(user);
        }
    };

    render() {
        return (
            <>
                <Modal
                    className="modal-user-container"
                    isOpen={this.props.isOpenModel}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered={true}
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        {this.props.isEdit ? 'Edit user' : 'Create new user'}
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-user-container">
                            <div className="form-row ">
                                <div className="form-group col-6">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="@gmail.com"
                                        disabled={this.props.isEdit}
                                        onChange={(e) => this.handleChangeInput(e, 'email')}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="123456"
                                        onChange={(e) => this.handleChangeInput(e, 'password')}
                                        value={this.state.password}
                                    />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-6">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="thang"
                                        onChange={(e) => this.handleChangeInput(e, 'firstName')}
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="nguyen"
                                        onChange={(e) => this.handleChangeInput(e, 'lastName')}
                                        value={this.state.lastName}
                                    />
                                </div>
                            </div>
                            <div className="form-group ">
                                <div className="">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="123 ha noi"
                                        onChange={(e) => this.handleChangeInput(e, 'address')}
                                        value={this.state.address}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className=" button btn-save"
                            color="primary"
                            onClick={() => this.handleEditUser(this.state)}
                        >
                            Change
                        </Button>{' '}
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
