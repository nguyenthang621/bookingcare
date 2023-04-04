import React, { Component } from 'react';
import { connect } from 'react-redux';

import './FooterContent.scss';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

class FooterContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        };
    }

    handelClickMore = () => {
        this.setState({
            isShow: !this.state.isShow,
        });
    };
    render() {
        let { isShow } = this.state;

        return (
            <div className="footer-content-container ">
                <div className="btn-more-content" onClick={this.handelClickMore}>
                    <p>Vai trò của BookingCare</p>
                    <span className="icon-more">{isShow ? <IoCaretUp /> : <IoCaretDown />}</span>
                </div>

                {isShow && (
                    <div className="content-footer">
                        <p>
                            <strong>Giúp bệnh nhân chọn đúng bác sĩ giỏi và đặt lịch nhanh chóng.</strong>
                        </p>
                        <ul>
                            <li>Hệ thống bác sĩ chuyên khoa giỏi, uy tín</li>
                            <li>Thông tin về bác sĩ đã được xác thực rõ ràng, chính xác</li>
                            <li>Sắp xếp khám đúng bác sĩ mà bệnh nhân đã chọn đặt lịch</li>
                            <li>Bảo vệ quyền lợi của bệnh nhân khi đi khám</li>
                            <li>Miễn phí đặt lịch.</li>
                        </ul>
                        <p>
                            <strong>Hỗ trợ trước, trong và sau khi đi khám.</strong>
                        </p>
                        <p>Trước khám</p>
                        <ul>
                            <li>Nhắc lịch khám, dặn dò chuẩn bị trước khám</li>
                            <li>Hướng dẫn đi lại, quy trình làm thủ tục khám</li>
                        </ul>
                        <p>Trong khi khám</p>
                        <ul>
                            <li>Hỗ trợ giải quyết các vướng mắc trong khi khám</li>
                            <li>Hỗ trợ người bệnh những yêu cầu nảy sinh</li>
                        </ul>
                        <p>Sau khi khám</p>
                        <ul>
                            <li>Ghi nhận ý kiến của bệnh nhân sau khám</li>
                            <li>Hỗ trợ giải đáp, làm rõ những vấn đề chuyên môn</li>
                            <li>Bảo vệ quyền lợi của bệnh nhân khi đi khám</li>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterContent);
