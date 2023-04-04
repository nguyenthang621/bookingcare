import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsLightbulbFill } from 'react-icons/bs';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { filterAndPagingSpecialty } from '../../../services/userServices';
import SearchInput from '../../../components/SearchInput';
import FooterPaging from '../../../components/FooterPaging';

import './ListSpecialty.scss';

class ListSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],

            count: 1,
            totalPage: 1,

            pageIndex: 1,
            limit: 5,
            keyword: '',
        };
    }
    async componentDidMount() {
        let { pageIndex, limit, keyword } = this.state;
        this.handleFilterAndPaging(pageIndex, limit, keyword);
    }
    componentDidUpdate() {}
    handleFilterAndPaging = async (pageIndex, limit, keyword) => {
        let response = await filterAndPagingSpecialty(pageIndex, limit, keyword);
        if (response && response.errorCode === 0) {
            this.setState({
                listSpecialty: response.data.rows,
                totalPage: response.data.totalPage,
                count: response.data.count,
                pageIndex: pageIndex,
            });
        }
    };

    handleToggleModel = () => {
        this.setState({ isOpenModel: !this.state.isOpenModel });
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

    handleSearch = async (currentKeyword) => {
        let { limit, pageIndex } = this.state;
        try {
            let response = await filterAndPagingSpecialty(pageIndex, limit, currentKeyword);
            if (response && response.errorCode === 0) {
                this.setState({
                    listSpecialty: response.data.rows,
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
    render() {
        let { modalSpecialty } = this.props;
        let { listSpecialty, count, pageIndex, totalPage } = this.state;

        return (
            <div className="list-specialty-container">
                <Modal
                    className="modal-booking-container"
                    isOpen={modalSpecialty}
                    toggle={() => this.props.toggleModel('modalSpecialty')}
                    size="mn"
                    centered={false}
                >
                    <ModalHeader toggle={() => this.props.toggleModel('modalSpecialty')}>
                        Danh sách chuyên khoa
                    </ModalHeader>
                    <ModalBody>
                        <div className="search-container-list-patient">
                            <SearchInput placeholder="Tìm kiếm..." handleSearch={this.handleSearch} delay={800} />
                        </div>
                        <div className="list-specialty-content">
                            {listSpecialty.length > 0 &&
                                listSpecialty.map((item) => {
                                    return (
                                        <Link className="item" to={`/detail-specialty/${item.id}`} key={item.id}>
                                            <div className="item-specialty" key={item.id}>
                                                <div className="image-specialty">
                                                    <img src={item.image} alt="img"></img>
                                                </div>
                                                <div className="name-specialty">{item.name}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                        <FooterPaging
                            titleTotalRecord="Tổng chuyên khoa"
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
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
