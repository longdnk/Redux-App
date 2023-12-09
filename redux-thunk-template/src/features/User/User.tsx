import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import * as SubComponent from './SubComponents';

const User: React.FC = () => {
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
                                icon={<PlusCircleFilled />}
                                name={'Add'}
                            >
                                Add
                            </Button>
                        </Space>
                    }
                >
                    <SubComponent.UserTable/>
                </Card>
            </div>
        </Content>
    )
}

export default User;