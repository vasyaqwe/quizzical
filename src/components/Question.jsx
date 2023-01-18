import { useState, useContext, useId } from 'react'
import { Context } from "../Context"
import { shuffleArray, parseEntities } from '../utils'

export default function Question({ incorrectAnswers, item }) {
    const { handleAnswerChange, isQuizRunning, quizData, checkedAnswers } = useContext(Context)

    const [allAnswers, setAllAnswers] = useState(
        shuffleArray([...incorrectAnswers, item.correct_answer])
    )

    function answerClassName(value) {
        if (!isQuizRunning && quizData.some(i => i.correct_answer === value) &&
            checkedAnswers.some(i => i.value === value)) {
            return 'correct'
        } else if (!isQuizRunning && !quizData.some(i => i.correct_answer === value) &&
            checkedAnswers.some(i => i.value === value)) {
            return 'wrong'
        }
        return 'unanswered'
    }

    const customId = useId()
    const answersEls = allAnswers.map((answer, i) => {
        return <div key={i}
            className="answer">
            <input onChange={handleAnswerChange}
                type="radio" name={`question${customId}`}
                id={customId}
                checked={checkedAnswers.some(item => item.value === answer)}
                value={answer} disabled={!isQuizRunning} />
            <label className={answerClassName(answer)} htmlFor="answer">{parseEntities(answer)}</label>
        </div>
    })

    return (
        <div className="question-wrapper">
            <p className='question'>{parseEntities(item.question)}</p>
            <div className="answers-wrapper">
                {answersEls}
            </div>
        </div>
    )
}