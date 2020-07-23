import React from "react";
import {connect} from "react-redux";
import {dimension, gameStatus, move, setStart, showAnswer,} from "../map/gameReducer";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";



const Interface =(props)=>{
    function newGame(){
        props.gameStatusD(true)
        props.showAnswerD(false)
    }
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return(
        <div>

            <FormControlLabel value="end" control={<Radio
                checked={selectedValue === 'a'}
                disabled={props.gameStatus}
                onChange={handleChange}
                onClick={()=>props.toggle(3)}
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
            />} label="3x3" />

            <FormControlLabel value="end" control={<Radio
                checked={selectedValue === 'b'}
                disabled={props.gameStatus}
                onChange={handleChange}
                onClick={()=>props.toggle(5)}
                value="b"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'B' }}
            />} label="5x5" />


            <p>Score {props.score}</p>
            {
            <Button disabled={props.gameStatus} variant="contained" onClick={newGame} color="secondary">
                Start New Game
            </Button>
           }
        </div>
    )
}
const mapStateToProps =(state)=>{
    return{
        gameStatus: state.game.play,
        movePattern: state.game.movePattern,
        score: state.game.score,
        dimension: state.game.dimension,
        start: state.game.start

    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        gameStatusD(data){
            dispatch(gameStatus(data))
        },
        showAnswerD(data){
            dispatch(showAnswer(data))
        },
        toggle(data){
            dispatch(showAnswer(false))
            dispatch(move([]))
            dispatch(dimension(data))
            dispatch(gameStatus(false))
            dispatch(setStart(null))

        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Interface)