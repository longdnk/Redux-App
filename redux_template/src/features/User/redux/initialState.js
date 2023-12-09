const initialState = {
    userList: {
        data: [],
        loading: false,
    },
    userDetail: {
        data: {},
        loading: false,
    },
    userAdd: {
        pending: false,
    },
    userEdit: {
        pending: false,
    },
    userDelete: {
        pending: false,
    }
}

export default initialState;