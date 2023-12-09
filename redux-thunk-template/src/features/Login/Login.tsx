import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@src/app/hooks";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { LoginData } from "./redux/type";
import { loginUser } from "./redux/loginSlice";
import { useHistory } from "react-router-dom";

const Login = () => {

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const { push } = useHistory();

    const { auth: { pending } } = useAppSelector(state => state.auth);

    const callback = () => {
        return push('/user');
    }

    const handleLogin = (data: LoginData) => {
        dispatch(loginUser({ data, callback }));
    }

    const resetForm = () => {
        form.resetFields();
    }

    return (
        <div className={'card-login-layout'}>
            <Row gutter={[24, 24]}>
                <Col xl={8} md={8} xs={8} span={8}>
                    <Card className={'card-login'}>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleLogin}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Username" className={'form-input'} />
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
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                    className={'form-input'}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit" className="login-form-button" loading={pending}>
                                        Log in
                                    </Button>
                                    <Button type="primary" onClick={resetForm} className="login-form-button">
                                        Reset
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login;