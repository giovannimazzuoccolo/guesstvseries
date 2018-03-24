import { combineReducers } from 'redux';
//import { receiveAnswer, loseLife } from '../actions';

const initialState = {
    "lives": 3,
    "answer" : null
}

function answer(state = initialState, action) {
    switch(action.type) {
        case 'RECEIVE_ANSWER' : {
            return Object.assign({}, ...state, {
                answer : action.answer
            } )
        }

    default :
        return state;
    }
}




function lives(state = { 'lives' : 3 }, action) {
    switch(action.type) {
        case 'LOSE_LIFE' : {
          return Object.assign({}, state, {
              "lives" : action.lives
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