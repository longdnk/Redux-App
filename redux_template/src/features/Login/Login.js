import React from "react";
import { Breadcrumb, Button, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { connect } from "react-redux";
import { loginUser } from "./redux/action";
import PropTypes from "prop-types";
import { hash } from "../../helper/helper";

class Login extends React.Component {

    formRef = React.createRef();

    loginUser = value => {
        this.props.loginUser({ ...value, password: hash(value.password) });
    }

    resetForm = () => {
        this.formRef.current.resetFields();
    }

    render = () => {

        const loading = this.props.login.pending;

        return (

            <Content style={{ padding: '0 50px' }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.loginUser}
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Space size={'small'}>
                                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                    Log in
                                </Button>
                                <Button type="default" className="login-form-button" onClick={this.resetForm}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        )
    }
}

const stateToProps = state => {
    return {
        login: state.login.loginInfo,
    }
}

const dispatchToProps = dispatch => {
    return {
        loginUser: data => {
            dispatch(loginUser(data));
        },
    }
}

Login.propTypes = {
    login: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
}

export default connect(stateToProps, dispatchToProps)(Login);