import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { handleLoginApi } from '../../services/userServices';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            message: '',
        };
    }

    handleChangeUsername = (e) => {
        this.setState({ userName: e.target.value });
    };
    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };
    handleLogin = async () => {
        this.setState({ message: '' });
        try {
            let dataResponse = await handleLoginApi(this.state.userName, this.state.password);
            if (dataResponse && dataResponse.errorCode !== 0) {
                this.setState({ message: dataResponse.message });
            }
            if (dataResponse && dataResponse.errorCode === 0) {
                //login success
                this.props.userLoginSuccess(dataResponse.data);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({ message: error.response.message });
            }
        }
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-center">login</div>
                        <div className="col-12 from-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.userName}
                                onChange={(e) => this.handleChangeUsername(e)}
                            />
                        </div>
                        <div className="col-12 from-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={(e) => this.handleChangePassword(e)}
                            />
                        </div>
                        <div className="col-12 text-response">{this.state.message}</div>
                        <div className="col-12 btn-container">
                            <button className="btn-login" onClick={() => this.handleLogin()}>
                                Login
                            </button>
                        </div>
                        <div className="col-12 title-forgot">
                            <span>Forgot your password?</span>
                        </div>
                        <div className="col-12 login-other">
                            <span>Or sign in with:</span>
                            <div className="icon-login-other">
                                <a href="https://react-icons.github.io/react-icons">
                                    <FaGoogle />
                                </a>
                                <a href="https://react-icons.github.io/react-icons">
                                    <FaFacebookF />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);