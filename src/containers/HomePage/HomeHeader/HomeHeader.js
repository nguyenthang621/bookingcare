import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

import './HomeHeader.scss';
import { IoMenu } from 'react-icons/io5';
import { FaQuestionCircle } from 'react-icons/fa';

class HomeHeader extends Component {
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

    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="btn-side-bar">
                            <IoMenu />
                        </div>
                        <div className="header-logo"></div>
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
                        <div className="language">
                            <span
                                onClick={(e) => {
                                    this.handleChangeLanguage(e.target.innerText);
                                }}
                            >
                                <FormattedMessage id="language" />
                            </span>
                        </div>
                        <div className="support">
                            <FaQuestionCircle />
                            <span>
                                <FormattedMessage id="home-header.support" />
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.user.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
