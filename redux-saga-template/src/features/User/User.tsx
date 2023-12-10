import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import * as SubComponent from './SubComponents';

const User: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const [type, setType] = useState<string>('Add');

    const showDrawer = () => setOpen(true);

    const onClose = () => setOpen(false);

    const openForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.name === 'Edit') {
        }
        setType(event.currentTarget.name);
        showDrawer();
    }

    return (
        <Content style={{ padding: '0 50px' }}>
            <div style={{ padding: '16px 0' }}>
                <p>User</p>
            </div>
            <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                <Card
                    style={{ width: '100%' }}
                    title="User Table"
                    extra={
                        <Space>
                            <Button
                                type={'primary'}
                                icon={<PlusCircleFilled/>}
                                name={'Add'}
                                onClick={openForm}
                            >
                                Add
                            </Button>
                        </Space>
                    }
                >
                    <SubComponent.UserTable openForm={openForm}/>
                    <SubComponent.UserForm
                        type={type}
                        title={type + ' User'}
                        onClose={onClose}
                        visible={open}
                        width={600}
                    />
                </Card>
            </div>
        </Content>
    )
}

export default User;