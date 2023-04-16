import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxBackground from './Sections/BoxBackground';
import Section from './Sections/Section';
import News from './Sections/News';
import About from './Sections/About';
import TopDoctor from './Sections/TopDoctor';
import * as actions from '../../store/actions';

import ListSpecialty from '../Patient/Specialty/ListSpecialty';
import ListClinic from '../Patient/Clinic/ListClinic';
import ListDoctor from '../Patient/Doctor/ListDoctor';
import ListHandbook from '../Patient/Handbook/ListHandbook';

import { FormattedMessage } from 'react-intl';

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
    async componentDidMount() {}
    componentDidUpdate() {}
    toggleModel = (modal) => {
        this.setState({
            [modal]: !this.state[modal],
        });
    };

    render() {
        let { listDataClinicRedux, listDataSpecialtyRedux, listDataHandbookRedux } = this.props;
        let { modalSpecialty, modalClinic, modalDoctor, modalHandbook } = this.state;

        return (
            <div className="home-container">
                {modalSpecialty && <ListSpecialty modalSpecialty={modalSpecialty} toggleModel={this.toggleModel} />}
                {modalClinic && <ListClinic modalClinic={modalClinic} toggleModel={this.toggleModel} />}
                {modalDoctor && <ListDoctor modalDoctor={modalDoctor} toggleModel={this.toggleModel} />}
                {modalHandbook && <ListHandbook modalHandbook={modalHandbook} toggleModel={this.toggleModel} />}
                <BoxBackground />
                <News />
                <Section
                    type="sec"
                    listSpecialty={listDataSpecialtyRedux}
                    typeSec={'specialtyType'}
                    background="background"
                    title={<FormattedMessage id="homepage.specialty" />}
                    button={<FormattedMessage id="homepage.more" />}
                    modal="modalSpecialty"
                    toggleModel={this.toggleModel}
                    slideShow={4}
                />
                <Section
                    type="sec"
                    typeSec="clinics"
                    listClinic={listDataClinicRedux}
                    title={<FormattedMessage id="homepage.clinic" />}
                    button={<FormattedMessage id="homepage.search" />}
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
                    title={<FormattedMessage id="homepage.handbook" />}
                    button={<FormattedMessage id="homepage.all-handbook" />}
                    modal="modalHandbook"
                    toggleModel={this.toggleModel}
                    slideShow={2}
                />
                <About title={<FormattedMessage id="homepage.about" />} />
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
