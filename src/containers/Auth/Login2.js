// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { push } from 'connected-react-router';

// import * as actions from '../../store/actions';
// import './Login2.scss';
// // import { FormattedMessage } from 'react-intl';
// import { handleLoginApi, registerServices } from '../../services/userServices';
// import Cookies from 'universal-cookie';
// import { classCookies } from '../../cookies';
// import { classStorage } from '../../storage';
// import { withRouter } from 'react-router';

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             confirmPassword: '',
//             message: '',
//             isShowMessage: false,
//             isRegister: false,
//             isFocusPassword: false,
//             x: 0,
//             y: 0,
//         };
//     }
//     componentDidMount() {
//         if (!this.props.isLoggedIn) {
//             window.addEventListener('mousemove', (event) => {
//                 const { innerWidth: width, innerHeight: height } = window;
//                 var x = (15 * event.pageX) / width;
//                 var y = (15 * event.pageY) / height;
//                 this.setState({
//                     x: x,
//                     y: y,
//                 });
//             });
//         }
//     }

//     handleChange = (e, name) => {
//         this.setState({ [name]: e.target.value, isShowMessage: false });
//     };
//     handleLogin = async () => {
//         this.setState({ message: '' });
//         try {
//             let dataResponse = await handleLoginApi(this.state.email, this.state.password);
//             if (dataResponse && dataResponse.errorCode === 1 && dataResponse.message) {
//                 this.setState({ message: dataResponse.message, isShowMessage: true });
//             }
//             if (dataResponse && dataResponse.errorCode === 0) {
//                 //login success
//                 const cookies = new Cookies();
//                 cookies.set('accessToken', dataResponse.accessToken, { path: '/' });
//                 let userInfor = classCookies.getDataAccessToken();
//                 await this.props.userLoginSuccess(userInfor, userInfor.roleId);
//                 classStorage.setItemStorage('refreshToken', classCookies.getRefreshToken('refreshToken'));
//                 if (userInfor.roleId === 'R3') {
//                     // classStorage.setItemStorage('email', this.state.email);
//                     this.props.history.push(`/home`);
//                 } else if (userInfor.roleId === 'R1') {
//                     this.props.history.push(`/system/welcome`);
//                 } else if (userInfor.roleId === 'R2') {
//                     this.props.history.push(`/doctor/manage-patient-appointment`);
//                 }
//             }
//         } catch (error) {
//             if (error.response && error?.response?.data) {
//                 this.setState({ message: error.response.message, isShowMessage: true });
//             }
//         }
//     };

//     handleRegister = async () => {
//         this.setState({ message: '' });
//         let { email, password, confirmPassword } = this.state;
//         try {
//             let dataResponse = await registerServices({ email, password, confirmPassword });
//             if (dataResponse && dataResponse.errorCode === 1 && dataResponse.message) {
//                 this.setState({ message: dataResponse.message, isShowMessage: true });
//             }
//             if (dataResponse && dataResponse.errorCode === 0) {
//                 //login success
//                 const cookies = new Cookies();
//                 cookies.set('accessToken', dataResponse.accessToken, { path: '/' });
//                 classStorage.setItemStorage('refreshToken', classCookies.getRefreshToken('refreshToken'));
//                 this.props.history.push(`/home`);
//             }
//         } catch (error) {
//             if (error.response && error?.response?.data) {
//                 this.setState({ message: error.response.message });
//             }
//         }
//     };

//     handleFocusPassword = (isFocus) => {
//         this.setState({
//             isFocusPassword: isFocus,
//         });
//     };

//     handleClickSignUp = (isClickLogin) => {
//         this.setState({
//             isRegister: isClickLogin,
//         });
//     };

//     render() {
//         let { isRegister, isFocusPassword, isShowMessage, message, x, y } = this.state;
//         let ShowMessage = isShowMessage ? 'wrong-entry' : '';
//         let styleEye = {
//             width: x,
//             height: y,
//         };
//         return (
//             <div className="login-background">
//                 <div className="panda">
//                     <div className="ear"></div>
//                     <div className="face">
//                         <div className="eye-shade"></div>
//                         <div className="eye-white">
//                             <div className="eye-ball" style={styleEye}></div>
//                         </div>
//                         <div className="eye-shade rgt"></div>
//                         <div className="eye-white rgt">
//                             <div className="eye-ball" style={styleEye}></div>
//                         </div>
//                         <div className="nose"></div>
//                         <div className="mouth"></div>
//                     </div>
//                     <div className="body"> </div>
//                     <div className="foot">
//                         <div className="finger"></div>
//                     </div>
//                     <div className="foot rgt">
//                         <div className="finger"></div>
//                     </div>
//                 </div>
//                 <div className={isFocusPassword ? `up form-Input ${ShowMessage}` : `form-Input ${ShowMessage}`}>
//                     <div className="hand"></div>
//                     <div className="hand rgt"></div>
//                     <h1> {isRegister ? 'Register' : 'Login'}</h1>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={this.state.email}
//                             required="required"
//                             onChange={(e) => this.handleChange(e, 'email')}
//                         />
//                         <label className="form-label">Email </label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             id="password"
//                             type="password"
//                             required="required"
//                             className="form-control"
//                             value={this.state.password}
//                             onFocus={() => this.handleFocusPassword(true)}
//                             onBlur={() => this.handleFocusPassword(false)}
//                             onChange={(e) => this.handleChange(e, 'password')}
//                         />
//                         <label className="form-label">Password</label>
//                     </div>
//                     <div className="form-group">
//                         {isRegister && (
//                             <input
//                                 id="password"
//                                 type="password"
//                                 required="required"
//                                 className="form-control"
//                                 value={this.state.confirmPassword}
//                                 onFocus={() => this.handleFocusPassword(true)}
//                                 onBlur={() => this.handleFocusPassword(false)}
//                                 onChange={(e) => this.handleChange(e, 'confirmPassword')}
//                             />
//                         )}
//                         {isRegister && <label className="form-label">Confirm password</label>}
//                         <p className="alert">{message}</p>

//                         {isRegister ? (
//                             <button className="btn btn-Register" onClick={() => this.handleRegister()}>
//                                 Register{' '}
//                             </button>
//                         ) : (
//                             <button className="btn btn-Login" onClick={() => this.handleLogin()}>
//                                 Login{' '}
//                             </button>
//                         )}
//                         <div className="btn-change-login">
//                             {isRegister ? (
//                                 <p className="text-login" onClick={() => this.handleClickSignUp(false)}>
//                                     Login
//                                 </p>
//                             ) : (
//                                 <p className="text-login" onClick={() => this.handleClickSignUp(true)}>
//                                     Not a member? <span className="btn-signup">Signup</span>
//                                 </p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         language: state.app.language,
//         isLoggedIn: state.user.isLoggedIn,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         navigate: (path) => dispatch(push(path)),
//         userLoginSuccess: (userInfo, roleId) => dispatch(actions.userLoginSuccess(userInfo, roleId)),
//     };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
