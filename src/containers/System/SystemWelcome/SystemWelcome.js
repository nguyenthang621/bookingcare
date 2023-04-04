import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SystemWelcome.scss';

class SystemWelcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="system-welcome-container">
                <div className="system-welcome-background">
                    <div className="system-welcome-content">
                        <h1 className="title">welcome</h1>
                        <p className="text">Manage bookingcare</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemWelcome);
