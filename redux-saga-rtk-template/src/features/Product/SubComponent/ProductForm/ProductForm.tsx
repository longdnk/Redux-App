import { Button, Drawer, DrawerProps, Form, Input, InputNumber, Select, Space, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { CloseCircleFilled, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { Product } from "@features/Product/redux/type";
import { addProductRequest, editProductRequest, getProductRequest } from "@features/Product/redux/productSlice";
import { pushNotification } from "@helper";

type FormProps = DrawerProps & {
	onClose: () => void;
	type: string;
}

const UserForm: React.FC<FormProps> = props => {

	const [index, setIndex] = useState<number>(-1);

	const dispatch = useAppDispatch();

	const [form] = Form.useForm();

	const {
		list: {
			loading: categoryLoading,
			data
		},
	} = useAppSelector(state => state.category);

	const {
		add: {
			pending: addPending,
		},
		edit: {
			pending: editPending,
		},
		detail: {
			loading: detailLoading,
			data: detailData,
		}
	} = useAppSelector(state => state.product);

	const isEdit = props.type === 'Edit';

	const loading = isEdit ? (detailLoading || categoryLoading) : categoryLoading;

	const pending = isEdit ? editPending : addPending;

	const resetForm = () => {
		form.resetFields();
	}

	const handleSubmit = (data: Omit<Product, 'id'>) => {

		const dataUpdate = { ...detailData, categoryId: detailData?.category?.id };

		const {
			id,
			category,
			creationAt,
			updatedAt,
			...prev
		} = dataUpdate;

		const check = JSON.stringify(prev) === JSON.stringify(data);

		if (check) {
			return pushNotification({ type: 'info', message: 'Data is same, cannot Edit' });
		}
		switch (props.type) {
			case 'Add':
				return dispatch(addProductRequest({ data: data, callback: callback }));
			case 'Edit':
				return dispatch(editProductRequest({ data: data, id: id ?? '', callback: callback }));
		}
	}

	const closeForm = () => {
		form.setFieldsValue({
			title: '',
			price: 0,
			description: '',
			categoryId: '',
			images: [],
		});
		props.onClose();
	}

	const callback = () => {
		closeForm();
		dispatch(getProductRequest());
	}

	useEffect(() => {
		if (detailData) {
			form.setFieldsValue({ ...detailData, categoryId: detailData.category?.id });
		}
	}, [form, detailData]);

	return (
		<Drawer
			title={props.title}
			placement={'right'}
			onClose={closeForm}
			visible={props.visible}
			width={props.width}
			forceRender={true}
			maskClosable={false}
			closeIcon={<CloseCircleFilled/>}
		>
			<Form
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 22 }}
				labelAlign={'left'}
				form={form}
				onFinish={handleSubmit}
				// initialValues={isEdit ? detailData : {
				// 	role: 'customer'
				// }}
			>
				<Spin spinning={loading}>
					<Form.Item
						label={'Title'}
						name={'title'}
						rules={[{ required: true, message: 'Input title' }]}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						label={'Price'}
						name={'price'}
						rules={[{ required: true, message: 'Input price' }]}
					>
						<InputNumber style={{ width: '100%' }}/>
					</Form.Item>

					<Form.Item
						label={'Description'}
						name={'description'}
						rules={[{ required: true, message: 'Input description' }]}
					>
						<Input.TextArea rows={3}/>
					</Form.Item>

					<Form.Item
						label={'Image'}
						name={'images'}
						rules={[{ required: true, message: 'Input image' }]}
					>
						<Select
							mode="tags"
							style={{ width: '100%' }}
							placeholder="Image"
						/>
					</Form.Item>

					<Form.Item
						label={'Category'}
						name={'categoryId'}
						rules={[{ required: true, message: 'Select category' }]}
					>
						<Select
							style={{ width: '100%' }}
							placeholder="Category"
						>
							{
								data.map(element => {
									return (
										<Select.Option key={element.id} value={element.id}>
											{element.name}
										</Select.Option>
									)
								})
							}
						</Select>
					</Form.Item>

					<Form.Item wrapperCol={{ span: 6, offset: 10 }}>
						<Space>
							<Button
								className={isEdit ? 'btn-edit' : ''}
								type={'primary'}
								icon={<PlusCircleFilled/>}
								htmlType={'submit'}
								loading={pending}
							>
								{props.type}
							</Button>
							<Button
								name={'Edit'}
								type={'default'}
								icon={<ReloadOutlined/>}
								onClick={resetForm}
							>
								Reset
							</Button>
						</Space>
					</Form.Item>
				</Spin>
			</Form>
		</Drawer>
	)
}

export default UserForm;