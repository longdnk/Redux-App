import React, { useEffect, useState } from "react";
import { Button, Input, InputNumber, Select, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled, FilterFilled, ReloadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { getProductRequest } from "@features/Product/redux/productSlice";
import { Product } from "@features/Product/redux/type";
import moment from "moment";
import { DeleteProductModal } from "@features/Product/SubComponent/DeleteModal";
import { format } from "@helper";
import { categoryRequest } from "@features/Categories/redux/categorySlice";

type Props = {
	openForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductTable: React.FC<Props> = props => {

	const dispatch = useAppDispatch();

	const [price, setPrice] =
		useState<{ price_min: number, price_max: number, categoryId: number }>(
			{
				price_min: 0,
				price_max: 0,
				categoryId: 0,
			}
		)

	const {
		list: {
			data,
			loading
		}
	} = useAppSelector(state => state.product);

	const {
		list: {
			data: categories,
		}
	} = useAppSelector(state => state.category);

	const { openForm } = props;

	const style: React.CSSProperties = { padding: '8px 0' };

	const handleChangePrice = (value: number, type: string) => {
		if (type === 'min') {
			setPrice({ ...price, price_min: value });
		}
		if (type === 'max') {
			setPrice({ ...price, price_max: value });
		}
		if (type === 'category') {
			setPrice({ ...price, categoryId: value });
		}
	}

	const filter = () => {
		const { price_min, price_max, categoryId } = price;
		dispatch(getProductRequest({ price_min, price_max, categoryId }));
	}

	const reset = () => {
		setPrice({ ...price, price_max: 0, price_min: 0, categoryId: 0 });
		dispatch(getProductRequest({}))
	}

	useEffect(() => {
		dispatch(getProductRequest({}));
		dispatch(categoryRequest());
	}, [dispatch]);

	return (
		<>
			<Space className={'input-group'}>
				<div style={style}>Min price:</div>
				<InputNumber
					className={'input-filter'}
					placeholder={'Min Price'}
					value={price.price_min}
					formatter={value => format(Number(value))}
					onChange={value => handleChangePrice(Number(value), 'min')}
				/>
				<div style={style}>Max price:</div>
				<InputNumber
					className={'input-filter'}
					placeholder={'Max Price'}
					value={price.price_max}
					formatter={value => format(Number(value))}
					onChange={value => handleChangePrice(Number(value), 'max')}
				/>
				<div style={style}>Category:</div>
				<Select
					className={'input-filter'}
					placeholder="Category"
					value={price.categoryId}
					onChange={value => handleChangePrice(value, 'category')}
				>
					{
						categories.map(element => {
							return (
								<Select.Option key={element.id} value={element.id}>
									{element.name}
								</Select.Option>
							)
						})
					}
				</Select>
				<Button
					type={'default'}
					icon={<FilterFilled/>}
					name={'filter'}
					onClick={filter}
				>
					Filter
				</Button>
				<Button
					type={'dashed'}
					icon={<ReloadOutlined/>}
					name={'filter'}
					onClick={reset}
				>
					Reload
				</Button>
			</Space>
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
			render: (_, record) => format(record.price),
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