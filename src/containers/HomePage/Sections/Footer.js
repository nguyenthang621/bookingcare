import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    IoLocationSharp,
    IoCheckmarkSharp,
    IoPhonePortraitOutline,
    IoLogoFacebook,
    IoLogoYoutube,
} from 'react-icons/io5';
import './Footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentDidUpdate(prevProps) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
        }
    }

    render() {
        return (
            <div className="footer-container">
                <div className="w60">
                    <div className="footer-up">
                        <div className="d-flex flex-column h-100">
                            <footer className="w-100 py-4 flex-shrink-0">
                                <div className="container-footer py-4">
                                    <div className="row gy-4 gx-5">
                                        <div className="infor-footer col-lg-5 col-md-6">
                                            <div
                                                className="image-footer"
                                                style={{
                                                    backgroundImage: `url(https://bookingcare.vn/assets/icon/bookingcare-2020.svg)`,
                                                }}
                                            ></div>
                                            <h2 className="company">Công ty Cổ phần Công nghệ BookingCare</h2>
                                            <div className="address">
                                                <IoLocationSharp /> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                                            </div>
                                            <div className="dk">
                                                <IoCheckmarkSharp /> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày
                                                16/03/2015
                                            </div>
                                            <div className="iso"></div>
                                        </div>

                                        <div className="contact-footer col-lg-4 col-md-6">
                                            <a>
                                                <li>Liên hệ hợp tác</li>
                                            </a>
                                            <a>
                                                <li>Gói chuyển đổi số doanh nghiệp</li>
                                            </a>
                                            <a>
                                                <li>Tuyển dụng</li>
                                            </a>
                                            <a>
                                                <li>Câu hỏi thường gặp</li>
                                            </a>
                                            <a>
                                                <li>Điều khoản sử dụng</li>
                                            </a>
                                            <a>
                                                <li>Chính sách Bảo mật</li>
                                            </a>
                                        </div>

                                        <div className="branch-footer col-lg-3 col-md-6">
                                            <div className="branch">
                                                <h4>Trụ sở tại Hà Nội</h4>
                                                <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                                            </div>
                                            <div className="branch">
                                                <h4>Văn phòng tại TP Hồ Chí Minh</h4>
                                                <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                                            </div>
                                            <div className="branch">
                                                <h4>Hỗ trợ khách hàng</h4>
                                                <p>support@bookingcare.vn (7h - 18h)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="download-app">
                                        {' '}
                                        <IoPhonePortraitOutline />
                                        <p>
                                            Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: Android
                                            iPhone/iPad Khác
                                        </p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>

                <div className="footer-down">
                    <div className="w60">
                        <div className="content-footer">
                            <small>&copy;2022 BookingCare.</small>
                            <span>
                                <IoLogoFacebook className="icon-network facebook" />
                                <IoLogoYoutube className="icon-network youtube" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
