import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from "react";
let play ={
    up(current,dim){
        return current-dim
    },
    down(current,dim){
        return current+dim
    },
    right(current,dim){
        return current+1
    },
    left(current,dim){
        return current-1
    }

}
export function game(current,dim,history) {
    let moves =['UP', 'DOWN', 'LEFT', 'RIGHT']

    if (current <= dim){
        moves =moves.filter(element => element!=='UP' )
    }
    if ((current-1)%dim ===0 || current ===1){
        moves =moves.filter(element => element!=='LEFT' )
    }
    if (current%dim === 0){
        moves = moves.filter(element => element!=='RIGHT' )
    }
    if (current > (dim*dim)-dim){
        moves =moves.filter(element => element!=='DOWN' )
    }

    let chooseMove = Math.floor(Math.random()*moves.length)
    let move = moves[chooseMove]



    switch(move){

        case 'UP':
            history.push(<ArrowUpwardIcon/>)
            return play.up(current,dim)

        case 'DOWN':
            history.push(<ArrowDownwardIcon/>)
            return play.down(current,dim)

        case 'LEFT':
            history.push(<ArrowBackIcon/>)
            return play.left(current,dim)

        case 'RIGHT':
            history.push(<ArrowForwardIcon/>)
            return play.right(current,dim)

        default:
            alert(`game ended on field ${current}`)
    }


}