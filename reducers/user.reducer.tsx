import { GET_USER, ADD_USER, UPDATE_USERNAME, UPDATE_USEREMAIL, UPDATE_USEREMAIL_ERROR, UPDATE_USERPASSWORD, UPDATE_USERPASSWORD_ERROR, CLEAR_USER_MESSAGES } from "../actions/user.actions"

interface IState {
    alertMessages: object;
}

const initialState:IState = {
    alertMessages: {}
}

export default function userReducer(state = initialState, action:any){
    switch(action.type){
        case ADD_USER:
        case GET_USER:
            return action.payload
        case UPDATE_USERNAME:
            return {
                ...state, 
                displayName : action.payload,
                alertMessages : {...state.alertMessages, successUpdateUsername: "Le pseudo a été mis à jour." }
                
            }
        case UPDATE_USEREMAIL:
            return {
                ...state, 
                email : action.payload,
                alertMessages : {...state.alertMessages, successUpdateEmail: "L'adresse e-mail a été mise à jour." }
            }
        case UPDATE_USERPASSWORD:
            return {
                ...state,
                alertMessages : {...state.alertMessages, successUpdatePassword: action.payload }
            }
        // Errors
        case UPDATE_USEREMAIL_ERROR:
            return {
                ...state,
                alertMessages : {...state.alertMessages, errorUpdateEmail : action.payload }
            }
        case UPDATE_USERPASSWORD_ERROR:
            return {
                ...state,
                alertMessages : {...state.alertMessages, errorUpdatePassword : action.payload }
            }
        case CLEAR_USER_MESSAGES:
            return {
                ...state,
                alertMessages: {}
            }
        default :
            return state;
    }
}