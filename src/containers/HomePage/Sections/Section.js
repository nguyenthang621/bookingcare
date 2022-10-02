import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Section.scss';
import { PrevArrow, NextArrow } from '../../../components/CustomArrow';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: this.props.slideShow,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        return (
            <div className={`section-container ${this.props.background}`}>
                <div className="section-content">
                    <div className="section-header">
                        <span className="section-title">{this.props.title}</span>
                        <button className="more">{this.props.button}</button>
                    </div>
                    <Slider {...settings}>
                        <div className="item-slide hover">
                            <div className={`item-${this.props.type}`}>
                                <div className={`img-${this.props.type}`}>
                                    <img className="img" src={this.props.image} alt="img" />
                                </div>
                                {this.props.type === 'doctor' && <h4 className="position">{this.props.position}</h4>}
                                <p className={`text-${this.props.type}`}>{this.props.text}</p>
                            </div>
                        </div>
                        <div className="item-slide hover">
                            <div className={`item-${this.props.type}`}>
                                <div className={`img-${this.props.type}`}>
                                    <img className="img" src={this.props.image} alt="img" />
                                </div>
                                {this.props.type === 'doctor' && <h4 className="position">{this.props.position}</h4>}
                                <p className={`text-${this.props.type}`}>{this.props.text}</p>
                            </div>
                        </div>
                        <div className="item-slide hover">
                            <div className={`item-${this.props.type}`}>
                                <div className={`img-${this.props.type}`}>
                                    <img className="img" src={this.props.image} alt="img" />
                                </div>
                                {this.props.type === 'doctor' && <h4 className="position">{this.props.position}</h4>}
                                <p className={`text-${this.props.type}`}>{this.props.text}</p>
                            </div>
                        </div>
                        <div className="item-slide hover">
                            <div className={`item-${this.props.type}`}>
                                <div className={`img-${this.props.type}`}>
                                    <img className="img" src={this.props.image} alt="img" />
                                </div>
                                {this.props.type === 'doctor' && <h4 className="position">{this.props.position}</h4>}
                                <p className={`text-${this.props.type}`}>{this.props.text}</p>
                            </div>
                        </div>
                        <div className="item-slide hover">
                            <div className={`item-${this.props.type}`}>
                                <div className={`img-${this.props.type}`}>
                                    <img className="img" src={this.props.image} alt="img" />
                                </div>
                                {this.props.type === 'doctor' && <h4 className="position">{this.props.position}</h4>}
                                <p className={`text-${this.props.type}`}>{this.props.text}</p>
                            </div>
                        </div>
                        <div className="item-slide hover">
                            <div className={`item-${this.props.type}`}>
                                <div className={`img-${this.props.type}`}>
                                    <img className="img" src={this.props.image} alt="img" />
                                </div>
                                {this.props.type === 'doctor' && <h4 className="position">{this.props.position}</h4>}
                                <p className={`text-${this.props.type}`}>{this.props.text}</p>
                            </div>
                        </div>
                        <div className="item-slide hover">
                            <div className={`item-${this.props.type}`}>
                                <div className={`img-${this.props.type}`}>
                                    <img className="img" src={this.props.image} alt="img" />
                                </div>
                                {this.props.type === 'doctor' && <h4 className="position">{this.props.position}</h4>}
                                <p className={`text-${this.props.type}`}>{this.props.text}</p>
                            </div>
                        </div>
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);
