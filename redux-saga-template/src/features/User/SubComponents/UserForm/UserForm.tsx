import { Button, Drawer, DrawerProps, Form, Input, Radio, Space, Spin } from "antd"
import React, { useEffect } from "react"
import { CloseCircleFilled, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { User } from "@features/User/redux/type";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { addUserRequest, editUserRequest, userRequest } from "@features/User/redux/actions";
import { pushNotification } from "@helper";

type FormProps = DrawerProps & {
    onClose: () => void;
    type: string;
}

const UserForm: React.FC<FormProps> = props => {

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const isEdit = props.type === 'Edit';

    const {
        add: {
            pending: addPending,
        },
        detail: {
            data: detailData,
            loading
        },
        edit: {
            pending: editPending,
        }
    } = useAppSelector(state => state.user);

    const pending = isEdit ? editPending : addPending;

    const resetForm = () => {
        form.resetFields();
    }

    const handleSubmit = (data: Omit<User, 'id'>) => {
        const prevData: Omit<User, 'id' | 'creationAt' | 'updatedAt'> = {
            name: detailData?.name ?? '',
            password: detailData?.password ?? '',
            email: detailData?.email ?? '',
            role: detailData?.role ?? '',
            avatar: detailData?.avatar ?? '',
        }
        const check = JSON.stringify(data) === JSON.stringify(prevData);
        if (check) {
            return pushNotification({ type: 'info', message: 'Data submit is same, cannot EDIT' });
        }
        switch (props.type) {
            case 'Add':
                return dispatch(addUserRequest({ data: data, callback: callback }));
            case 'Edit':
                return dispatch(editUserRequest({ data: data, callback: callback, id: detailData.id ?? '' }));
        }
    }

    const closeForm = () => {
        form.setFieldsValue({
            name: '',
            password: '',
            email: '',
            role: '',
            avatar: '',
        });
        props.onClose();
    }

    const callback = () => {
        closeForm();
        dispatch(userRequest());
    }

    useEffect(() => {
        if (detailData) {
            form.setFieldsValue(detailData);
        }
    }, [form, detailData]);

    return (
        <Drawer
            title={props.title}
            placement={'right'}
            onClose={closeForm}
            visible={props.visible}
            width={props.width}
            forceRender={true}
            maskClosable={false}
            closeIcon={<CloseCircleFilled/>}
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 22 }}
                labelAlign={'left'}
                form={form}
                onFinish={handleSubmit}
                initialValues={isEdit ? detailData : {
                    role: 'customer'
                }}
            >
                <Spin spinning={loading}>
                    <Form.Item
                        label={'User name'}
                        name={'name'}
                        rules={[{ required: true, message: 'Input user name' }]}
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
                        label={'Role'}
                        name={'role'}
                        rules={[{ required: true, message: 'Select Role' }]}
                    >
                        <Radio.Group>
                            <Radio value={'customer'}>Customer</Radio>
                            <Radio value={'admin'}>Admin</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label={'Image'}
                        name={'avatar'}
                        rules={[{ required: true, message: 'Input Avatar' }]}
                    >
                        <Input.TextArea rows={5}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
                        <Space>
                            <Button
                                className={isEdit ? 'btn-edit' : ''}
                                type={'primary'}
                                icon={<PlusCircleFilled/>}
                                htmlType={'submit'}
                                loading={pending}
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