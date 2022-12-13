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
import ListSpecialty from '../Patient/Specialty/ListSpecialty';
import ListClinic from '../Patient/Clinic/ListClinic';
import ListDoctor from '../Patient/Doctor/ListDoctor';
import ListHandbook from '../Patient/Handbook/ListHandbook';

import { getAllClinicServices, getHandbookServices, getNewsServices } from '../../services/patientServices';
import { nhakhoa, clinic, doctor, handbook } from '../../assets';
import _ from 'lodash';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalSpecialty: false,
            modalClinic: false,
            modalDoctor: false,
            modalHandbook: false,
            modalHealth: false,
        };
    }
    async componentDidMount() {
        await this.props.getAllSpecialtyRedux();
        await this.props.getAllClinicRedux('true');
        await this.props.getHandbookRedux();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.listDataSpecialtyRedux !== this.props.listDataSpecialtyRedux) {
            this.setState({
                listSpecialty: this.props.listDataSpecialtyRedux,
            });
        }
    }
    toggleModel = (modal) => {
        this.setState({
            [modal]: !this.state[modal],
        });
    };
    render() {
        let { modalSpecialty, modalClinic, modalDoctor, modalHandbook } = this.state;
        let { listDataClinicRedux, listDataSpecialtyRedux, listDataHandbookRedux } = this.props;

        return (
            <div className="home-container">
                <HomeHeader modalSpecialty={modalSpecialty} toggleModel={this.toggleModel} />
                {modalSpecialty ? <ListSpecialty modalSpecialty={modalSpecialty} toggleModel={this.toggleModel} /> : ''}
                {modalClinic ? <ListClinic modalClinic={modalClinic} toggleModel={this.toggleModel} /> : ''}
                {modalDoctor ? <ListDoctor modalDoctor={modalDoctor} toggleModel={this.toggleModel} /> : ''}
                {modalHandbook ? <ListHandbook modalHandbook={modalHandbook} toggleModel={this.toggleModel} /> : ''}
                <BoxBackground />
                <News />
                <Section
                    type="sec"
                    listSpecialty={listDataSpecialtyRedux}
                    typeSec={'specialtyType'}
                    background="background"
                    title="Chuyên khoa phổ biến"
                    button="xem thêm"
                    modal="modalSpecialty"
                    toggleModel={this.toggleModel}
                    slideShow={4}
                />
                <Section
                    type="sec"
                    typeSec="clinics"
                    listClinic={listDataClinicRedux}
                    title="Cơ sở y tế nổi bật"
                    button="tìm kiếm"
                    modal="modalClinic"
                    toggleModel={this.toggleModel}
                    slideShow={4}
                />
                <TopDoctor type="doctor" slideShow={4} modal="modalDoctor" toggleModel={this.toggleModel} />
                <Section
                    background="background"
                    type="handbook"
                    typeSec="handbook"
                    listHandbook={listDataHandbookRedux}
                    title="Cẩm nang"
                    button="tất cả bài viết"
                    modal="modalHandbook"
                    toggleModel={this.toggleModel}
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
        listDataClinicRedux: state.patient.listDataClinic,
        listDataHandbookRedux: state.patient.listDataHandbook,
        topDoctorsRedux: state.doctor.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialtyRedux: () => dispatch(actions.getAllSpecialty()),
        getHandbookRedux: () => dispatch(actions.getHandbookRedux()),
        getAllClinicRedux: (isGetImage) => dispatch(actions.getAllClinicRedux(isGetImage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
