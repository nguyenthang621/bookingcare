import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';
import { LANGUAGES } from '../../../../utils';

import { IoChevronBack } from 'react-icons/io5';
import { changeLanguageApp } from '../../../../store/actions';
import { withRouter } from 'react-router';

import _ from 'lodash';

import './Menu.scss';

import HeadlessTippy from '@tippyjs/react/headless';

import 'tippy.js/dist/tippy.css'; // optional

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            re_render: false,
        };
    }

    componentDidMount() {
        this.setState({
            history: [{ data: this.props.items }],
        });
    }

    handleClickItem = async (item) => {
        let { history } = this.state;

        let isParent = !_.isEmpty(item);

        if (isParent && item?.children) {
            this.setState({
                history: [...this.state.history, item.children],
            });
        }
        if (item.codeLanguage) {
            this.props.changeLanguageRedux(item.codeLanguage);
            this.setState({
                history: history.slice(0, history.length - 1),
            });
        }
        if (item.action) {
            let actions = item.action;
            await this.props[actions]();
            this.props.history.push(item.to);
        } else if (item.to) {
            this.props.history.push(item.to);
        }
    };
    handleClickBack = () => {
        let { history } = this.state;
        this.setState({
            history: history.slice(0, history.length - 1),
        });
    };

    render() {
        let { language, children, items = [] } = this.props;
        let { history } = this.state;
        let current = history[history.length - 1];

        return (
            <>
                <HeadlessTippy
                    delay={[0, 500]}
                    interactive // cho tuong tac vs Headlesstippy box
                    placement="bottom-end"
                    // visible // luon hien
                    // onHide={handleResetToFirstPage}
                    render={() => (
                        <div className="menu-list">
                            {history.length > 1 && (
                                <MenuHeader
                                    title={language === LANGUAGES.VI ? current.title_vi : current.title_en}
                                    onBack={this.handleClickBack}
                                    iconBack={<IoChevronBack />}
                                />
                            )}
                            <MenuItem items={items} itemCurrent={current} handleClickItem={this.handleClickItem} />
                        </div>
                    )}
                >
                    {children}
                </HeadlessTippy>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
