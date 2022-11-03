import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import './UserRedux.scss';
import { FaFileUpload } from 'react-icons/fa';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImageUrl: '',
            isShowBoxImage: false,
            isRoomImage: false,
        };
    }

    async componentDidMount() {
        this.props.fetchKeyFromRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.keyForm !== this.props.keyForm) {
            let { genders, positions, roles } = this.props.keyForm;
            this.setState({
                genders: genders.data,
                positions: positions.data,
                roles: roles.data,
            });
        }
    }
    handleOnchangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({ previewImageUrl: objectUrl, isShowBoxImage: true });
        }
    };

    render() {
        let { languageRedux } = this.props;
        let { genders, positions, roles } = this.state;

        return (
            <div className="user-redux-container ">
                <div className="title">User react-redux</div>
                <div className="use-redux-body">
                    <div className="container mt-4">
                        <div className="text">
                            <span>
                                <FormattedMessage id="manage-user.add" />
                            </span>
                        </div>
                        <div className="form-container">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input type="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input type="password" className="form-control" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">
                                            <FormattedMessage id="manage-user.firstName" />
                                        </label>
                                        <input type="text" className="form-control" placeholder="First name" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">
                                            <FormattedMessage id="manage-user.lastName" />
                                        </label>
                                        <input type="text" className="form-control" placeholder="Last name  " />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-9">
                                        <label htmlFor="inputAddress">
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input type="text" className="form-control" placeholder="1234 Main St" />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputPassword4">
                                            <FormattedMessage id="manage-user.phoneNumber" />
                                        </label>
                                        <input type="number" className="form-control" placeholder="098" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputState">
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select id="inputState" className="form-control">
                                            {genders &&
                                                genders.length > 0 &&
                                                genders.map((gender) => {
                                                    return (
                                                        <option key={gender.id}>
                                                            {languageRedux === LANGUAGES.VI
                                                                ? gender.valueVi
                                                                : gender.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputState">Position</label>
                                        <select id="inputState" className="form-control">
                                            {positions &&
                                                positions.length > 0 &&
                                                positions.map((gender) => {
                                                    return (
                                                        <option key={gender.id}>
                                                            {languageRedux === LANGUAGES.VI
                                                                ? gender.valueVi
                                                                : gender.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputState">Role</label>
                                        <select id="inputState" className="form-control">
                                            {roles &&
                                                roles.length > 0 &&
                                                roles.map((gender) => {
                                                    return (
                                                        <option key={gender.id}>
                                                            {languageRedux === LANGUAGES.VI
                                                                ? gender.valueVi
                                                                : gender.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-3 upload-file-container">
                                        <label htmlFor="inputCity">
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <div className="btn-container">
                                            <input
                                                id="uploadFile"
                                                type="file"
                                                onChange={(e) => this.handleOnchangeImage(e)}
                                                className="form-control"
                                                hidden
                                            />
                                            <label className="text-upload" htmlFor="uploadFile">
                                                Tải ảnh
                                                <FaFileUpload className="icon-upload" />
                                            </label>
                                            {this.state.isShowBoxImage && (
                                                <div
                                                    className="preview"
                                                    style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                                    onClick={() => this.setState({ isRoomImage: true })}
                                                ></div>
                                            )}
                                        </div>
                                        {this.state.isRoomImage && (
                                            <Lightbox
                                                mainSrc={this.state.previewImageUrl}
                                                onCloseRequest={() => this.setState({ isRoomImage: false })}
                                            />
                                        )}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </form>
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
        // gendersRedux: state.admin.genders,
        keyForm: state.admin.keyForm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchGenderStartRedux: () => dispatch(actions.fetchGenderStart()),
        fetchKeyFromRedux: () => dispatch(actions.fetchKeyForm()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
