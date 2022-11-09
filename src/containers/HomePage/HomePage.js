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

import { getAllClinicServices } from '../../services/patientServices';
import { nhakhoa, clinic, doctor, handbook } from '../../assets';
import _ from 'lodash';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],
            listClinic: [],
        };
    }
    async componentDidMount() {
        await this.props.getAllSpecialtyRedux();
        let clinics = await getAllClinicServices('true');

        if (clinics && clinics.errorCode === 0) {
            this.setState({
                listClinic: clinics.data,
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.listDataSpecialtyRedux !== this.props.listDataSpecialtyRedux) {
            this.setState({
                listSpecialty: this.props.listDataSpecialtyRedux,
            });
        }
    }
    render() {
        let { listSpecialty, listClinic } = this.state;

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
                    title="Chuyên khoa phổ biến"
                    button="xem thêm"
                    slideShow={4}
                />
                <Section
                    type="sec"
                    typeSec="clinics"
                    listClinic={listClinic}
                    title="Cơ sở y tế nổi bật"
                    button="tìm kiếm"
                    slideShow={4}
                />
                <TopDoctor type="doctor" slideShow={4} />
                <Section
                    background="background"
                    type="handbook"
                    image={handbook}
                    title="Cẩm nang"
                    button="tất cả bài viết"
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
