import { useEffect, useState } from "react";

import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";
function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies , setTenzies] = useState(false);
  const [totalRoll , setTotalRoll] = useState(0)

  useEffect(()=>{
    let isAllHeld = dice.every(item => item.isHeld === true);
    let number = 0;
    dice.forEach(item => {
      number = item.isHeld ? item.value : number
    })
    let sameNumber = dice.every(item=> item.value === number);

    if(isAllHeld && sameNumber) {
     
      setTenzies(true)
    }
    
  },[dice])

  function resetGame() {
    setDice(allNewDice())
    setTenzies(false)
    setTotalRoll(0)
  }

  function allNewDice() {
    const randomArray = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;

      randomArray.push({
        value: randomNumber,
        isHeld: false,
        id: i,
      });
    }
    return randomArray;
  }

  function handleReRollBtn() {
    setTotalRoll(r=>r+1)
    setDice((prevDice) =>
      prevDice.map((d) => {
        if (d.isHeld === false) {
          return { ...d, value: Math.floor(Math.random() * 6) + 1 };
        } else return d;
      })
    );
  }

  function holdDice(id) {
    const newDice = dice.map((d) => {
      if (d.id === id) {
        d.isHeld = !d.isHeld;
        return d;
      } else return d;
    });
    setDice(newDice);
  }

  const dicesElements = dice.map((item) => (
    <Die
      key={item.id}
      id={item.id}
      value={item.value}
      isHeld={item.isHeld}
      holdDice={() => holdDice(item.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti/>}
      <div className="text-container">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        {totalRoll > 0 && !tenzies && <h3>Total Rolls : {totalRoll}</h3>}
        {tenzies && <h3>You Won with total of {totalRoll} rolls ! 🎊</h3>}
      </div>
      <div className="dice-container">{dicesElements}</div>
      <button className="roll-dice" onClick={tenzies ? resetGame : handleReRollBtn}>
      {tenzies ? "New Game" : "Roll"}
      </button>
    
    </main>
  );
}

export default App;
