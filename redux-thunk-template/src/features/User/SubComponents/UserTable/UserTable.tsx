import { useAppDispatch, useAppSelector } from "@app/hooks";
import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import { fetchUser } from "../../redux/userSlice";
import type { ColumnsType } from 'antd/es/table';
import { User } from "../../redux/type";
import { EditFilled } from "@ant-design/icons";
import { hash } from "@helper";
import DeleteModal from "@features/DeleteModal/DeleteModal";

type Props = {
    openForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserTable: React.FC<Props> = props => {

    const { userList: { data, loading } } = useAppSelector(state => state.user);

    const { openForm } = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetch = dispatch(fetchUser(1000));
        return () => fetch.abort();
    }, [dispatch]);

    return (
        <>
            <Table
                pagination={{
                    size: 'small'
                }}
                style={{ minHeight: 600 }}
                scroll={{ x: 600, y: 1000 }}
                columns={columns(openForm)}
                dataSource={data}
                loading={loading}
                rowKey={'id'}
            />
        </>
    )
}

const columns = (
    openForm: (event: React.MouseEvent<HTMLButtonElement>) => void,
): ColumnsType<User> => {
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
            render: (_, record) => <a>{record.firstName + ' ' + record.lastName}</a>
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: (_, record) => hash(record.password),
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
                            onClick={openForm}
                            value={record.id}
                        >
                        </Button>
                        <DeleteModal id={record.id}/>
                    </Space>
                )
            }
        }
    ];
}
export default UserTable;