import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './VerifyBooking.scss';
import { verifyBookingAppointmentServices } from '../../services/patientServices';
import { FaRegCheckCircle, FaExclamationCircle } from 'react-icons/fa';

class VerifyBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
        };
    }
    async componentDidMount() {
        let location = this.props.location;
        if (location && location.search) {
            let urlParams = new URLSearchParams(location.search);
            let uuid = urlParams.get('uuid');
            let doctorId = urlParams.get('doctorId');
            let response = await verifyBookingAppointmentServices({
                uuid,
                doctorId,
            });
            if (response && response.errorCode === 0) {
                this.setState({
                    statusVerify: true,
                });
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
        }
    }

    render() {
        let { statusVerify } = this.state;
        return (
            <div className="verify-wrapper">
                {/* <HomeHeader></HomeHeader> */}
                <div className="verify-container">
                    <div className="verify">
                        <div className="title">
                            {statusVerify ? (
                                <h2>
                                    <FaRegCheckCircle /> <FormattedMessage id="patient.verify.title-verify-success" />
                                </h2>
                            ) : (
                                <h2>
                                    <FaExclamationCircle /> <FormattedMessage id="patient.verify.title-verify-fail" />
                                </h2>
                            )}
                        </div>
                        <a href={process.env.REACT_APP_URL}>
                            <FormattedMessage id="patient.verify.home" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
