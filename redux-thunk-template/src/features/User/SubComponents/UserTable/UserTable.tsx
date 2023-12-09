import { Table } from "antd";
import React from "react";

const UserTable: React.FC = () => {
    return (
        <Table
            pagination={{
                size: 'small'
            }}
            style={{ minHeight: 600 }}
            scroll={{ x: 600, y: 1000 }}
            columns={columns}
            dataSource={[]}
            loading={true}
            rowKey={'id'}
        />
    )
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a>{text}</a>,
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        // render: text => text === 'System Admin' ? <Tag color={'green'}>{text}</Tag> : <Tag color={'red'}>{text}</Tag>
    },
    {
        title: 'CreateAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        // render: text => new Date(text).toLocaleString()
    },
    {
        title: 'Image',
        dataIndex: 'avatar',
        key: 'avatar',
        // render: text => {
        //     return (
        //         <Image
        //             width={40}
        //             src={text}
        //         />
        //     )
        // }
    },
    {
        title: 'Token',
        dataIndex: 'token',
        key: 'token',
        // render: text => text,
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        // render: (_, record) => {
        //     return (
        //         <Space size={'small'}>
        //             <Button
        //                 name={'Edit'}
        //                 className={'btn-edit'}
        //                 size={'small'}
        //                 icon={<EditFilled />}
        //                 onClick={openFormEdit}
        //                 value={record.id}
        //             >
        //             </Button>
        //             <ModalDelete
        //                 id={record.id}
        //                 name={record.name}
        //                 getUser={getUser}
        //                 pending={pending}
        //                 deleteUser={deleteUser}
        //             />
        //         </Space>
        //     )
        // }
    }
];

export default UserTable;