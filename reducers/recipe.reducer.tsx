import { GET_RECIPES } from "../actions/recipe.actions"

const initialState:object = {}

export default function recipeReducer(state = initialState, action:any){
    switch(action.type){
        case GET_RECIPES:
            return action.payload
        default :
            return state;
    }
}