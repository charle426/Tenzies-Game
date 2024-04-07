import { useEffect, useState } from "react";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [score, setScore] = useState(0);
  const [numRoll, setNumRoll] = useState(0);
  const [newScore, setNewScore] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("SCORE"))
    {
      setScore(localStorage.getItem("SCORE"));
    }
  }, [tenzies]);
  useEffect(() => {
    const tenzieHeld = dice.every((die) => die.held);
    const tenzieFirstNum = dice[0].value;
    const tenzieValue = dice.every((die) => die.value === tenzieFirstNum);

    if (tenzieHeld && tenzieValue) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);
  
  useEffect(() => {
    if (tenzies && score > numRoll) {
      localStorage.setItem("SCORE", numRoll);
      setNewScore(true);
      setScore(localStorage.getItem("SCORE"));
    } else if (tenzies && score == 0) {
      localStorage.setItem("SCORE", numRoll);
      setNewScore(true);
      setScore(localStorage.getItem("SCORE"));
    } else {
      setNewScore(false);
    }
  }, [tenzies])
  

   

  function roll() {
    return { value: Math.ceil(Math.random() * 6), held: false };
  }
  function allNewDice() {
    const allDiceArr = [];
    for (let i = 0; i < 10; i++) {
      allDiceArr.push(roll());
    }

    return allDiceArr;
  }

  function HoldDice(id) {
    setDice((oldDice) =>
      oldDice.map((die, index) => {
        return index === id ? { ...die, held: !die.held } : die;
      })
    );
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.held ? die : roll();
        })
      );
      setNumRoll((prev) => prev + 1);
    } else {
      setDice(allNewDice());
      setNumRoll(0);
    }
  }

  const diceArr = dice.map((item, index) => (
    <Die
      key={index}
      value={item.value}
      held={item.held}
      toggleHeld={() => HoldDice(index)}
    />
  ));

  return (
    <section>
      <div
        className={
          newScore
            ? "visible translate-y-0 duration-500"
            : "invisible translate-y-4 duration-500"
        }
      >
        <p className="text-blue-600">New High Score 🥳 : {score}</p>
      </div>
      <main className="rounded-lg bg-[#f5f5f5] flex justify-center p-10 flex-col items-center">
        <div className="flex justify-center mb-6 flex-col text-center gap-3 items-center">
          <h1 className="text-[3.5rem]">Tenzies Game</h1>
          <p>
            Roll The Dice and try to get them to be all the same with the
            smallest number rolls possible and you WIN🥳✨
          </p>
        </div>
        <div className="grid grid-cols-5 mb-3 grid-rows-2 gap-2">{diceArr}</div>
        <button
          className="bg-blue-700 rounded-md mb-2 py-2 px-4 text-[1.6rem] focus:ring focus:ring-indigo-800"
          onClick={rollDice}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="flex items-center justify-center gap-4 mt-4">
          <p>rolls: {numRoll}</p>
          <p>best score : {score}</p>
        </div>
      </main>
    </section>
  );
}

export default App;
