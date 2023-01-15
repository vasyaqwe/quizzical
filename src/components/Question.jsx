import { useState, useContext } from 'react'
import { Context } from "../Context"

export default function Question({ answers, item, questionName, answerId }) {
    const { handleAnswerChange, isQuizRunning, quizData, checkedAnswers } = useContext(Context)

    const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText
    const shuffleArray = arr => {
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr
    }

    const [answerToQuestion, setAnswerToQuestion] = useState([])
    const [allAnswers, setAllAnswers] = useState(
        shuffleArray([...answers, item.correct_answer])
    )
    function handleChange(event) {
        setAnswerToQuestion(event.target.value)
        handleAnswerChange(event)
    }
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
    const answersEls = allAnswers.map((answer, i) =>
        <div key={i}
            className="answer">
            <input onChange={handleChange}
                type="radio" name={questionName}
                id={answerId}
                checked={answerToQuestion === answer}
                value={answer} disabled={!isQuizRunning} />
            <label className={answerClassName(answer)} htmlFor="answer">{parseEntities(answer)}</label>
        </div >)

    return (
        <div className="question-wrapper">
            <p className='question'>{parseEntities(item.question)}</p>
            <div className="answers-wrapper">
                {answersEls}
            </div>
        </div>
    )
}