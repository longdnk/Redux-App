import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { useHistory } from "react-router-dom";
import { LoginData } from "./redux/type";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { loginRequest } from "@features/Login/redux/loginSlice";

const Login = () => {

	const dispatch = useAppDispatch();

	const {
		pending
	} = useAppSelector(state => state.auth);

	const [form] = Form.useForm();

	const { push } = useHistory();

	const callback = () => {
		return push('/product');
	}

	const handleLogin = (data: LoginData) => {
		dispatch(loginRequest({ data: data, callback: callback }));
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
								name="email"
								rules={[
									{
										required: true,
										message: 'Please input your Email!',
									},
								]}
							>
								<Input prefix={<UserOutlined/>} placeholder="Email" className={'form-input'}/>
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
								<Input.Password
									prefix={<LockOutlined/>}
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