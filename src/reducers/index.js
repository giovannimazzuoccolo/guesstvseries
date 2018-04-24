import { combineReducers } from 'redux';

// AS REFERENCE:
/* initialState = {
    "lives": 3,
    "nextQuestion" : false
} */

function answer(state = { state: false }, action) {
  console.log('isstupd', state);
  switch (action.type) {
    case 'CORRECT_ANSWER': {
      return action.nextQuestion;
    }

    case 'NEW_ANSWER': {
      return action.nextQuestion;
    }

    default:
      return state;
  }
}


function lives(state = { state: 3 }, action) {
  switch (action.type) {
    case 'LOSE_LIFE': {
      return action.lives;
    }
    default:
      return state;
  }
}


export default combineReducers({
  answer,
  lives,
});
