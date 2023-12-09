import React from "react";
import { Button, Space, Table, Tag } from "antd";
import PropTypes from "prop-types";
import { EditFilled } from "@ant-design/icons";

export default class RoleTable extends React.Component {
    render = () => {

        const { data, loading, openFormEdit } = this.props;

        return (
            <Table
                pagination={{
                    size: 'small'
                }}
                style={{ minHeight: 600 }}
                scroll={{ x: 600, y: 1000 }}
                columns={columns(openFormEdit)}
                dataSource={data}
                loading={loading}
                rowKey={'id'}
            />
        )
    }
}

RoleTable.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    openFormEdit: PropTypes.func.isRequired,
}

const columns = (openFormEdit) => {
   return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => new Date(text).toLocaleString()
        },
        {
            title: 'Permission',
            dataIndex: 'permission',
            key: 'permission',
            render: (_, record) => <Tag color={record.permission.length ? 'green' : 'red'}>{record.permission.length} permission</Tag>
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
                            value={record.id}
                            onClick={openFormEdit}
                        >
                        </Button>
                    </Space>
                )
            }
        }
    ]
}