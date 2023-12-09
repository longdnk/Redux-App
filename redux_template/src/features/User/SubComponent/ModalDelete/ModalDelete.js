import React from "react";
import { Button, Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import PropTypes from "prop-types";

export default class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    setOpen = visible => {
        this.setState({
            ...this.state,
            visible: visible,
        })
    }

    showModal = () => this.setOpen(true);

    callback = () => {
        this.props.getUser();
        this.setOpen(false);
    }

    handleOk = () => {
        this.props.deleteUser({
            id: this.props.id,
            callback: this.callback
        });
    };

    handleCancel = () => this.setOpen(false);

    render = () => {

        const { name, pending } = this.props;

        return (
            <>
                <Button icon={<DeleteFilled/>} size={'small'} type="primary" onClick={this.showModal} danger>
                </Button>
                <Modal
                    centered
                    title="Delete user"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={{ danger: true, loading: pending }}
                >
                    <p>Are u Sure what to delete User {name}</p>
                </Modal>
            </>
        )
    }
}

ModalDelete.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired,
}