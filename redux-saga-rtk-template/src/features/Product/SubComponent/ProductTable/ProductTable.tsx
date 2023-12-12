import React, { useEffect } from "react";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { getProductRequest } from "@features/Product/redux/productSlice";
import { Product } from "@features/Product/redux/type";
import moment from "moment";
import DeleteModal from "@features/Product/SubComponent/DeleteModal/DeleteModal";
import { DeleteProductModal } from "@features/Product/SubComponent/DeleteModal";

type Props = {
	openForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductTable: React.FC<Props> = props => {

	const dispatch = useAppDispatch();

	const { list: { data, loading } } = useAppSelector(state => state.product);

	const { openForm } = props;

	useEffect(() => {
		dispatch(getProductRequest());
	}, [dispatch]);

	return (
		<>
			<Table
				pagination={{
					size: 'small'
				}}
				style={{ minHeight: 600 }}
				scroll={{ x: 600, y: 1000 }}
				columns={columns(openForm)}
				dataSource={data}
				loading={loading}
				rowKey={'id'}
			/>
		</>
	)
}

const columns = (
	openForm: (event: React.MouseEvent<HTMLButtonElement>) => void,
): ColumnsType<Product> => {
	return [
		{
			title: 'Name',
			dataIndex: 'title',
			key: 'title',
			width: 300,
			render: text => <a>{text}</a>
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
			render: (_, record) => record.category.name,
		},
		{
			title: 'Created At',
			dataIndex: 'creationAt',
			key: 'creationAt',
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
						<DeleteProductModal id={record.id}/>
					</Space>
				)
			}
		}
	];
}

export default ProductTable;