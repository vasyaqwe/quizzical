import './App.css'
import { useState, useContext } from 'react'
import { Context } from './Context'
import Confetti from 'react-confetti'
import Question from './components/Question'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import Spinner from './components/Spinner'
import Error from './components/Error'

function App() {
  const { quizData, isQuizWon, isLoading, failedToFetchData } = useContext(Context)
  console.log(quizData)

  const quiz = quizData
    .map((item, i) => {
      return <Question key={i}
        item={item}
        answers={item.incorrect_answers}
        questionName={`question${i + 1}`}
        answerId={i + 1}
      />
    })


  return (
    <main>
      {isQuizWon && <Confetti />}
      {isLoading ? <Spinner />
        : quizData.length === 0 ?
          failedToFetchData ?
            <Error /> :
            <StartScreen /> :
          <QuizScreen quiz={quiz}
          />
      }
    </main>
  )
}

export default App
