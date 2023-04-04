import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './ConfirmModal.scss';
import * as actions from '../store/actions';
import { KeyCodeUtils } from '../utils';

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.acceptBtnRef = React.createRef();
    }

    initialState = {};

    state = {
        ...this.initialState,
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            if (!this.acceptBtnRef.current || this.acceptBtnRef.current.disabled) return;
            this.acceptBtnRef.current.click();
        }
    };

    onAcceptBtnClick = () => {
        const { contentOfConfirmModal } = this.props;
        if (contentOfConfirmModal.handleFunc) {
            contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc);
        }
        this.onClose();
    };

    onClose = () => {
        this.props.setContentOfConfirmModal({
            isOpen: false,
            messageId: '',
            handleFunc: null,
            dataFunc: null,
        });
    };

    render() {
        const { isShowConfirmModal, content } = this.props;

        return (
            <Modal
                className="modal-booking-container"
                isOpen={isShowConfirmModal}
                toggle={() => this.props.toggleConfirmModal()}
                size="sm"
                centered={true}
            >
                <ModalHeader toggle={() => this.props.toggleConfirmModal()}>
                    {' '}
                    <FormattedMessage id="confirm.title" />
                </ModalHeader>
                <ModalBody> {content}</ModalBody>
                <ModalFooter>
                    <Button className=" button btn-save" color="danger" onClick={() => this.props.deleteFunc()}>
                        <FormattedMessage id="confirm.accept" />
                    </Button>{' '}
                    <Button
                        className="button btn btn-cancel"
                        color="success"
                        onClick={() => this.props.toggleConfirmModal()}
                    >
                        <FormattedMessage id="confirm.close" />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
        contentOfConfirmModal: state.app.contentOfConfirmModal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setContentOfConfirmModal: (contentOfConfirmModal) =>
            dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
