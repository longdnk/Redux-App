import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { categoryRequest, deleteCategoryRequest } from "@features/Categories/redux/categorySlice";

type Props = {
	id: string | number;
}

const DeleteModal: React.FC<Props> = props => {

	const dispatch = useAppDispatch();

	const { pending } = useAppSelector(state => state.category.delete);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		dispatch(deleteCategoryRequest({ id: props.id, callback: callback }))
	};

	const callback = () => {
		handleCancel();
		dispatch(categoryRequest());
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
				<p>Delete Category ?</p>
			</Modal>
		</>
	)

}

export default DeleteModal;
