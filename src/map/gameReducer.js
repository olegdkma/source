const initial = {
    play:false,
    movePattern: [],
    score: 0,
    showAnswer: false,
    dimension: 3,
    start: null,
    choose:false

}


const gameRed = (state=initial, action)=>{
    switch (action.type) {
        case 'GAME-STATUS':
            return {
                ...state,
                play: action.payload
            }
            case 'CHOOSE':
            return {
                ...state,
                choose: action.payload
            }
        case 'MOVE':
            return {
                ...state,
                movePattern: action.payload
            }
        case 'SCORE':
            return {
                ...state,
                score: state.score +action.payload
            }

            case 'SHOW-ANSWER':
            return {
                ...state,
                showAnswer: action.payload
            }
            case 'SET-DIMENSION':
            return {
                ...state,
                dimension: action.payload
            }
            case 'SET-START':
            return {
                ...state,
                start: action.payload
            }
        default:
            return state

    }
}

export const gameStatus =(data)=>{
    return{
        type: 'GAME-STATUS',
        payload: data,
    }
}
export const move =(data)=>{
    return{
        type: 'MOVE',
        payload: data,
    }
}

export const score =(much)=>{
    return{
        type: 'SCORE',
        payload: much,
    }
}

export const showAnswer =(data)=>{
    return{
        type: 'SHOW-ANSWER',
        payload: data,
    }
}
export const dimension =(data)=>{
    return{
        type: 'SET-DIMENSION',
        payload: data,
    }
}
export const choose =(data)=>{
    return{
        type: 'CHOOSE',
        payload: data,
    }
}
export const setStart =(data)=>{
    return{
        type: 'SET-START',
        payload: data,
    }
}
export default gameRed