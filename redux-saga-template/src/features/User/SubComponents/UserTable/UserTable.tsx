import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import type { ColumnsType } from 'antd/es/table';
import { EditFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { userRequest } from "@features/User/redux/actions";

type Props = {
    openForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserTable: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const { list: { data, loading } } = useAppSelector(state => state.user);

    const { openForm } = props;

    useEffect(() => {
        dispatch(userRequest());
    }, [dispatch]);

    return (
        <>
            <Table
                pagination={{
                    size: 'small'
                }}
                style={{ minHeight: 600 }}
                scroll={{ x: 600, y: 1000 }}
                columns={columns()}
                dataSource={data}
                loading={loading}
                rowKey={'id'}
            />
        </>
    )
}

const columns = (): ColumnsType<any> => {
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <a>{record.username}</a>
        },
        {
            title: 'Full name',
            dataIndex: 'fullname',
            key: 'fullname',
            // render: (_, record) => <a>{record.firstName + ' ' + record.lastName}</a>
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            // render: (_, record) => hash(record.password),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            // render: text => text === 'System Admin' ? <Tag color={'green'}>{text}</Tag> : <Tag color={'red'}>{text}</Tag>
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            // render: text => new Date(text).toLocaleString()
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size={'small'}>
                        <Button
                            name={'Edit'}
                            className={'btn-edit'}
                            size={'small'}
                            icon={<EditFilled/>}
                            // onClick={openForm}
                            value={record.id}
                        >
                        </Button>
                    </Space>
                )
            }
        }
    ];
}
export default UserTable;