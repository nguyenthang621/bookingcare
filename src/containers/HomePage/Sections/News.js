import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getNewsServices } from '../../../services/patientServices';
import { withRouter } from 'react-router';

import './News.scss';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: [],
        };
    }
    async componentDidMount() {
        let listNews = await getNewsServices();
        if (listNews && listNews.errorCode === 0) {
            this.setState({
                listNews: listNews.data,
            });
        }
    }
    handleClickNews = (id) => {
        this.props.history.push(`/detail-news/${id}`);
    };
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
        let { listNews } = this.state;
        return (
            <div className="news-container">
                <div className="w60">
                    <div className="news-content">
                        <Slider {...settings}>
                            {listNews &&
                                listNews.length > 0 &&
                                listNews.map((item) => {
                                    return (
                                        <div
                                            className="item-slide"
                                            key={item.id}
                                            onClick={() => this.handleClickNews(item.id)}
                                        >
                                            {/* <Link to={`/detail-news/${item.id}`}> */}
                                            <div className="item">
                                                <div className="topic">{item?.type}</div>
                                                <div
                                                    className="img-news"
                                                    style={{ backgroundImage: `url(${item?.image})` }}
                                                ></div>
                                                <div className="news-brief">
                                                    <h3 className="news-title">{item?.title}</h3>
                                                    <div
                                                        className="highlight-content"
                                                        dangerouslySetInnerHTML={{ __html: item?.focus }}
                                                    ></div>

                                                    <div className="detail">
                                                        <span>Xem chi tiết</span>{' '}
                                                        <FaAngleRight className="iconDetail" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* </Link> */}
                                        </div>
                                    );
                                })}
                        </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
