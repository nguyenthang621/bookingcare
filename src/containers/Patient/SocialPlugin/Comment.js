import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        let {} = this.props;
        this.initFacebookSDK();
    }
    componentDidUpdate() {}
    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        let { languageRedux } = this.props;
        let locale = languageRedux === LANGUAGES.VI ? 'vi_VN' : 'en_US';
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.5', // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    render() {
        let { width, dataHref, numPort } = this.props;
        let {} = this.state;

        return (
            <div className="box-comment coverArea">
                <div
                    className="fb-comments"
                    data-href={dataHref}
                    data-width={width ? width : ''}
                    data-numposts={numPort ? numPort : 5}
                ></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        detailDoctorRedux: state.doctor.detailDoctor,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
