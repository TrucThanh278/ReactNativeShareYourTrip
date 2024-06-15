const MyUserReducer = (currentState, action) => {
    switch (action.type) {
        case "login":
            return {
                ...currentState,
                ...action.payload
            };
        case "logout":
            return null;
        default:
            return currentState;
    }
}

export default MyUserReducer;