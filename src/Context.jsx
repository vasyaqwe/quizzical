import React from "react"
import { useState } from "react"
import { categoryOptions, difficultyOptions } from './utils'

const Context = React.createContext()

function ContextProvider({ children }) {
    const [quizData, setQuizData] = useState([])
    const [isQuizRunning, setIsQuizRunning] = useState(false)
    const [isQuizWon, setIsQuizWon] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [failedToFetchData, setFailedToFetchData] = useState(false)
    const [checkedAnswers, setCheckedAnswers] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])

    const [formData, setFormData] = useState({
        questionsNumber: '',
        type: 'multiple',
        difficultyValue: difficultyOptions[0],
        categoryValue: categoryOptions[0]
    })
    const { questionsNumber, type, difficultyValue, categoryValue } = formData

    function handleInputChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }

    function handleSelectChange(value, option) {
        setFormData(prevValues => ({ ...prevValues, [value]: option }))
    }
    function getQuizData(questionsNumber, type, difficulty, category) {
        let apiLink
        if (category >= 9) {
            apiLink = `https://opentdb.com/api.php?amount=${questionsNumber}&category=${category}&difficulty=${difficulty}&type=${type}`
        } else { //any category
            apiLink = `https://opentdb.com/api.php?amount=${questionsNumber}&difficulty=${difficulty}&type=${type}`
        }
        setIsLoading(true)
        fetch(apiLink)
            .then(res => res.json())
            .then(data => {
                if (data.results.length > 0) {
                    setFailedToFetchData(false)
                    setQuizData(data.results)
                } else {
                    setFailedToFetchData(true)
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    function areAllAnswersCorrect() {
        return quizData.length === correctAnswers.length && correctAnswers.length > 0
    }
    function checkAnswers() {
        setIsQuizRunning(false)
        areAllAnswersCorrect() ?
            setIsQuizWon(true) :
            setIsQuizWon(false)
    }
    function playAgain() {
        setIsQuizWon(false)
        setIsQuizRunning(true)
        setQuizData([])
        setCheckedAnswers([])
        setCorrectAnswers([])
        getQuizData(questionsNumber, type, difficultyValue.label.toLocaleLowerCase(), categoryValue.value + 7)
    }
    function startQuiz() {
        setIsQuizRunning(true)
    }
    function backToMenu() {
        setFailedToFetchData(false)
        setIsQuizWon(false)
        setIsQuizRunning(false)
        setQuizData([])
        setCheckedAnswers([])
    }
    function handleAnswerChange(e) {
        setCheckedAnswers(prevAnswers => {
            return [...prevAnswers.filter(answer => answer.name !== e.target.name), e.target].sort((a, b) => a.id - b.id)
        })
        if (quizData.some(i => i.correct_answer === e.target.value)) {
            setCorrectAnswers(prev => [...prev, e.target.value])
        }
    }
    console.log(correctAnswers)


    return (
        <Context.Provider value={{
            quizData, isQuizRunning,
            isQuizWon, isLoading,
            failedToFetchData,
            checkedAnswers,
            correctAnswers,
            getQuizData,
            checkAnswers,
            playAgain,
            backToMenu,
            startQuiz,
            handleAnswerChange,
            formData,
            handleInputChange,
            handleSelectChange
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }