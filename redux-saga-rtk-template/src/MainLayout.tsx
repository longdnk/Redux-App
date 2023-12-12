import { Layout, Avatar, Menu, Image } from 'antd';
import Title from 'antd/lib/typography/Title';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { clearToken, loadImage } from '@helper';
import React from "react";

const {
	Header,
	Footer,
	Sider
} = Layout;

type Props = {
	children: string | JSX.Element | JSX.Element[];
}

const MainLayout: React.FC<Props> = props => {


	const { pathname } = useLocation();

	const { push } = useHistory();

	const defaultKey = (pathname === '/product' || pathname === '/') ? 'Product' : 'Category';

	const handleLogout = () => {
		clearToken();
		push('/login');
	}

	const imageProfile = loadImage();

	const name = localStorage.getItem('userName');

	const nameComponent = <h3><>{name}</>
	</h3>

	return (
		<div className="App">
			<Layout>
				<Header style={{ padding: 10 }}>
					<Avatar className={'header-avatar-custom'} src={<Image src={imageProfile ?? ''}/>}/>
					<Avatar className={'header-avatar-custom-mail'} src={nameComponent}/>
					<Title className={'title-custom'} level={3}>ANTD</Title>
				</Header>
				<Layout>
					<Sider>
						<Menu
							selectedKeys={[defaultKey]}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key='Product'>
								<NavLink to={'/product'}>
									Product
								</NavLink>
							</Menu.Item>

							<Menu.Item key='Category'>
								<NavLink to={'/category'}>
									Category
								</NavLink>
							</Menu.Item>

							<Menu.Item key='Logout'>
								<NavLink to={'/'} onClick={handleLogout}>
									Log out
								</NavLink>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<>
							{props.children}
						</>
						<Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by Random coder</Footer>
					</Layout>
				</Layout>
			</Layout>
		</div>
	)
}

export default MainLayout;