import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import ModalSpecialty from './ModalSpecialty';
import SearchInput from '../../../components/SearchInput';
import FooterPaging from '../../../components/FooterPaging';
import { filterAndPagingSpecialty, deleteSpecialtyByIdServices } from '../../../services/userServices';
import ModalConfirm from '../ModalConfirm';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import moment from 'moment';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModel: false,
            listSpecialty: [],

            count: 1,
            totalPage: 1,

            pageIndex: 1,
            limit: 5,
            keyword: '',
            currentSpecialtyId: '',
            isShowLoading: false,
        };
    }
    componentDidMount() {
        let { pageIndex, limit, keyword } = this.state;
        this.handleFilterAndPaging(pageIndex, limit, keyword);
    }
    componentDidUpdate() {}

    handleFilterAndPaging = async (pageIndex, limit, keyword) => {
        this.setState({
            isShowLoading: true,
        });
        let response = await filterAndPagingSpecialty(pageIndex, limit, keyword);
        if (response && response.errorCode === 0) {
            this.setState({
                listSpecialty: response.data.rows,
                totalPage: response.data.totalPage,
                count: response.data.count,
                pageIndex: pageIndex,
                isShowLoading: false,
            });
        }
    };

    handleToggleModel = () => {
        this.setState({ isOpenModel: !this.state.isOpenModel });
    };

    handleChangePage = async (numberPage) => {
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
        this.setState({
            isShowLoading: true,
        });
        try {
            let response = await filterAndPagingSpecialty(pageIndex, limit, currentKeyword);
            if (response && response.errorCode === 0) {
                this.setState({
                    listSpecialty: response.data.rows,
                    totalPage: response.data.totalPage,
                    count: response.data.count,
                    pageIndex: pageIndex,
                    keyword: currentKeyword,
                    isShowLoading: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    toggleModelConfirm = (id) => {
        this.setState({
            isShowModalConfirm: !this.state.isShowModalConfirm,
            currentSpecialtyId: id,
        });
    };

    handleDestroy = async () => {
        let response = await deleteSpecialtyByIdServices(this.state.currentSpecialtyId);
        if (response && response.errorCode === 0) {
            this.toggleModelConfirm('');
            let { pageIndex, limit, keyword } = this.state;
            this.handleFilterAndPaging(pageIndex, limit, keyword);
            toast.success(response.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            this.toggleModelConfirm('');
            toast.error(response.message || 'Có lỗi xảy ra lui lòng tử lại.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    render() {
        let { isOpenModel, listSpecialty, count, pageIndex, totalPage, isShowModalConfirm, isShowLoading } = this.state;
        let { languageRedux } = this.props;

        return (
            <div className="specialty-container position-loading">
                {isShowLoading && <Loading />}
                {isOpenModel && (
                    <ModalSpecialty
                        toggleModel={this.handleToggleModel}
                        isOpenModel={this.state.isOpenModel}
                        reloadData={this.handleFilterAndPaging}
                    />
                )}
                {isShowModalConfirm ? (
                    <ModalConfirm
                        isShowModalConfirm={isShowModalConfirm}
                        toggleModelConfirm={this.toggleModelConfirm}
                        handleDeleteItem={this.handleDestroy}
                        text="Bạn muốn xoá chuyên khoa này"
                        type="confirm"
                        size="nm"
                        currentUserId={this.state.currentUserId}
                    />
                ) : (
                    ''
                )}

                <div className="container-table w60">
                    <div className="title">Quản lý chuyên khoa</div>
                    <div className="wrapper-table">
                        <div className="action-container">
                            <SearchInput placeholder="Tên cơ sở..." handleSearch={this.handleSearch} delay={800} />
                            <button className="btn btn-primary" onClick={() => this.handleToggleModel()}>
                                Thêm mới chuyên khoa
                            </button>
                        </div>
                        <div className="wrapper-scroll">
                            <table className="table table-hover">
                                <thead>
                                    <tr className="fixedTop">
                                        <th scope="col">STT</th>
                                        <th scope="col">Ảnh Logo</th>
                                        <th scope="col">Tên cơ sở</th>
                                        <th scope="col">Thời gian tạo</th>
                                        <th scope="col">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listSpecialty &&
                                        listSpecialty.length > 0 &&
                                        listSpecialty.map((item, index) => {
                                            const dateCreate = moment
                                                .unix(new Date(item.createdAt) / 1000)
                                                .local(languageRedux)
                                                .format('dddd - DD/MM/YYYY');
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        <div className="img-wrapper-specialty">
                                                            <img src={item.image} atl="img"></img>
                                                        </div>
                                                    </td>
                                                    <td>{item.name}</td>

                                                    <td>{dateCreate}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning"
                                                            onClick={() => this.toggleModelConfirm(item.id)}
                                                        >
                                                            Xoá
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                        <FooterPaging
                            titleTotalRecord="Tổng chuyên khoa"
                            TotalPage={totalPage}
                            PageIndex={pageIndex}
                            TotalRecord={count}
                            handleChangePage={this.handleChangePage}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
