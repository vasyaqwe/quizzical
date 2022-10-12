import { useState } from 'react'

export default function Question({ setCheckedAnswers, handleChange, answers, item, questionName, answerId, isQuizRunning }) {
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
        setCheckedAnswers(prevAnswers => {
            return [...prevAnswers.filter(answer => answer.name !== event.target.name), event.target].sort((a, b) => a.id - b.id)
        })
    }
    const answersEls = allAnswers.map((answer, i) =>
        <div key={i}
            className="answer">
            <input onChange={handleChange}
                type="radio" name={questionName}
                id={answerId}
                checked={answerToQuestion === answer}
                value={answer} disabled={!isQuizRunning} />
            <label htmlFor="answer">{parseEntities(answer)}</label>
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