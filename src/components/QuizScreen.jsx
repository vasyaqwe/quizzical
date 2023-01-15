import { useContext } from 'react'
import { Context } from "../Context"

function StartScreen({ quiz }) {
    const { quizData, isQuizRunning, isQuizWon, correctAnswers, backToMenu, playAgain, checkAnswers } = useContext(Context)

    return (
        <div className='quiz-screen' >
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

export default StartScreen