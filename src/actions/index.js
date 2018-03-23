const RECEIVE_ANSWER = 'RECEIVE_ANSWER';
const LOSE_LIFE = 'LOSE_LIFE';


// action creators

export function receiveAnswer (answer_id)  {
    return { 
        type : RECEIVE_ANSWER,
        answer_id : answer_id
    }
}

export function loseLife() {
    return {
        type : LOSE_LIFE,
        lives : 2
    }
}

