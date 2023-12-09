import React from "react";
import { Button, Drawer, Form, Input, Select, Space, Spin } from "antd";
import { CloseCircleFilled, EditFilled, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { hash, pushNotification } from "../../../../helper/helper";

export default class FormUser extends React.Component {

    render = () => {

        const { type, visible, userDetail, userEdit, userAdd, roleList: { data } } = this.props;

        return (
            <Drawer
                title={type === 'Add' ? 'Add user' : "Edit user"}
                placement="right"
                onClose={this.closeForm}
                visible={visible}
                width={600}
                maskClosable={false}
                closeIcon={<CloseCircleFilled/>}
            >
                <Spin spinning={userDetail.loading}>
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        ref={this.formRef}
                        name="control-ref"
                        labelAlign={'left'}
                        onFinish={this.handleClick}
                        onFinishFailed={this.handleFailed}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Fill Name' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Fill Password' }]}
                        >
                            <Input disabled={type === 'Edit'}/>
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{ required: true, message: 'Fill Role' }]}
                        >
                            <Select
                                allowClear
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Role"
                                options={data.map(e => {
                                    return {
                                        value: e.name,
                                        label: e.name,
                                    }
                                })}
                            />
                        </Form.Item>

                        <Form.Item
                            name="avatar"
                            label="Image"
                        >
                            <Input.TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item
                            name="token"
                            label="Token"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 9, span: 20 }}>
                            <Space size={'small'}>
                                {
                                    this.props.type === 'Add' ?
                                        <Button
                                            className={'btn-custom'}
                                            type="primary"
                                            icon={<PlusCircleFilled/>}
                                            htmlType={'submit'}
                                            loading={userAdd.pending}
                                        >
                                            Add
                                        </Button>
                                        :
                                        <Button
                                            className={'btn-edit'}
                                            icon={<EditFilled/>}
                                            htmlType={'submit'}
                                            loading={userEdit.pending}
                                        >
                                            Edit
                                        </Button>
                                }

                                <Button
                                    type={'ghost'}
                                    icon={<ReloadOutlined/>}
                                    onClick={this.resetForm}
                                >
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Spin>
            </Drawer>
        )
    }

    formRef = React.createRef();

    componentDidUpdate = prevProps => {
        if (prevProps.userDetail.data !== this.props.userDetail.data) {
            const { name, role, avatar, token, password } = this.props.userDetail.data;
            this.formRef.current.setFieldsValue({
                name: name,
                role: role,
                avatar: avatar,
                token: token,
                password: password,
            })
        }
    }

    resetForm = () => {
        const { name, role, avatar, token } = this.props.userDetail.data;

        return this.props.type === 'Add' ?
            this.formRef.current.resetFields()
            :
            this.formRef.current.setFieldsValue({
                name: name,
                role: role,
                avatar: avatar,
                token: token
            })
    }

    closeForm = () => {
        this.formRef.current.resetFields();
        this.props.closeForm();
    }

    callback = () => {
        this.closeForm();
        this.props.getUser();
    }

    handleClick = value => {
        return this.props.type === 'Add' ?
            this.props.addUser({
                data: {
                    ...value,
                    password: hash(value.password)
                },
                callback: this.callback
            })
            :
            this.props.editUser({
                data: value,
                id: this.props.userDetail.data.id,
                callback: this.callback,
            });

    }

    handleFailed = () => pushNotification({ type: 'warning', message: 'Invalid values' });
}

FormUser.propTypes = {
    type: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    roleList: PropTypes.object.isRequired,

    userDetail: PropTypes.object.isRequired,
    userEdit: PropTypes.object.isRequired,
    userAdd: PropTypes.object.isRequired,

    addUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
}
