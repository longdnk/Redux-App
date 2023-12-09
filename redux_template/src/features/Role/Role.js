import React from "react";
import { Breadcrumb, Button, Card, Layout, Space } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import * as SubComponent from './SubComponent';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addRole, deleteRole, editRole, getRole, getRoleDetail } from "./redux/action";

const { Content } = Layout;

class Role extends React.Component {
    render = () => {

        const {
            addRole,
            editRole,
            deleteRole,
            getRoleDetail,
            getRole,
            roleAdd,
            roleEdit,
            roleDelete,
            roleDetail,
            roleList: {
                data,
                loading,
            },
        } = this.props;
        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Role</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                    <Card
                        style={{ width: '100%' }}
                        title="Role Table"
                        extra={
                            <Space>
                                <Button
                                    type={'primary'}
                                    icon={<PlusCircleFilled/>}
                                    name={'Add'}
                                    onClick={this.openForm}
                                >
                                    Add
                                </Button>
                            </Space>
                        }
                    >
                        <SubComponent.RoleTable data={data} loading={loading} openFormEdit={this.openForm}/>
                    </Card>
                </div>
                <SubComponent.FormRole
                    roleAdd={roleAdd}
                    addRole={addRole}
                    roleEdit={roleEdit}
                    editRole={editRole}
                    getRole={getRole}
                    type={this.state.type}
                    deleteRole={deleteRole}
                    roleDetail={roleDetail}
                    onClose={this.closeForm}
                    visible={this.state.visible}
                />
            </Content>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'Add',
        }
    }

    setVisible = visible => {
        this.setState({
            ...this.state,
            visible: visible,
        })
    }

    openForm = event => {
        const id = event.currentTarget.value;
        this.setState({
            ...this.state,
            type: event.currentTarget.name,
        });
        setTimeout(() => {
            this.setVisible(true);
            if (this.state.type === "Edit") {
                this.props.getRoleDetail(id);
            }
        })
    }

    closeForm = () => this.setVisible(false);

    componentDidMount = () => {
        this.props.getRole();
    }
}

Role.propTypes = {
    roleList: PropTypes.object.isRequired,
    roleDetail: PropTypes.object.isRequired,
    roleAdd: PropTypes.object.isRequired,
    roleEdit: PropTypes.object.isRequired,
    roleDelete: PropTypes.object.isRequired,

    getRole: PropTypes.func.isRequired,
    getRoleDetail: PropTypes.func.isRequired,
    addRole: PropTypes.func.isRequired,
    editRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired,
}

const stateToProps = state => {
    return {
        roleList: state.role.roleList,
        roleDetail: state.role.roleDetail,
        roleAdd: state.role.roleAdd,
        roleEdit: state.role.roleEdit,
        roleDelete: state.role.roleDelete,
    }
}
const dispatchToProps = dispatch => {
    return {
        getRole: () => {
            dispatch(getRole());
        },
        getRoleDetail: id => {
            dispatch(getRoleDetail(id));
        },
        addRole: roleData => {
            dispatch(addRole(roleData));
        },
        editRole: roleData => {
            dispatch(editRole(roleData));
        },
        deleteRole: roleData => {
            dispatch(deleteRole(roleData));
        },
    }
}

export default connect(stateToProps, dispatchToProps)(Role);