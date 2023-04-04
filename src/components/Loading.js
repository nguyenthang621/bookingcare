import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Loading.scss';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentDidUpdate() {}

    render() {
        let {} = this.props;
        let {} = this.state;
        return (
            <div className="bg-loading">
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
