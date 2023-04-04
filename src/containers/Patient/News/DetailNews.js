import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { getNewsServices } from '../../../services/patientServices';
import { BsLightbulbFill } from 'react-icons/bs';
import { convertKeyToValue } from '../../../utils';
import { getAllCodeServices } from '../../../services/userServices';

import moment from 'moment';

import './DetailNews.scss';

class DetailNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: {},
            keyForm: [],
        };
    }
    async componentDidMount() {
        let { match } = this.props;

        if (match && match.params && match.params.id) {
            let newsId = match.params.id;
            let response = await getNewsServices(newsId);
            let PositionRes = await getAllCodeServices('position');
            if (response && response.errorCode === 0) {
                this.setState({
                    newsData: response.data,
                    keyForm: PositionRes?.data,
                });
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
        }
    }

    render() {
        let { newsData, keyForm } = this.state;
        let positionSender = '';
        let nameSender = '';
        let advisers = '';
        if (newsData && newsData?.adviserData) {
            positionSender = convertKeyToValue(newsData?.senderDataNews?.position, keyForm);
            nameSender = `${newsData?.senderDataNews?.firstName} ${newsData?.senderDataNews?.lastName}`;
            advisers = newsData?.adviserData
                .map((item) => {
                    let position = convertKeyToValue(item?.position, keyForm) || 'Bác sĩ';
                    return `${position} ${item?.firstName} ${item?.lastName}`;
                })
                .join(';');
        }
        return (
            <div className="detail-clinic-wrapper">
                {/* <HomeHeader /> */}
                <div className="handbook-container coverArea">
                    <div className="handbook-wrapper">
                        <h1 className="handbook-title">{newsData?.title}</h1>
                        <div className="handbook-detail-info">
                            <li>Nhóm tác giả:&nbsp;{newsData?.authors}</li>
                            <li>Người kiểm duyệt:&nbsp;{`${positionSender} ${nameSender}`}</li>
                            <li>Cố vấn y khoa:&nbsp;{advisers}</li>
                            <li>Xuất bản:&nbsp; {moment(newsData?.createdAt).format('LL')},</li>
                            <li>
                                Cập nhật lần cuối:&nbsp;
                                {moment(newsData?.updatedAt).format('LL')}
                            </li>
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
