import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './News.scss';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

class News extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <FaAngleRight />,
            prevArrow: <FaAngleLeft />,
            autoplay: true,
            arrows: false,
            autoplaySpeed: 2000,
            pauseOnHover: true,
        };
        return (
            <div className="news-container">
                <div className="news-content">
                    <Slider {...settings}>
                        <div className="item-slide">
                            <div className="item">
                                <div className="topic">Random{Math.round(Math.random() * 11)}</div>
                                <div className="img-news"></div>
                                <div className="news-brief">
                                    <h3 className="news-title">Kit Test COVID bằng nước bọt</h3>
                                    <ul className="highlight-content">
                                        <li>Kit Test nhanh bằng nước bọt</li>
                                        <li>Đơn giản, tiện lợi, chính xác</li>
                                        <li>Bộ Y tế Việt Nam cấp chứng nhận</li>
                                    </ul>
                                    <div className="detail">
                                        <span>Xem chi tiết</span> <FaAngleRight className="iconDetail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide">
                            <div className="item">
                                <div className="topic">Random{Math.round(Math.random() * 11)}</div>
                                <div className="img-news"></div>
                                <div className="news-brief">
                                    <h3 className="news-title">Kit Test COVID bằng nước bọt</h3>
                                    <ul className="highlight-content">
                                        <li>Kit Test nhanh bằng nước bọt</li>
                                        <li>Đơn giản, tiện lợi, chính xác</li>
                                        <li>Bộ Y tế Việt Nam cấp chứng nhận</li>
                                    </ul>
                                    <div className="detail">
                                        <span>Xem chi tiết</span> <FaAngleRight className="iconDetail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide">
                            <div className="item">
                                <div className="topic">Random{Math.round(Math.random() * 11)}</div>
                                <div className="img-news"></div>
                                <div className="news-brief">
                                    <h3 className="news-title">Kit Test COVID bằng nước bọt</h3>
                                    <ul className="highlight-content">
                                        <li>Kit Test nhanh bằng nước bọt</li>
                                        <li>Đơn giản, tiện lợi, chính xác</li>
                                        <li>Bộ Y tế Việt Nam cấp chứng nhận</li>
                                    </ul>
                                    <div className="detail">
                                        <span>Xem chi tiết</span> <FaAngleRight className="iconDetail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide">
                            <div className="item">
                                <div className="topic">Random{Math.round(Math.random() * 11)}</div>
                                <div className="img-news"></div>
                                <div className="news-brief">
                                    <h3 className="news-title">Kit Test COVID bằng nước bọt</h3>
                                    <ul className="highlight-content">
                                        <li>Kit Test nhanh bằng nước bọt</li>
                                        <li>Đơn giản, tiện lợi, chính xác</li>
                                        <li>Bộ Y tế Việt Nam cấp chứng nhận</li>
                                    </ul>
                                    <div className="detail">
                                        <span>Xem chi tiết</span> <FaAngleRight className="iconDetail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide">
                            <div className="item">
                                <div className="topic">Random{Math.round(Math.random() * 11)}</div>
                                <div className="img-news"></div>
                                <div className="news-brief">
                                    <h3 className="news-title">Kit Test COVID bằng nước bọt</h3>
                                    <ul className="highlight-content">
                                        <li>Kit Test nhanh bằng nước bọt</li>
                                        <li>Đơn giản, tiện lợi, chính xác</li>
                                        <li>Bộ Y tế Việt Nam cấp chứng nhận</li>
                                    </ul>
                                    <div className="detail">
                                        <span>Xem chi tiết</span> <FaAngleRight className="iconDetail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide">
                            <div className="item">
                                <div className="topic">Random{Math.round(Math.random() * 11)}</div>
                                <div className="img-news"></div>
                                <div className="news-brief">
                                    <h3 className="news-title">Kit Test COVID bằng nước bọt</h3>
                                    <ul className="highlight-content">
                                        <li>Kit Test nhanh bằng nước bọt</li>
                                        <li>Đơn giản, tiện lợi, chính xác</li>
                                        <li>Bộ Y tế Việt Nam cấp chứng nhận</li>
                                    </ul>
                                    <div className="detail">
                                        <span>Xem chi tiết</span> <FaAngleRight className="iconDetail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide">
                            <div className="item">
                                <div className="topic">Random{Math.round(Math.random() * 11)}</div>
                                <div className="img-news"></div>
                                <div className="news-brief">
                                    <h3 className="news-title">Kit Test COVID bằng nước bọt</h3>
                                    <ul className="highlight-content">
                                        <li>Kit Test nhanh bằng nước bọt</li>
                                        <li>Đơn giản, tiện lợi, chính xác</li>
                                        <li>Bộ Y tế Việt Nam cấp chứng nhận</li>
                                    </ul>
                                    <div className="detail">
                                        <span>Xem chi tiết</span> <FaAngleRight className="iconDetail" />
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
