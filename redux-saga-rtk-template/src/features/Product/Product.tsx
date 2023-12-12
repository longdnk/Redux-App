import React from "react";
import { Content } from "antd/es/layout/layout";
import { Button, Card, Space } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const Product: React.FC = () => {

	return (
		<Content className={'content-top'}>
			<div className={'content-sub'}>
				<p>Product</p>
			</div>
			<div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
				<Card
					style={{ width: '100%' }}
					title="Product Table"
					extra={
						<Space>
							<Button
								type={'primary'}
								icon={<PlusCircleFilled/>}
								name={'Add'}
								// onClick={openForm}
							>
								Add
							</Button>
						</Space>
					}
				>
					{/*<SubComponent.UserTable openForm={openForm}/>*/}
					{/*<SubComponent.UserForm*/}
					{/*	type={type}*/}
					{/*	title={type + ' User'}*/}
					{/*	onClose={onClose}*/}
					{/*	visible={open}*/}
					{/*	width={600}*/}
					{/*/>*/}
				</Card>
			</div>
		</Content>
	)
}

export default Product;