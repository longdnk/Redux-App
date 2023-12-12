import React, { useEffect } from "react";
import { Button, Image, Space, Table } from "antd";
import { EditFilled } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { DeleteProductModal } from "@features/Product/SubComponent/DeleteModal";
import { Category } from "@features/Categories/redux/type";
import { categoryRequest } from "@features/Categories/redux/categorySlice";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import moment from "moment";
import { DeleteCategoryModal } from "@features/Categories/SubComponent/DeleteModal";

type Props = {
	openForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CategoryTable: React.FC<Props> = props => {

	const { openForm } = props;

	const dispatch = useAppDispatch();

	const {
		list: {
			loading,
			data,
		}
	} = useAppSelector(state => state.category);

	useEffect(() => {
		dispatch(categoryRequest());
	}, [dispatch]);

	return (
		<>
			<Table
				pagination={{
					size: 'small'
				}}
				style={{ minHeight: 600 }}
				scroll={{ x: 500, y: 600 }}
				columns={columns(openForm)}
				dataSource={data}
				loading={loading}
				rowKey={'id'}
			/>
		</>
	)
}

export default CategoryTable;

const columns = (
	openForm: (event: React.MouseEvent<HTMLButtonElement>) => void,
): ColumnsType<Category> => {
	return [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: text => <a>{text}</a>
		},
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			render: (_, record) => <Image src={record.image} style={{ width: 120, height: 120 }}/>
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (_, record) => moment(record.creationAt).format('DD/MM/YYYY HH:MM:ss')
		},
		{
			title: 'Updated At',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (_, record) => moment(record.creationAt).format('DD/MM/YYYY HH:MM:ss')
		},
		{
			title: 'Actions',
			dataIndex: 'action',
			key: 'action',
			render: (_, record) => {
				return (
					<Space size={'small'}>
						<Button
							name={'Edit'}
							className={'btn-edit'}
							size={'small'}
							icon={<EditFilled/>}
							onClick={openForm}
							value={record.id}
						>
						</Button>
						<DeleteCategoryModal id={record.id}/>
					</Space>
				)
			}
		}
	];
}
