import React, { Component } from 'react';
import { connect } from 'react-redux';

import './FooterPaging.scss';
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5';

class FooterPaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
        };
    }
    componentDidMount() {
        let { TotalPage, PageIndex, TotalRecord } = this.props;

        this.setState({
            pages: this.handleArrPaging(TotalPage, PageIndex, TotalRecord),
        });
    }
    componentDidUpdate(prevProps) {
        let { TotalPage, PageIndex, TotalRecord } = this.props;
        if (prevProps.TotalRecord !== this.props.TotalRecord) {
            this.setState({
                pages: this.handleArrPaging(TotalPage, PageIndex, TotalRecord),
            });
        }
        if (prevProps.PageIndex !== this.props.PageIndex) {
            this.setState({
                pages: this.handleArrPaging(TotalPage, PageIndex, TotalRecord),
            });
        }
    }

    handleArrPaging = (TotalPage, PageIndex, TotalRecord) => {
        let pagesToShow = []; // Các trang cần hiển thị
        // Tính toán các trang cần hiển thị
        if (TotalRecord < PageIndex) {
            pagesToShow = [1];
        } else if (TotalPage < 5) {
            for (let i = 1; i <= TotalPage; i++) {
                pagesToShow.push(i);
            }
        } else {
            if (PageIndex < 3) {
                pagesToShow = [1, 2, 3, null, TotalPage];
            } else if (PageIndex >= TotalPage - 2) {
                pagesToShow = [1, null, TotalPage - 2, TotalPage - 1, TotalPage];
            } else {
                pagesToShow = [1, null, PageIndex, PageIndex + 1, PageIndex + 2, null, TotalPage];
            }
        }
        return pagesToShow;
    };

    render() {
        let { titleTotalRecord, PageIndex, TotalRecord } = this.props;
        let { pages } = this.state;

        return (
            <div className="footer-paging">
                <div className="wrapper-page df">
                    <div className="total-count df">
                        <p className="text-total">{titleTotalRecord || 'Tổng bản ghi'}:&nbsp; </p>{' '}
                        <p className="total"> {TotalRecord}</p>
                    </div>
                    <div className="paging-container df">
                        <div className="control-change-page df">
                            <div
                                className="btn-back btn-control-page"
                                onClick={() => this.props.handleChangePage('back')}
                            >
                                <IoChevronBack />
                            </div>
                            <div className="pages-container df">
                                {pages.length > 0 ? (
                                    pages.map((page, index) => {
                                        let classPage = 'pageNumber';
                                        if (PageIndex == page) classPage = 'pageNumber pageActive';
                                        return page ? (
                                            <div
                                                className={classPage}
                                                key={index}
                                                onClick={() => this.props.handleChangePage(+page)}
                                            >
                                                {page}
                                            </div>
                                        ) : (
                                            <p className="pageNumber" key={index}>
                                                ...
                                            </p>
                                        );
                                    })
                                ) : (
                                    <div className="pageNumber pageActive">1</div>
                                )}
                            </div>

                            <div
                                className="btn-next btn-control-page"
                                onClick={() => this.props.handleChangePage('next')}
                            >
                                <IoChevronForwardOutline />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterPaging);
