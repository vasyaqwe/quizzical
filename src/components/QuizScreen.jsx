import { useState } from "React"
import Select from "./Select"

export default function StartScreen({ quiz, quizData, isQuizRunning, isQuizWon, correctAnswers, backToMenu, playAgain, checkAnswers }) {

    return (
        <div className='quiz-screen'>
            <div className="quiz-content">
                {quiz}
            </div>
            <div className="result">
                {!isQuizRunning && <p>You scored {correctAnswers.length}/{quizData.length} correct answers{isQuizWon && '!'}</p>}
                <button onClick={() => !isQuizRunning ? playAgain() : checkAnswers()} className='btn btn-check'>
                    {!isQuizRunning ? 'Play again' : 'Check Answers'}
                </button>
            </div>
            <button onClick={backToMenu} className='btn btn-back'>Menu</button>
        </div>
    )
}

