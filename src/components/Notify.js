import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Notify.scss';

class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentDidUpdate(prevProps) {
        const { queueNews, queueHandbook } = this.props;
        if (prevProps.queueNews !== queueNews) {
            this.setState({
                re_render: 1,
            });
        }
        if (prevProps.queueHandbook !== queueHandbook) {
            this.setState({
                re_render: 1,
            });
        }
    }

    render() {
        let { queueNum, queueNews, queueHandbook } = this.props;

        return (
            <div className="notify">
                {queueNum === 'queueNews' && +queueNews > 0 && <span className="notify-content">{queueNews}</span>}
                {queueNum === 'queueHandbook' && +queueHandbook > 0 && (
                    <span className="notify-content">{queueHandbook}</span>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        queueNews: state.user.queueNews,
        queueHandbook: state.user.queueHandbook,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
