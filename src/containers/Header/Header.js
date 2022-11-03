import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../store/actions';
import { LANGUAGES, TYPE_USER } from '../../utils';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { userImage } from '../../assets';
import { getCookies } from '../../cookies';

import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            roleId: '',
        };
    }

    componentDidMount() {
        let menuUser = [];
        if (this.props.roleId === TYPE_USER.ADMIN) {
            menuUser = adminMenu;
        } else if (this.props.roleId === TYPE_USER.DOCTOR) {
            menuUser = doctorMenu;
        } else {
            menuUser = [];
        }
        this.setState({ menu: menuUser });
    }

    handleChangeLanguage = (languageInput) => {
        if (languageInput === 'VN') {
            this.props.changeLanguageRedux(LANGUAGES.EN);
            return;
        }
        if (languageInput === 'EN') {
            this.props.changeLanguageRedux(LANGUAGES.VI);
            return;
        }
        return;
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        let user = getCookies.getToken();

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menu} />
                </div>
                {/* box user */}
                <div className="box-user">
                    <div className="user">
                        <span className="avatar">
                            <img src={userImage} alt="avatar" />
                        </span>
                        <span className="name-user">
                            {user && user.lastName ? user.firstName + ' ' + user.lastName : ''}
                        </span>
                    </div>
                    <span className="languages" onClick={(e) => this.handleChangeLanguage(e.target.innerText)}>
                        <FormattedMessage id="language" />
                    </span>
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo,
        roleId: state.user.roleId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
