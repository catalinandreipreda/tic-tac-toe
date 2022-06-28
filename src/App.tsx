import React, { useState, useEffect } from 'react'
import Square from './Cell'

type Scores = {
  [key: string] : number
}

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""]
const INITIAL_SCORES: Scores = {X:0, O:0}
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]



function App() {
  const handleCellClick = (event:any) =>{
    /**
     * Updates the gameState when a cell is clicked.
     * This allows the game to render a new X or O when a cell is clicked
     */

    // Getting the index of the clicked cell
    const cellIndex = Number(event.currentTarget.getAttribute('data-cell-index'))
    // Getting the current value of that cell
    const currentValue = gameState[cellIndex]
    // Exit the method if the cell already has a value
    if(currentValue){
      return
    }
    // Updating the state (without mutating the current one)
    const newValues = [...gameState]
    newValues[cellIndex] = currentPlayer
    setGameState(newValues)
    
  }

  const changePlayer = () => {
    /**
     * Switching the current player
     */
     setCurrentPlayer(currentPlayer ==='X' ? 'O' : 'X')
  }

  const checkForWinner = () =>{
    /**
     * Checks if the currentPlayer won after the last move.
     */
    let roundWon = false

    // Checking each possible winning combination
    WIN_COMBOS.map(winCombo => {
      // For every line in WIN_COMBOS, construct a string with 
      // the values in the gameState
      const currentLine = gameState[winCombo[0]] + gameState[winCombo[1]] + gameState[winCombo[2]]

      // Check for winning condition
      if( currentLine === 'XXX' || currentLine === 'OOO')
        roundWon = true
    })

    // Handle Win scenarios
    if(roundWon){
      handleWin()
      return
    }
    // Handle Draw scenarios
    if(!gameState.includes("")){
      handleDraw()
      return
    }

    changePlayer()

  
  }

  const handleWin = () =>{
    /** Displaying message to winner and reseting the game */
    alert(`Player ${currentPlayer} won! Congratulations!`)

    // Updating the score
    const newPlayerScore = scores[currentPlayer] + 1
    const newScores = {...scores}
    newScores[currentPlayer] = newPlayerScore
    setScores(newScores) // Updating the score state
    localStorage.setItem("scores", JSON.stringify(newScores)) // Saving scores in local storage
    // Reseting the game
    setGameState(INITIAL_GAME_STATE)
  }
  const handleDraw = () =>{
    /** Displaying draw message and reseting the game */
    alert("It's a draw! Well played everyone")
    setGameState(INITIAL_GAME_STATE)
  }
  // State
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [scores, setScores] = useState(INITIAL_SCORES)

  // Side effects
  useEffect(()=>{
    /**
     * 
     */
    checkForWinner()
  }, [gameState])

  useEffect(()=>{
    const storedScores = localStorage.getItem("scores")
    if(storedScores){
      setScores(JSON.parse(storedScores))
    }
    

  }, [])

  return (
    <div className='h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500'>
      <h1 className='text-center text-5xl mb-4 font-display text-white'>Tic Tac Toe</h1>
      
      <div className='grid grid-cols-3 gap-3 mx-auto w-96'>
        {gameState.map((player, index) => (
           <Square 
           key={index} 
           index = {index}
           player={player}
           onClick= {handleCellClick}
            />
           
        ))}
      </div>
      <div className='mx-auto flex flex-col text-center w-96 text-2xl text-serif text-white'>
        <p className='mt-2'>Next Player: <span>{currentPlayer}</span></p>
        <p className='mt-2'>Player X score: <span>{scores.X}</span></p>
        <p className='mt-2'>Player O score: <span>{scores.O}</span></p>

      </div>
    </div>
  )
}

export default App
