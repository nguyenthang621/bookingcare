import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { BiUserCircle } from 'react-icons/bi';
import './DetailUser.scss';

class DetailUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
        };
    }
    async componentDidMount() {
        await this.props.getDetailUserRedux();
        this.setState({
            dataUser: this.props.detailUserRedux,
        });
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.detailUserRedux !== this.props.detailUserRedux) {
            this.setState({
                dataUser: this.props.detailUserRedux,
            });
        }
    }

    render() {
        let { dataUser } = this.state;
        return (
            <div className="detail-user-container">
                <div className="wrapper-detail-user coverArea">
                    <div className="content-detail-user">
                        <div className="avatar">
                            {dataUser?.image ? (
                                <img className="image-avatar" src={dataUser?.image} alt="img"></img>
                            ) : (
                                <BiUserCircle className="icon" />
                            )}
                        </div>
                        <div className="main-content coverArea">
                            <div className="name-user">
                                <p>{`${dataUser?.firstName} ${dataUser?.lastName}`}</p>
                            </div>
                            <p className="role-user">
                                <p>{dataUser?.roleData?.valueVi}</p>
                            </p>
                            <div className="more-infor coverArea">
                                <p>{`Họ tên: ${dataUser?.firstName} ${dataUser?.lastName}`}</p>
                                <p>{`Email: ${dataUser?.email} `}</p>
                                <p>{`Giới tính: ${dataUser?.genderData?.valueVi}` || 'Chưa xác định'}</p>
                                <p>{`Số điện thoại: ${dataUser?.phoneNumber}` || 'Chưa xác định'}</p>
                                <p>{`Địa chỉ: ${dataUser?.address}` || 'Chưa xác định'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
        detailUserRedux: state.user.detailUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailUserRedux: () => dispatch(actions.getDetailUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailUser);
