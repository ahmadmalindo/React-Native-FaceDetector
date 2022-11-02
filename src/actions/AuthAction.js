import * as ACTION_TYPES from "@constants/ActionTypes";

export const SignIn             = data                => ({ type: ACTION_TYPES.STORE_LOGIN_DATA, login: data })
export const LoggedOut          = data                => ({ type: ACTION_TYPES.LOGGED_OUT, data: data })
