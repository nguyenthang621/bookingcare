import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader/HomeHeader';
import BoxBackground from './Sections/BoxBackground';
import Section from './Sections/Section';
import News from './Sections/News';
import About from './Sections/About';
import TopDoctor from './Sections/TopDoctor';
import Footer from './Sections/Footer';
import * as actions from '../../store/actions';

import { getAllSpecialtyServices } from '../../services/patientServices';
import { nhakhoa, clinic, doctor, handbook } from '../../assets';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],
        };
    }
    async componentDidMount() {
        await this.props.getAllSpecialtyRedux();
        // if (specialtyData && specialtyData.errorCode === 0) {
        //     this.setState({
        //         listSpecialty: specialtyData.data,
        //     });
        // }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.listDataSpecialtyRedux !== this.props.listDataSpecialtyRedux) {
            this.setState({
                listSpecialty: this.props.listDataSpecialtyRedux,
            });
        }
    }
    render() {
        let { listSpecialty } = this.state;
        return (
            <div className="home-container">
                <HomeHeader />
                <BoxBackground />
                <News />
                <Section
                    type="sec"
                    listSpecialty={listSpecialty}
                    typeSec={'specialtyType'}
                    background="background"
                    image={nhakhoa}
                    title="Chuyên khoa phổ biến"
                    button="xem thêm"
                    text="Tạo hình hàm mặt"
                    slideShow={4}
                />
                <Section
                    type="sec"
                    image={clinic}
                    title="Cơ sở y tế nổi bật"
                    button="tìm kiếm"
                    text="Phòng khám Vietlife MRI Trần Bình Trọng"
                    slideShow={4}
                />
                <TopDoctor
                    type="doctor"
                    image={doctor}
                    position="Bác sĩ Chuyên khoa II Trần Minh Khuyên"
                    text="Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý"
                    slideShow={4}
                />
                <Section
                    background="background"
                    type="handbook"
                    image={handbook}
                    title="Cẩm nang"
                    button="tất cả bài viết"
                    text="Niềng răng trong suốt Invisalign ở đâu tốt Hà Nội - Review chi tiết"
                    slideShow={2}
                />
                <About title="Truyền thông nói về BookingCares" />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listDataSpecialtyRedux: state.patient.listDataSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialtyRedux: () => dispatch(actions.getAllSpecialty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
