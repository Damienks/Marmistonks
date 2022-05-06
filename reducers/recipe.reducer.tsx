import { GET_RECIPES, GET_RECIPE_BY_ID, GET_RECIPE_COMMENTS } from "../actions/recipe.actions"

const initialState:object = {}

export default function recipeReducer(state = initialState, action:any){
    switch(action.type){
        case GET_RECIPES:
            return action.payload
        case GET_RECIPE_BY_ID:
            return action.payload
        case GET_RECIPE_COMMENTS:
                return action.payload
        default :
            return state;
    }
}