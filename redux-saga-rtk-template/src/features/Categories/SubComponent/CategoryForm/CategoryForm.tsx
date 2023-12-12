import React, { useEffect } from "react";
import { Button, Drawer, DrawerProps, Form, Input, Space, Spin } from "antd";
import { CloseCircleFilled, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { Category } from "@features/Categories/redux/type";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { addCategoryRequest, categoryRequest, editCategoryRequest } from "@features/Categories/redux/categorySlice";
import category from "@features/Categories/Category";
import { pushNotification } from "@helper";

type FormProps = DrawerProps & {
	onClose: () => void;
	type: string;
}

const CategoryForm: React.FC<FormProps> = props => {

	const dispatch = useAppDispatch();

	const [form] = Form.useForm();

	const {
		add: {
			pending: addPending,
		},
		edit: {
			pending: editPending,
		},
		detail: {
			data: detailData,
			loading,
		}
	} = useAppSelector(state => state.category);

	const isEdit = props.type === 'Edit';

	const pending = isEdit ? editPending : addPending;

	const resetForm = () => {
		form.resetFields();
	}

	const handleSubmit = (data: Omit<Category, 'id'>) => {
		
		const {
			id, updatedAt, creationAt, ...prev
		} = detailData;

		const check = JSON.stringify(prev) === JSON.stringify(data);

		if (check) {
			return pushNotification({ type: 'info', message: 'Data is same, cannot Edit' });
		}

		switch (props.type) {
			case 'Add':
				return dispatch(addCategoryRequest({ data: data, callback: callback }));
			case 'Edit':
				return dispatch(editCategoryRequest({ data: data, id: detailData?.id ?? '', callback: callback }));
		}
	}

	const closeForm = () => {
		form.setFieldsValue({
			name: '',
			image: '',
		});
		props.onClose();
	}

	const callback = () => {
		closeForm();
		dispatch(categoryRequest());
	}

	useEffect(() => {
		if (detailData) {
			form.setFieldsValue(detailData);
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
			>
				<Spin spinning={loading}>
					<Form.Item
						label={'Name'}
						name={'name'}
						rules={[{ required: true, message: 'Input name' }]}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						label={'Image'}
						name={'image'}
						rules={[{ required: true, message: 'Input image' }]}
					>
						<Input/>
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

export default CategoryForm;