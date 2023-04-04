import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../store/actions';
import { LANGUAGES, TYPE_USER } from '../../utils';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { userImage } from '../../assets';
import { classCookies } from '../../cookies';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';

import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            roleId: '',
            user: {},
            queueNews: '',
            queueHandbook: '',
        };
    }

    async componentDidMount() {
        let menuUser = [];
        let user = classCookies.getDataAccessToken();
        await this.props.checkQueueNewsRedux();
        await this.props.checkQueueHandbookRedux();

        if (this.props.roleId === TYPE_USER.ADMIN) {
            menuUser = adminMenu;
        } else if (this.props.roleId === TYPE_USER.DOCTOR) {
            menuUser = doctorMenu;
        } else {
            menuUser = [];
        }
        this.setState({ menu: menuUser, user: user });
    }
    async componentDidUpdate(prevProps) {}

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
        const { processLogout } = this.props;
        const { user } = this.state;

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
                    <Link to="/home">
                        <div className="btn-to-home" title="Trang chủ">
                            <AiFillHome className="icon" />
                        </div>
                    </Link>
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
        language: state.app.language,
        userInfo: state.user.userInfo,
        roleId: state.user.roleId,
        queueNews: state.user.queueNews,
        queueHandbook: state.user.queueHandbook,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        checkQueueNewsRedux: () => dispatch(actions.checkQueueNewsRedux()),
        checkQueueHandbookRedux: () => dispatch(actions.checkQueueHandbookRedux()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
