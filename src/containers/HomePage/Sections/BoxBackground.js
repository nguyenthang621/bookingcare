import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BoxBackground.scss';
import { IoSearch, IoClose } from 'react-icons/io5';

const options = [
    {
        link: 'https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png',
        // link:imagesOption,
        text: <FormattedMessage id="options.specialist_examination" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png',
        text: <FormattedMessage id="options.Remote_medical_examination" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png',
        text: <FormattedMessage id="options.Physical_exam" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png',
        text: <FormattedMessage id="options.Testing_Service" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png',
        text: <FormattedMessage id="options.Mental_health" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png',
        text: <FormattedMessage id="options.Dental_examination" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg',
        text: <FormattedMessage id="options.Surgery_pack" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png',
        text: <FormattedMessage id="options.Home_check-up" />,
    },
    {
        link: 'https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg',
        text: <FormattedMessage id="options.Corporate_health" />,
    },
];

class BoxBackground extends Component {
    render() {
        return (
            <div className="box-background">
                <div className="content">
                    <div className="title-header">
                        <h1>
                            {' '}
                            <FormattedMessage id="banner.title" />
                            <br />
                            <b>
                                <FormattedMessage id="banner.slogan" />
                            </b>
                        </h1>
                    </div>
                    <div className="search">
                        <span className="icon-search">
                            <IoSearch />
                        </span>
                        <input type="text" className="input-search" placeholder="Tìm bệnh viện" />
                        <IoClose className="btn-clear" />
                    </div>
                    <div className="options">
                        {options.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    <div className="icon-item">
                                        <img src={item.link} alt="img icon" />
                                    </div>
                                    <div className="text-item">{item.text}</div>
                                </div>
                            );
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(BoxBackground);
