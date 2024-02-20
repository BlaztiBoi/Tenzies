/* eslint-disable react/prop-types */


const Die = (props) => {


    return (
        <div 
        className="die-face" 
        style={props.isHeld ? {backgroundColor: "#59E391"} : {}} 
        onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

export default Die