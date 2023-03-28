import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './SelectStatusId.scss';

class SelectStatusId extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        let {} = this.state;
    }
    componentDidUpdate(prevProps) {}

    render() {
        let {} = this.state;
        let { listSelect, statusId, handleChangeInput } = this.props;
        return (
            <div className="select-container">
                {listSelect &&
                    listSelect.map((item, index) => {
                        return (
                            <div
                                className={
                                    statusId === item.id
                                        ? `form-check form-check-inline select-active`
                                        : 'form-check form-check-inline'
                                }
                                key={index}
                            >
                                <input
                                    className="form-check-input radio-outline"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id={`id-${item.id}`}
                                    value={item.id}
                                    checked={statusId === item.id}
                                    onChange={(e) => handleChangeInput(e.target.value)}

                                    // hidden
                                />
                                <label className="form-check-label" htmlFor={`id-${item.id}`}>
                                    {item.text}
                                </label>
                            </div>
                        );
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectStatusId);
