import React from "react";
import { Layout, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import Title from 'antd/lib/typography/Title';
import { NavLink } from 'react-router-dom';

const { Header, Footer, Sider } = Layout;

export default class MainLayout extends React.Component {

    render = () => {

        const { pathname } = this.props.location;

        const defaultKey = pathname === '/' ? 'Dashboard' : 'Role'

        return (
            <div className="App">
                <Layout>
                    <Header style={{ padding: 10 }}>
                        <Avatar style={{ float: 'right' }} src={<UserOutlined/>}/>
                        <Title style={{ color: 'white' }} level={3}>ANTD</Title>
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu
                                selectedKeys={[defaultKey]}
                                mode="inline"
                                theme="dark"
                            >
                                <Menu.Item key='Dashboard'>
                                    <NavLink to={'/'}>
                                        User
                                    </NavLink>
                                </Menu.Item>

                                <Menu.Item key='Role'>
                                    <NavLink to={'/role'}>
                                        Role
                                    </NavLink>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <>
                                {this.props.children}
                            </>
                            <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by Random coder</Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}