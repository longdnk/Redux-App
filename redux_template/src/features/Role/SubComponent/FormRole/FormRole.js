import React from "react";
import { CloseCircleFilled, EditFilled, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Select, Space, Spin } from "antd";
import PropTypes from "prop-types";
import { pushNotification } from "../../../../helper/helper";

export default class FormRole extends React.Component {
    render = () => {
        const {
            type,
            visible,
            roleDetail: {
                loading
            },
            roleAdd,
            roleEdit,
        } = this.props;

        return (
            <Drawer
                title={type === 'Add' ? 'Add role' : "Edit role"}
                placement="right"
                onClose={this.closeForm}
                visible={visible}
                width={600}
                maskClosable={false}
                closeIcon={<CloseCircleFilled/>}
            >
                <Spin spinning={loading}>
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        ref={this.formRef}
                        name="control-ref"
                        labelAlign={'left'}
                        onFinish={this.handleClick}
                        onFinishFailed={this.handleFail}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Fill Name' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="permission"
                            label="Permission"
                            rules={[{ required: true, message: 'Fill Permission' }]}
                        >
                            <Select
                                allowClear
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Permission"
                                options={[
                                    {
                                        value: 'admin-user',
                                        label: 'admin-user',
                                    },
                                    {
                                        value: 'admin-role',
                                        label: 'admin-role',
                                    },
                                    {
                                        value: 'admin-permission',
                                        label: 'admin-permission',
                                    },
                                ]}
                            />
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
                                            loading={roleAdd.pending}
                                        >
                                            Add
                                        </Button>
                                        :
                                        <Button
                                            className={'btn-edit'}
                                            icon={<EditFilled/>}
                                            htmlType={'submit'}
                                            loading={roleEdit.pending}
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
        if (prevProps.roleDetail.data !== this.props.roleDetail.data) {
            const { name, permission } = this.props.roleDetail.data;
            this.formRef.current.setFieldsValue({
                name: name,
                permission: permission,
            })
        }
    }

    closeForm = () => {
        this.formRef.current.resetFields();
        this.props.onClose();
    }

    handleClick = value => {
        return this.props.type === 'Add' ?
            this.props.addRole({ data: value, callback: this.callback })
            :
            this.props.editRole({ data: value, id: this.props.roleDetail.data.id, callback: this.callback });
    }

    handleFail = () => pushNotification({ type: 'warning', message: 'Invalid values' });

    callback = () => {
        this.closeForm();
        this.props.getRole();
    }
}

FormRole.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,

    roleDetail: PropTypes.object.isRequired,
    roleAdd: PropTypes.object.isRequired,
    roleEdit: PropTypes.object.isRequired,

    addRole: PropTypes.func.isRequired,
    editRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired,
    getRole: PropTypes.func.isRequired,
}