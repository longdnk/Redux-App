import { Layout, Avatar, Menu, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import Title from 'antd/lib/typography/Title';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { clearToken, loadImage, loadUser } from '@helper';
import { useEffect } from "react";

const { Header, Footer, Sider } = Layout;

type Props = {
    children: string | JSX.Element | JSX.Element[];
}

const MainLayout: React.FC<Props> = props => {


    const { pathname } = useLocation();

    const { push } = useHistory();

    const defaultKey = (pathname === '/user' || pathname === '/') ? 'User' : 'Role';

    const handleLogout = () => {
        clearToken();
        push('/login');
    }

    const imageProfile = loadImage();

    const name = localStorage.getItem('userName');

    const nameComponent = <h3><>{name}</>
    </h3>

    useEffect(() => {
        if (pathname === '/user' || pathname === '/') {
            push('/user');
        }
        else {
            push(pathname);
        }
    }, [pathname, push]);

    return (
        <div className="App">
            <Layout>
                <Header style={{ padding: 10 }}>
                    <Avatar style={{ float: 'right' }} src={<Image src={imageProfile ?? ''}/>}/>
                    <Avatar style={{ float: 'right', marginRight: 30, minWidth: 100 }} src={nameComponent}/>
                    <Title style={{ color: 'white' }} level={3}>ANTD</Title>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            selectedKeys={[defaultKey]}
                            mode="inline"
                            theme="dark"
                        >
                            <Menu.Item key='User'>
                                <NavLink to={'/user'}>
                                    User
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key='Role'>
                                <NavLink to={'/role'}>
                                    Role
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