import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader/HomeHeader';
import { getNewsServices } from '../../../services/patientServices';
import { BsLightbulbFill } from 'react-icons/bs';
import Footer from '../../HomePage/Sections/Footer';
import moment from 'moment';

import './DetailNews.scss';

class DetailNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: {},
        };
    }
    async componentDidMount() {
        let { match } = this.props;
        if (match && match.params && match.params.id) {
            let newsId = match.params.id;
            let response = await getNewsServices(newsId);
            if (response && response.errorCode === 0) {
                this.setState({
                    newsData: response.data,
                });
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
        }
    }

    render() {
        let { languageRedux, modal } = this.props;
        let { newsData } = this.state;
        return (
            <div className="detail-clinic-wrapper">
                <HomeHeader />
                <div className="handbook-container coverArea">
                    <div className="handbook-wrapper">
                        <h1 className="handbook-title">{newsData?.title}</h1>
                        <div className="handbook-detail-info">
                            <p>Nhóm tác giả:{newsData?.authors}</p>
                            <p>Người kiểm duyệt:{newsData?.censor}</p>
                            <p>Cố vấn y khoa:{newsData?.adviser}</p>
                            <p>
                                Xuất bản: {moment(newsData?.createdAt).format('LL')}, Cập nhật lần cuối:
                                {moment(newsData?.updatedAt).format('LL')}
                            </p>
                        </div>
                        <h2 className="news-topic">{newsData?.topic}</h2>

                        <div className="intro-bookingCare ">
                            <div className="icon">
                                <BsLightbulbFill />
                            </div>
                            <h4>
                                BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người
                                dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và
                                hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                            </h4>
                        </div>
                        <div className="image-handbook">
                            <img src={newsData?.image} alt="img"></img>
                        </div>
                        <div className="detail-clinic" dangerouslySetInnerHTML={{ __html: newsData.contentHtml }}></div>
                    </div>
                </div>
                <Footer />
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

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailNews);
