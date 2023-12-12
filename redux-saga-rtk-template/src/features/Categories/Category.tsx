import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Button, Card, Space } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useAppDispatch } from "@app/hooks";
import * as SubComponent from './SubComponent';
import { detailCategoryRequest } from "@features/Categories/redux/categorySlice";

const Category: React.FC = () => {

	const dispatch = useAppDispatch();

	const [open, setOpen] = useState<boolean>(false);

	const [type, setType] = useState<string>('Add');

	const showDrawer = () => setOpen(true);

	const onClose = () => setOpen(false);

	const openForm = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.currentTarget.name === 'Edit') {
			dispatch(detailCategoryRequest(event.currentTarget.value));
		}
		setType(event.currentTarget.name);
		showDrawer();
	}

	return (
		<Content className={'content-top'}>
			<div className={'content-sub'}>
				<p>Product</p>
			</div>
			<div className={'content-style'}>
				<Card
					className={'card-style'}
					title="Product Table"
					extra={
						<Space>
							<Button
								type={'primary'}
								icon={<PlusCircleFilled/>}
								name={'Add'}
								onClick={openForm}
							>
								Add
							</Button>
						</Space>
					}
				>
					<SubComponent.CategoryTable openForm={openForm}/>
					<SubComponent.CategoryForm
						type={type}
						title={type + ' Category'}
						onClose={onClose}
						visible={open}
						width={600}
						/>
				</Card>
			</div>
		</Content>
	)
}

export default Category;