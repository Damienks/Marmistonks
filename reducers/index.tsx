import { combineReducers } from "redux";
import userReducer from '../reducers/user.reducer'
import recipeReducer from '../reducers/recipe.reducer'

export default combineReducers({
    userReducer,
    recipeReducer
});