const initialState = {
    roleList: {
        data: [],
        loading: false,
    },
    roleDetail: {
        data: {},
        loading: false,
    },
    roleAdd: {
        pending: false,
    },
    roleEdit: {
        pending: false,
    },
    roleDelete: {
        pending: false,
    }
}

export default initialState;