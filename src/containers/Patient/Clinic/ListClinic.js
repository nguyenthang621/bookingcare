import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsLightbulbFill } from 'react-icons/bs';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { filterAndPagingClinic } from '../../../services/userServices';
import SearchInput from '../../../components/SearchInput';
import FooterPaging from '../../../components/FooterPaging';

import '../Specialty/ListSpecialty.scss';

class ListClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: [],

            limit: 5,
            keyword: '',
            totalPage: 1,
            count: 0,
            pageIndex: 1,

            isShowModalConfirm: false,
            currentClinicId: '',
        };
    }
    async componentDidMount() {
        let { pageIndex, limit, keyword } = this.state;
        this.handleFilterAndPaging(pageIndex, limit, keyword);
    }
    componentDidUpdate() {}

    handleFilterAndPaging = async (pageIndex, limit, keyword) => {
        let response = await filterAndPagingClinic(pageIndex, limit, keyword);
        if (response && response.errorCode === 0) {
            this.setState({
                listClinic: response.data.rows,
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
        let { limit, pageIndex } = this.state;
        try {
            let response = await filterAndPagingClinic(pageIndex, limit, currentKeyword);
            if (response && response.errorCode === 0) {
                this.setState({
                    listClinic: response.data.rows,
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
        let { modalClinic } = this.props;
        let { listClinic, count, totalPage, pageIndex } = this.state;

        return (
            <div className="list-specialty-container">
                <Modal
                    className="modal-booking-container"
                    isOpen={modalClinic}
                    toggle={() => this.props.toggleModel('modalClinic')}
                    size="nm"
                    centered={false}
                >
                    <ModalHeader toggle={() => this.props.toggleModel('modalClinic')}>Danh sách cơ sở y tế</ModalHeader>
                    <ModalBody>
                        <div className="list-specialty-content">
                            <div className="search-container-list-patient">
                                <SearchInput placeholder="Tìm kiếm..." handleSearch={this.handleSearch} delay={800} />
                            </div>
                            {listClinic.length > 0 &&
                                listClinic.map((item) => {
                                    return (
                                        <Link className="item" to={`/detail-clinic/${item.id}`} key={item.id}>
                                            <div className="item-specialty" key={item.id}>
                                                <div className={'image-clinic'}>
                                                    <img className="img-clinic" src={item.imageLogo} alt="img"></img>
                                                </div>
                                                <div className="name-specialty">{item.nameClinic}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                        <FooterPaging
                            titleTotalRecord="Tổng cơ sở"
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
        listDataClinicRedux: state.patient.listDataClinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
