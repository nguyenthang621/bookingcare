import React, { Component } from 'react';
import { connect } from 'react-redux';

import './About.scss';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`about-container ${this.props.background}`}>
                <div className="w60">
                    <div className="about-content">
                        <div className="about-header">
                            <span className="about-title">{this.props.title}</span>
                        </div>
                        <div className="about-body">
                            <div className="about-video">
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/FyDQljKtWnI"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                ></iframe>
                            </div>
                            <div className="about-list">
                                <img
                                    src="https://github.com/nguyenthang621/public_image_bookingcare/blob/main/Capture.PNG?raw=true"
                                    alt="img"
                                ></img>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
