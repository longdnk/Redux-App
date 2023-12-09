import React from "react";
import { Button, Image, Space, Table, Tag } from "antd";
import PropTypes from 'prop-types';
import { EditFilled } from "@ant-design/icons";
import { ModalDelete } from "../ModalDelete";

class UserTable extends React.Component {
    render = () => {

        const { data, loading, openFormEdit, getUser, pending, deleteUser } = this.props;

        return (
            <Table
                pagination={{
                    size: 'small'
                }}
                style={{ minHeight: 600 }}
                scroll={{ x: 600, y: 1000 }}
                columns={columns(openFormEdit, getUser, pending, deleteUser)}
                dataSource={data}
                loading={loading}
                rowKey={'id'}
            />
        )
    }
}

const columns = (openFormEdit, getUser, pending, deleteUser) => {
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
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
            render: text => text === 'System Admin' ? <Tag color={'green'}>{text}</Tag> : <Tag color={'red'}>{text}</Tag>
        },
        {
            title: 'CreateAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => new Date(text).toLocaleString()
        },
        {
            title: 'Image',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => {
                return (
                    <Image
                        width={40}
                        src={text}
                    />
                )
            }
        },
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'token',
            render: text => text,
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
                            onClick={openFormEdit}
                            value={record.id}
                        >
                        </Button>
                        <ModalDelete
                            id={record.id}
                            name={record.name}
                            getUser={getUser}
                            pending={pending}
                            deleteUser={deleteUser}
                        />
                    </Space>
                )
            }
        }
    ];
}

UserTable.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    openFormEdit: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired,
}

export default UserTable;
