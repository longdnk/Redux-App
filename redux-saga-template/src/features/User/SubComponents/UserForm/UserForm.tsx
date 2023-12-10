import { Button, Drawer, DrawerProps, Form, Input, Radio, Space, Spin } from "antd"
import React, { useEffect } from "react"
import { PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";

type FormProps = DrawerProps & {
    onClose: () => void;
    type: string;
}

const UserForm: React.FC<FormProps> = props => {

    const [form] = Form.useForm();


    const resetForm = () => {
        form.resetFields();
    }

    const handleSubmit = (data: any) => {
        console.log(data)
    }

    const closeForm = () => {
        form.setFieldsValue({
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: '',
            gender: 'male',
        });
        props.onClose();
    }

    const callback = () => {
        closeForm();
    }

    const isEdit = props.type === 'Edit';

    useEffect(() => {
        // if (detailData) {
        //     form.setFieldsValue(detailData);
        // }
    }, []);

    return (
        <Drawer
            title={props.title}
            placement={'right'}
            onClose={closeForm}
            visible={props.visible}
            width={props.width}
            forceRender={true}
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 22 }}
                labelAlign={'left'}
                form={form}
                onFinish={handleSubmit}
                // initialValues={isEdit ? detailData : {
                //     gender: 'male',
                // }}
            >
                <Spin spinning={false}>
                    <Form.Item
                        label={'User name'}
                        name={'username'}
                        rules={[{ required: true, message: 'Input user name' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'First name'}
                        name={'firstName'}
                        rules={[{ required: true, message: 'Input first name' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'Last name'}
                        name={'lastName'}
                        rules={[{ required: true, message: 'Input last name' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'Password'}
                        name={'password'}
                        rules={[{ required: true, message: 'Input password' }]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label={'Email'}
                        name={'email'}
                        rules={[{ required: true, message: 'Input email' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'Phone'}
                        name={'phone'}
                        rules={[{ required: true, message: 'Input Phone' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'Gender'}
                        name={'gender'}
                        rules={[{ required: true, message: 'Select Gender' }]}
                    >
                        <Radio.Group>
                            <Radio value={'male'}>Male</Radio>
                            <Radio value={'female'}>Female</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
                        <Space>
                            <Button
                                className={isEdit ? 'btn-edit' : ''}
                                type={'primary'}
                                icon={<PlusCircleFilled/>}
                                htmlType={'submit'}
                                loading={false}
                            >
                                {props.type}
                            </Button>
                            <Button
                                name={'Edit'}
                                type={'default'}
                                icon={<ReloadOutlined/>}
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Spin>
            </Form>
        </Drawer>
    )
}

export default UserForm;