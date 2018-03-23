import { combineReducers } from 'redux';
import { receiveAnswer, loseLife } from '../actions';

const initialState = {
    "lives": 3,
    "answer" : null//,
    //"level" : 1
}

function answer(state = initialState, action) {
    switch(action.type) {
        case 'RECEIVE_ANSWER' : {
            return Object.assign({}, state, {
                answer : action.answer
            } )
        }

    default :
        return state;
    }
}




function lives(state = initialState, action) {
    switch(action.type) {
        case 'LOSE_LIFE' : {
            return Object.assign({}, state, {
                lives : 2
            })
        }
        default : 
            return state
    }

} 

export default combineReducers({
    answer,
    lives
});