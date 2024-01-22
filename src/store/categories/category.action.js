import { createAction } from "../../utils/reducers/reducers.utils"
import { CATEGORIES_ACTION_TYPE } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.";


export const fetchCategoriesStart = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)

export const fetchCategoriesSucces = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCES, categoriesArray)

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => async (dispatch) =>{

    dispatch(fetchCategoriesStart)
        
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');       
        dispatch(fetchCategoriesSucces(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
    }
}