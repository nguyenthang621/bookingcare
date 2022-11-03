import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            address: '',
        };
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleModel();
    };

    handleChangeInput = (e, key) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    validateInput = () => {
        let inputNames = ['email', 'password', 'firstName', 'lastName', 'address'];
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

    handleAddNewUser = (data) => {
        if (this.validateInput) {
            this.props.createNewUser(data);
            this.setState({ email: '', firstName: '', lastName: '', password: '', address: '' });
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
                    <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                    <ModalBody>
                        <div className="form-user-container">
                            <div className="form-row ">
                                <div className="form-group col-6">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="@gmail.com"
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
                            className="button btn btn-save"
                            color="primary"
                            onClick={() => this.handleAddNewUser(this.state)}
                        >
                            Save
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
