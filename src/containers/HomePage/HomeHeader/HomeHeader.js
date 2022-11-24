import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { Link } from 'react-router-dom';

import './HomeHeader.scss';
import { IoMenu } from 'react-icons/io5';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import { BiUserCircle } from 'react-icons/bi';
import Menu from '../Sections/Menu/Menu';
import Tippy from '@tippyjs/react';
import { dataMenuUser } from '../../../dataLocal/dataMenu';

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

    render() {
        let { isLoggedIn } = this.props;

        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="btn-side-bar">
                            <IoMenu />
                        </div>
                        <Link to="/home">
                            <div className="header-logo"></div>
                        </Link>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div className="title-child">
                                <FormattedMessage id="home-header.specialty" />
                            </div>
                            <div className="title-sub">
                                <FormattedMessage id="home-header.searchDoctor" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div className="title-child">
                                <FormattedMessage id="home-header.health-facility" />
                            </div>
                            <div className="title-sub">
                                <FormattedMessage id="home-header.select-room" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div className="title-child">
                                <FormattedMessage id="home-header.doctor" />
                            </div>
                            <div className="title-sub">
                                <FormattedMessage id="home-header.select-doctor" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div className="title-child">
                                <FormattedMessage id="home-header.fee" />
                            </div>
                            <div className="title-sub">
                                <FormattedMessage id="home-header.check-health" />
                            </div>
                        </div>
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
                        {/* <div className="support">
                            <FaQuestionCircle />
                            <span>
                                <FormattedMessage id="home-header.support" />
                            </span>
                        </div> */}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
