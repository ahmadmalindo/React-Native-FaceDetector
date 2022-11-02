import * as ACTION_TYPES from "@constants/ActionTypes";

export const StoreImage          = data                => ({ type: ACTION_TYPES.IMAGE_DATA, img: data })
export const StoreNominal        = data                => ({ type: ACTION_TYPES.STORE_NOMINAL, nominal: data })
