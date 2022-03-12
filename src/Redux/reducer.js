import { CHANGE_LOGIN, CHANGE_MODE, GET_USERS } from "./actionTypes"

const initialState = {
    users: [],
    login: JSON.parse(localStorage.getItem("login-user")) || false,
    user_details: JSON.parse(localStorage.getItem('user_details')) || "",
    mode: JSON.parse(localStorage.getItem('mode')) || "white",
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_USERS: {
            return { ...state, users: [...state.users, payload] }
        }
        case CHANGE_LOGIN:
            localStorage.setItem("login-user", JSON.stringify(!state.login))

            if (state.login) {
                localStorage.setItem("user_details", JSON.stringify(""))
            }
            else {
                localStorage.setItem("user_details", JSON.stringify(payload))
            }
            return {
                ...state,
                login: JSON.parse(localStorage.getItem("login-user")),
                user_details: JSON.parse(localStorage.getItem('user_details'))
            }

        case CHANGE_MODE: {
            localStorage.setItem("mode", JSON.stringify(payload))
            return {
                ...state,
                mode: JSON.parse(localStorage.getItem('mode'))
            }
        }

        default:
            return state
    }
}
