import { GET_USER, ADD_USER } from "../actions/user.actions"

const initialState:object = {}

export default function userReducer(state = initialState, action:any){
    switch(action.type){
        case ADD_USER:
        case GET_USER:
            return action.payload
        default :
            return state;
    }
}