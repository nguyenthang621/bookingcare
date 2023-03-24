import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SearchInput.scss';
import { IoSearchOutline } from 'react-icons/io5';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            idTimeOutSearch: '',
        };
        this.timer = null;
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState) {}

    handleOnChangeInput = (input) => {
        let { delay } = this.props;

        this.setState({
            keyword: input.trim(),
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.handleSearchUser(this.state.keyword);
        }, delay || 500);
    };

    render() {
        let { placeholder } = this.props;
        let { keyword } = this.state;
        return (
            <div className="search-input">
                <div className="wrapper-search">
                    <input
                        placeholder={placeholder || 'Tìm kiếm...'}
                        type="text"
                        className="input"
                        value={keyword}
                        onChange={(e) => this.handleOnChangeInput(e.target.value)}
                    />
                    <div className="icon">
                        <IoSearchOutline />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
