import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { deleteProductRequest, getProductRequest } from "@features/Product/redux/productSlice";

type Props = {
	id: string | number;
}

const DeleteModal: React.FC<Props> = props => {

	const dispatch = useAppDispatch();

	const { pending } = useAppSelector(state => state.product.delete);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		dispatch(deleteProductRequest({ id: props.id, callback: callback }))
	};

	const callback = () => {
		handleCancel();
		dispatch(getProductRequest());
	}

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button icon={<DeleteFilled/>} size={'small'} type="primary" onClick={showModal} danger></Button>
			<Modal
				title="Delete Item"
				visible={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okButtonProps={{ loading: pending, type: 'primary' }}
			>
				<p>Delete Product ?</p>
			</Modal>
		</>
	)

}

export default DeleteModal;