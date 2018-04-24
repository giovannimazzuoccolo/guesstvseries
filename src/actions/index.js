const CORRECT_ANSWER = 'CORRECT_ANSWER';
const LOSE_LIFE = 'LOSE_LIFE';
const NEW_ANSWER = 'NEW_ANSWER';

// action creators

export function newAnswer() {
  return {
    type: NEW_ANSWER,
    nextQuestion: false,
  };
}

export function receiveAnswer() {
  return {
    type: CORRECT_ANSWER,
    nextQuestion: true,
  };
}

export function loseLife(livesTot) {
  return {
    type: LOSE_LIFE,
    lives: livesTot - 1,
  };
}

