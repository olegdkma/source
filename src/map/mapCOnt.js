import React, {useEffect, useRef, useState} from "react";
import  s from './map.module.css';
import classNames from 'classnames'
import {connect} from "react-redux";
import {choose, gameStatus, move, score, setStart, showAnswer,} from "./gameReducer";
import {game} from "../gameEngine/gameApi";


const Map =(props) =>{
    let Dimension = props.dimension
    let arr = Array(Dimension*Dimension).fill('')
    let history =[];

    let [answer, answerF] = useState(null)


    useEffect(()=>{
        if(!props.gameStatus) return
        let start = Math.floor((Math.random()*8)+1);
        props.setStartD(start)
        let answer=start

        for(let i=0; i <=9; ++i){
            answer=game(answer, Dimension,history)
        }
        answerF(answer)

        props.startMove(history)
    },[props.gameStatus])

    let btnGroupClasses = classNames(
        {
            [s.big9]: props.dimension===3,
            [s.big25]: props.dimension===5
        }
    );

    return(
        <div >
            <div className={btnGroupClasses}>
                {arr.map((m,ind)=><MapMini {...props}
                                           id={ind+1}
                                           start={props.start}
                                           answer={answer}
                                           key={ind}
                />)}

            </div>
            <Path game={props.gameStatus}
                  history={props.movePattern}
                  start={props.start}
                  answer={answer}
                  chooseD={props.chooseD}/>
        </div>
    )
}




const MapMini =(props)=>{

    function answer() {

        props.showAnswerD(true)

        if(props.id===props.answer){
            console.log('cool')
            props.scored(100)
        }
        else{
            console.log('wrong')
            props.scored(-100)
        }
        props.chooseD(false)
        props.gameStatusD(false)

    }

    let btnGroupClasses = classNames(
        s.block,
        {
            [s.stblock]: props.id===props.start,
            [s.answer]: props.showAnswer && props.id===props.answer
        }
    );

    return(
        <button disabled={!props.choose} onClick={()=>{answer()}} className={btnGroupClasses} >
            {props.id===props.start ? 'Start' :props.id}
        </button>
    )
}

const Path = (props)=>{

    let [state, stateF] =useState([])

    const countRef = useRef(state);
    countRef.current = state;


    useEffect(()=>{
        countRef.current=[]
        stateF([]);
        if(props.start === null) return
        let i=0;
        (function loop(){

            stateF([...countRef.current,props.history[i]]);
            if (++i < props.history.length) {
                setTimeout(loop, 500);
            }
            else{

                props.chooseD(true)
            }
        })();

    },[props.start])

    return(
        <div className={s.path}>

            {  state.map((el,id) =>(<div key={id}>{state[id]}</div>))}
        </div>
    )
}




const mapStateToProps =(state)=>{
    return{
        gameStatus: state.game.play,
        movePattern: state.game.movePattern,
        score: state.game.score,
        showAnswer:state.game.showAnswer,
        dimension: state.game.dimension,
        start: state.game.start,
        choose: state.game.choose
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        gameStatusD(data){
            dispatch(gameStatus(data))
        },
        chooseD(data){
            dispatch(choose(data))
        },
        startMove(data){
            dispatch(move(data))
        },
        scored(data){
            dispatch(score(data))
        },

        showAnswerD(data){
            dispatch(showAnswer(data))
        },
        setStartD(data){
            dispatch(setStart(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Map)