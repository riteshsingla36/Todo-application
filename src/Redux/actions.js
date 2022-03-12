import { CHANGE_MODE, GET_USERS } from "./actionTypes"

import { CHANGE_LOGIN } from "./actionTypes"

export const get_users = (payload) => ({
    type: GET_USERS,
    payload: payload
})

export const change_login = (payload) => ({
    type: CHANGE_LOGIN,
    payload: payload
})

export const change_mode = (payload) => ({
    type: CHANGE_MODE,
    payload: payload
})