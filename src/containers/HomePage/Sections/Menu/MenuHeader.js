import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Menu.scss';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}
    //render các item MenuItem:
    render() {
        const { title, onBack, iconBack } = this.props;

        return (
            <div className="header-menu" onClick={() => onBack()}>
                <span className="icon_back">{iconBack}</span>
                <span>{title}</span>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
