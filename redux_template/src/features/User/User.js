import React from "react";
import { Layout, Breadcrumb, Card, Space, Button } from 'antd';
import { connect } from "react-redux";
import { addUser, deleteUser, editUser, getUser, getUserDetail } from "./redux/action";
import PropTypes from 'prop-types';
import * as SubComponent from './SubComponent';
import { PlusCircleFilled } from "@ant-design/icons";
import { getRole } from "../Role/redux/action";

const { Content } = Layout;

class User extends React.Component {

    render = () => {
        const {
            userList: {
                data, loading
            },
            userAdd,
            userEdit,
            userDelete,
            userDetail,
            addUser,
            getUser,
            editUser,
            deleteUser,
            roleList,
        } = this.props;

        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                    <Card
                        style={{ width: '100%' }}
                        title="User Table"
                        extra={
                            <Space>
                                <Button
                                    type={'primary'}
                                    icon={<PlusCircleFilled/>}
                                    onClick={this.openForm}
                                    name={'Add'}
                                >
                                    Add
                                </Button>
                            </Space>
                        }
                    >
                        <SubComponent.UserTable
                            data={data}
                            loading={loading}
                            getUser={getUser}
                            deleteUser={deleteUser}
                            openFormEdit={this.openForm}
                            pending={userDelete.pending}
                        />
                    </Card>
                    <SubComponent.FormUser
                        getUser={getUser}
                        addUser={addUser}
                        userAdd={userAdd}
                        userEdit={userEdit}
                        roleList={roleList}
                        editUser={editUser}
                        type={this.state.type}
                        userDetail={userDetail}
                        closeForm={this.closeForm}
                        visible={this.state.visible}
                    />
                </div>
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
                this.props.getUserDetail(id);
            }
        })
    }

    closeForm = () => this.setVisible(false);

    componentDidMount = () => {
        this.props.getRole();
        this.props.getUser();
    }
}

User.propTypes = {
    userList: PropTypes.object.isRequired,
    userAdd: PropTypes.object.isRequired,
    userEdit: PropTypes.object.isRequired,
    userDelete: PropTypes.object.isRequired,
    userDetail: PropTypes.object.isRequired,

    roleList: PropTypes.object.isRequired,

    getUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    getUserDetail: PropTypes.func.isRequired,
}

const stateToProps = state => {
    return {
        userList: state.user.userList,
        userAdd: state.user.userAdd,
        userEdit: state.user.userEdit,
        userDelete: state.user.userDelete,
        userDetail: state.user.userDetail,
        roleList: state.role.roleList,
    }
}

const dispatchToProps = dispatch => {
    return {
        getUser: () => {
            dispatch(getUser());
        },
        getUserDetail: id => {
            dispatch(getUserDetail(id));
        },
        addUser: payload => {
            dispatch(addUser(payload));
        },
        editUser: payload => {
            dispatch(editUser(payload));
        },
        deleteUser: payload => {
            dispatch(deleteUser(payload));
        },
        getRole: () => {
            dispatch(getRole());
        },
    }
}

export default connect(stateToProps, dispatchToProps)(User);