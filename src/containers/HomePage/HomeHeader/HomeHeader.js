import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { Link } from 'react-router-dom';

import './HomeHeader.scss';

import { IoLogIn } from 'react-icons/io5';
import { BiUserCircle } from 'react-icons/bi';
import Menu from '../Sections/Menu/Menu';
import Tippy from '@tippyjs/react';
import { withRouter } from 'react-router';

import { dataMenuUser, dataHomeHeader } from '../../../dataLocal/dataMenu';

import 'tippy.js/dist/tippy.css'; // optional

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChangeLanguage = (language) => {
        if (language === 'VN') {
            this.props.changeLanguageRedux(LANGUAGES.EN);
            return;
        }
        if (language === 'EN') {
            this.props.changeLanguageRedux(LANGUAGES.VI);
            return;
        }
        return;
    };
    componentDidMount() {}
    executeScroll = () => this.myRef.current.scrollIntoView();
    handleClick = (modal) => {
        this.props.toggleModel(modal);
    };
    render() {
        let { isLoggedIn } = this.props;

        return (
            <div className="home-header-container">
                <div className="home-header-content w80">
                    <div className="left-content">
                        <Link to="/home">
                            <div className="header-logo"></div>
                        </Link>
                    </div>
                    <div className="center-content">
                        {dataHomeHeader.length > 0 &&
                            dataHomeHeader.map((item, index) => {
                                return (
                                    <div
                                        className="child-content"
                                        key={index}
                                        onClick={() => this.handleClick(item.modal)}
                                    >
                                        <div className="title-child">{item.title}</div>
                                        <div className="title-sub">{item.sub}</div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="right-content">
                        {!isLoggedIn && (
                            <Tippy delay={[0, 100]} content="Ngôn ngữ">
                                <div className="language">
                                    <span
                                        onClick={(e) => {
                                            this.handleChangeLanguage(e.target.innerText);
                                        }}
                                    >
                                        <FormattedMessage id="language" />
                                    </span>
                                </div>
                            </Tippy>
                        )}

                        {!isLoggedIn ? (
                            <Link to="/login">
                                <div className="login" text="Login">
                                    <IoLogIn />
                                    <span>
                                        <FormattedMessage id="home-header.login" />
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <Menu items={dataMenuUser}>
                                <div className="btn_user">
                                    <BiUserCircle className="icon_user" />
                                </div>
                            </Menu>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listDataSpecialtyRedux: state.patient.listDataSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
