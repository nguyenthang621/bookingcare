import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

import './Section.scss';
import { PrevArrow, NextArrow } from '../../../components/CustomArrow';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClickSpecialty = (item) => {
        console.log('item: ', item);
    };

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
        let { listSpecialty, typeSec, type, background, title, button } = this.props;
        return (
            <div className={`section-container ${background}`}>
                <div className="section-content">
                    <div className="section-header">
                        <span className="section-title">{title}</span>
                        <button className="more">{button}</button>
                    </div>
                    <Slider {...settings}>
                        {typeSec === 'specialtyType' &&
                            listSpecialty.map((item) => {
                                return (
                                    <Link to={`/detail-specialty/${item.id}`} key={item.id}>
                                        <div
                                            className="item-slide hover"
                                            key={item.id}
                                            // onClick={() => this.handleClickSpecialty(item)}
                                        >
                                            <div className={`item-${type}`}>
                                                <div className={`img-${type}`}>
                                                    <img className="img" src={item.image} alt="img" />
                                                </div>

                                                <p className={`text-${type}`}>{item.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
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
