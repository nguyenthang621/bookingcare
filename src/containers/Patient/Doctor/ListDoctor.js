import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { BsLightbulbFill } from 'react-icons/bs';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { searchDoctorServices } from '../../../services';
import SearchInput from '../../../components/SearchInput';
import FooterPaging from '../../../components/FooterPaging';
import '../Specialty/ListSpecialty.scss';

class ListDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],

            limit: 5,
            keyword: '',
            totalPage: 1,
            count: 0,
            pageIndex: 1,
            roleId: 'R2',
        };
    }
    async componentDidMount() {
        let { pageIndex, limit, keyword, roleId } = this.state;

        this.handleFilterAndPaging(pageIndex, limit, keyword, roleId);
    }
    componentDidUpdate() {}

    handleFilterAndPaging = async (pageIndex, limit, keyword, roleId) => {
        let response = await searchDoctorServices(pageIndex, limit, keyword, roleId);
        if (response && response.errorCode === 0) {
            this.setState({
                listDoctor: response.data.rows,
                totalPage: response.data.totalPage,
                count: response.data.count,
                pageIndex: pageIndex,
            });
        }
    };

    handleToggleModel = () => {
        this.setState({ isOpenModel: !this.state.isOpenModel });
    };

    handleSearch = async (currentKeyword) => {
        let { limit, pageIndex, roleId } = this.state;
        try {
            let response = await searchDoctorServices(pageIndex, limit, currentKeyword, roleId);
            if (response && response.errorCode === 0) {
                this.setState({
                    listDoctor: response.data.rows,
                    totalPage: response.data.totalPage,
                    count: response.data.count,
                    pageIndex: pageIndex,
                    keyword: currentKeyword,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleChangePage = async (numberPage) => {
        console.log(numberPage);
        let { limit, keyword, pageIndex, totalPage } = this.state;
        if (numberPage === 'next') {
            if (+pageIndex < +totalPage) {
                this.handleFilterAndPaging(pageIndex + 1, limit, keyword);
            }
        } else if (numberPage === 'back') {
            if (+pageIndex > 1) {
                this.handleFilterAndPaging(pageIndex - 1, limit, keyword);
            }
        } else {
            this.handleFilterAndPaging(numberPage, limit, keyword);
        }
    };

    render() {
        let { modalDoctor, languageRedux, listDataSpecialtyRedux } = this.props;
        let { listDoctor, count, totalPage, pageIndex } = this.state;
        return (
            <div className="list-specialty-container">
                <Modal
                    className="modal-booking-container"
                    isOpen={modalDoctor}
                    toggle={() => this.props.toggleModel('modalDoctor')}
                    size="mn"
                    centered={false}
                >
                    <ModalHeader toggle={() => this.props.toggleModel('modalDoctor')}>Danh sách bác sĩ</ModalHeader>
                    <ModalBody>
                        <div className="search-container-list-patient">
                            <SearchInput placeholder="Tìm kiếm..." handleSearch={this.handleSearch} delay={800} />
                        </div>
                        <div className="list-specialty-content">
                            {listDoctor.length > 0 &&
                                listDoctor.map((item) => {
                                    let nameSpecialty = '';
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName} `;
                                    let idSpecialty = item.Doctor_Infor.specialtyId;
                                    if (idSpecialty) {
                                        nameSpecialty = listDataSpecialtyRedux.filter(
                                            (item) => item.id === idSpecialty,
                                        );
                                        nameSpecialty = nameSpecialty[0].name;
                                    }
                                    return (
                                        <Link className="item" to={`/detail-doctor/${item.id}`} key={item.id}>
                                            <div className="item-specialty" key={item.id}>
                                                <div className={modalDoctor ? 'image-doctor' : 'image-specialty'}>
                                                    <img
                                                        src={
                                                            item?.imageURL ||
                                                            'https://firebasestorage.googleapis.com/v0/b/bookingcare-6a74c.appspot.com/o/files%2Fuser%2Fuser_d%C3%A8ault.png?alt=media&token=22bdda3a-856e-416d-bce5-b9e52a6004c7'
                                                        }
                                                        alt="img"
                                                    ></img>
                                                </div>
                                                <div className="name-doctor">
                                                    <h2>{languageRedux === LANGUAGES.VI ? nameVi : nameEn}</h2>
                                                    <p>{nameSpecialty}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                        <FooterPaging
                            titleTotalRecord="Tổng số bác sĩ"
                            TotalPage={totalPage}
                            PageIndex={pageIndex}
                            TotalRecord={count}
                            handleChangePage={this.handleChangePage}
                        />
                    </ModalBody>
                    <ModalFooter>
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
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        listDataSpecialtyRedux: state.patient.listDataSpecialty,
        topDoctorsRedux: state.doctor.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
