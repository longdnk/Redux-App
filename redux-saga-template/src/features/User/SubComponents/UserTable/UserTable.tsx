import { Button, Image, Space, Table, Tag } from "antd";
import React, { useEffect } from "react";
import type { ColumnsType } from 'antd/es/table';
import { EditFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { userRequest } from "@features/User/redux/actions";
import { User } from "@features/User/redux/type";
import { hash } from "@helper";
import DeleteModal from "@features/User/SubComponents/DeleteModal/DeleteModal";

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
            render: (_, record) => <a>{record.name}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: (_, record) => hash(record.password),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: text => text === 'admin' ? <Tag color={'green'}>{text}</Tag> : <Tag color={'blue'}>{text}</Tag>,
            sorter: (a, b) => a.role.localeCompare(b.role),
            filters: [
                {
                    text: 'admin',
                    value: 'admin',
                },
                {
                    text: 'customer',
                    value: 'customer',
                }
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => <Image src={text} style={{ width: 64, height: 64 }}/>
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