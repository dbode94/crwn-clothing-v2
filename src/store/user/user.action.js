import { USER_ACTION_TYPES } from "./user.types"
import { createAction } from "../../utils/reducers/reducers.utils"

export const setCurrentUser = (user) => createAction(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user))