import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import './Menu.scss';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}
    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
        }
    }
    //render các item MenuItem:
    render() {
        const { itemCurrent, languageRedux } = this.props;

        return (
            <>
                {itemCurrent &&
                    itemCurrent.data &&
                    itemCurrent.data.length > 0 &&
                    itemCurrent.data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={item.title_en === 'Logout' ? `item item-last-child` : `item`}
                                onClick={() => this.props.handleClickItem(item)}
                            >
                                <span className="icon_item">{item.icon}</span>
                                <p>{languageRedux === LANGUAGES.VI ? item.title_vi : item.title_en}</p>
                            </div>
                        );
                    })}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languageRedux: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
