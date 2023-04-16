import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import './Login.scss';
import './Login2.scss';
import { handleLoginApi, registerServices } from '../../services/userServices';
import Cookies from 'universal-cookie';
import { classCookies } from '../../cookies';
import { classStorage } from '../../storage';
import { withRouter } from 'react-router';
import { validateEmail, validatePhonenumber } from '../../utils/validate';
import { KeyCodeUtils } from '../../utils';
import Loading from '../../components/Loading';
import jwt_decode from 'jwt-decode';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',

            message: '',
            isRegister: false,
            isShowMessage: false,
            isShowLoading: false,
        };
    }
    componentDidMount() {}

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            this.handleLogin();
        }
    };

    handleChange = (e, name) => {
        this.setState({ [name]: e.target.value, message: '' });
    };

    handleLogin = async () => {
        this.setState({ message: '', isShowLoading: true });
        try {
            let dataResponse = await handleLoginApi(this.state.email, this.state.password);

            if (dataResponse && dataResponse.errorCode === 1 && dataResponse.message) {
                this.setState({ message: dataResponse.message, isShowMessage: true });
            }
            if (dataResponse && dataResponse.errorCode === 0) {
                //login success
                classCookies.setToken('accessToken', dataResponse.accessToken);
                classCookies.setToken('refreshToken', dataResponse.refreshToken);
                let userInfor = jwt_decode(dataResponse.accessToken);
                classStorage.setItemStorage('refreshToken', dataResponse.refreshToken);

                await this.props.userLoginSuccess(userInfor, userInfor.roleId);
                if (userInfor.roleId === 'R3') {
                    // classStorage.setItemStorage('email', this.state.email);
                    this.props.history.push(`/`);
                } else if (userInfor.roleId === 'R1') {
                    this.props.history.push(`/system/welcome`);
                } else if (userInfor.roleId === 'R2') {
                    this.props.history.push(`/doctor/manage-patient-appointment`);
                }
                this.setState({
                    isShowLoading: false,
                });
            }
        } catch (error) {
            if (error.response && error?.response?.data) {
                this.setState({ message: error.response.message, isShowMessage: true, isShowLoading: false });
            }
        }
    };
    handleRegister = async () => {
        this.setState({ message: '', isShowLoading: true });
        let { email, password, confirmPassword, firstName, lastName, phoneNumber } = this.state;

        if (!validateEmail(email)) {
            this.setState({ message: 'Email không hợp lệ.', isShowMessage: true });
            return;
        } else {
            try {
                if (phoneNumber) {
                    if (!validatePhonenumber(phoneNumber)) {
                        this.setState({ message: 'Số điện thoại không hợp lệ.', isShowMessage: true });
                        return;
                    }
                }
                let dataResponse = await registerServices({
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    password,
                    confirmPassword,
                });
                if (dataResponse && dataResponse.errorCode === 1 && dataResponse.message) {
                    this.setState({ message: dataResponse.message, isShowMessage: true, isShowLoading: false });
                }
                if (dataResponse && dataResponse.errorCode === 0) {
                    //login success
                    const cookies = new Cookies();
                    cookies.set('accessToken', dataResponse.accessToken, { path: '/' });
                    classStorage.setItemStorage('refreshToken', classCookies.getRefreshToken('refreshToken'));

                    this.handleLogin();
                    this.props.history.push(`/home`);
                    this.setState({
                        isShowLoading: false,
                    });
                }
            } catch (error) {
                if (error.response && error?.response?.data) {
                    this.setState({ message: error.response.message, isShowMessage: true, isShowLoading: false });
                }
            }
        }
    };

    handleClickSubmit = () => {
        let { isRegister } = this.state;
        if (isRegister) {
            this.handleRegister();
        } else {
            this.handleLogin();
        }
    };

    handleClickSignUp = () => {
        this.setState({
            isRegister: !this.state.isRegister,
            isShowMessage: false,
            message: '',
        });
    };

    render() {
        let { isRegister, isShowLoading } = this.state;
        return (
            <div className="login-background ">
                <div className="login-container position-loading">
                    {isShowLoading && <Loading />}
                    <div className="login-content">
                        <div className="col-12 text-center">{isRegister ? 'Đăng kí' : 'Đăng nhập'}</div>
                        <div className="login-form">
                            {/* ho va ten khi dang ki */}
                            {isRegister && (
                                <>
                                    <div className="form-row mt-4 col-md-12 ">
                                        <div className="form-group col-md-6 m0">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Họ (*)"
                                                value={this.state.firstName}
                                                onChange={(e) => this.handleChange(e, 'firstName')}
                                            />
                                        </div>
                                        <div className="form-group col-md-6 m0">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tên (*)"
                                                value={this.state.lastName}
                                                onChange={(e) => this.handleChange(e, 'lastName')}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-12 mt-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputEmail4"
                                            placeholder="Số điện thoại (*)"
                                            value={this.state.phoneNumber}
                                            onChange={(e) => this.handleChange(e, 'phoneNumber')}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="form-group col-md-12 mt-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email (*)"
                                    value={this.state.email}
                                    onChange={(e) => this.handleChange(e, 'email')}
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword4"
                                    placeholder="Password (*)"
                                    value={this.state.password}
                                    onChange={(e) => this.handleChange(e, 'password')}
                                />
                            </div>
                        </div>

                        {isRegister && (
                            <div className="form-group col-md-12">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password (*)"
                                    value={this.state.confirmPassword}
                                    onChange={(e) => this.handleChange(e, 'confirmPassword')}
                                />
                            </div>
                        )}
                        <div className="col-12 text-response">{this.state.message}</div>
                        <div className="col-12 btn-container">
                            <button className="btn btn-primary" onClick={() => this.handleClickSubmit()}>
                                {isRegister ? 'Đăng kí' : 'Đăng nhập'}
                            </button>
                        </div>

                        <div className="col-12 register">
                            <span>
                                {!isRegister && 'Not a member? '}
                                <span className="btn-signup" onClick={() => this.handleClickSignUp()}>
                                    {isRegister ? 'Đăng nhập' : 'Đăng kí'}
                                </span>
                            </span>
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
        roleId: state.user.roleId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo, roleId) => dispatch(actions.userLoginSuccess(userInfo, roleId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
