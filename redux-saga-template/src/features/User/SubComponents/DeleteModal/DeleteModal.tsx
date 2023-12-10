import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { deleteUserRequest, userRequest } from "@features/User/redux/actions";

type Props = {
    id: string | number;
}

const DeleteModal: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const { pending } = useAppSelector(state => state.user.delete);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch(deleteUserRequest({ id: props.id, callback: callback }))
    };

    const callback = () => {
        handleCancel();
        dispatch(userRequest());
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button icon={<DeleteFilled/>} size={'small'} type="primary" onClick={showModal} danger></Button>
            <Modal
                title="Delete User"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ loading: pending, type: 'primary' }}
            >
                <p>Delete User ?</p>
            </Modal>
        </>
    )

}

export default DeleteModal;