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
                <div className="about-content">
                    <div className="about-header">
                        <span className="about-title">{this.props.title}</span>
                    </div>
                    <div className="about-body">
                        <div className="about-video">
                            <iframe
                                src="https://www.youtube.com/embed/uLcyVYZUmaY"
                                title="CHỈ CÒN NHỮNG MÙA NHỚ - ÔN VĨNH QUANG (cover)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="about-list">About us</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
