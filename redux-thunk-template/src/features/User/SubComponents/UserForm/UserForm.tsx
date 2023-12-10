import { Button, Drawer, DrawerProps, Form, Input, Radio, Space, Spin } from "antd"
import React, { useEffect } from "react"
import { PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { User } from "@features/User/redux/type";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { addUser, editUser, fetchUser } from "@features/User/redux/userSlice";

type FormProps = DrawerProps & {
    onClose: () => void;
    type: string;
}

const UserForm: React.FC<FormProps> = props => {

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const {
        add: {
            pending: addPending
        },
        edit: {
            pending: editPending
        },
        detail: {
            data: detailData,
            loading
        }
    } = useAppSelector(state => state.user);

    const resetForm = () => {
        form.resetFields();
    }

    const handleSubmit = (data: User) => {
        switch (props.type) {
            case 'Add':
                return dispatch(addUser({ data, callback }));
            case 'Edit':
                return dispatch(editUser({ data, id: detailData.id ?? 1000, callback }));
        }
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
        dispatch(fetchUser(1000));
    }

    const isEdit = props.type === 'Edit';

    useEffect(() => {
        if (detailData) {
            form.setFieldsValue(detailData);
        }
    }, [detailData, form]);

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
                initialValues={isEdit ? detailData : {
                    gender: 'male',
                }}
            >
                <Spin spinning={loading}>
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
                                loading={isEdit ? editPending : addPending}
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