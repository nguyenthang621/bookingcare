import React from 'react';
import HomeHeader from '../containers/HomePage/HomeHeader/HomeHeader';
import Footer from '../containers/HomePage/Sections/Footer';
import ListSpecialty from '../containers/Patient/Specialty/ListSpecialty';
import ListClinic from '../containers/Patient/Clinic/ListClinic';
import ListDoctor from '../containers/Patient/Doctor/ListDoctor';
import ListHandbook from '../containers/Patient/Handbook/ListHandbook';

const withLayoutHome = (WrappedComponent) => {
    return class extends React.Component {
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
        toggleModel = (modal) => {
            this.setState({
                [modal]: !this.state[modal],
            });
        };
        render() {
            let { modalSpecialty, modalClinic, modalDoctor, modalHandbook } = this.state;

            return (
                <>
                    {modalSpecialty && <ListSpecialty modalSpecialty={modalSpecialty} toggleModel={this.toggleModel} />}
                    {modalClinic && <ListClinic modalClinic={modalClinic} toggleModel={this.toggleModel} />}
                    {modalDoctor && <ListDoctor modalDoctor={modalDoctor} toggleModel={this.toggleModel} />}
                    {modalHandbook && <ListHandbook modalHandbook={modalHandbook} toggleModel={this.toggleModel} />}
                    <div>
                        <HomeHeader toggleModel={this.toggleModel} />
                        <WrappedComponent {...this.props} />
                        <Footer />
                    </div>
                </>
            );
        }
    };
};

export default withLayoutHome;
