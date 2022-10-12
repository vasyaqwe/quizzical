import { useState, useEffect } from 'react'
import './App.css'
import Confetti from 'react-confetti'
import Question from './components/Question'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import Spinner from './components/Spinner'
import Error from './components/Error'

function App() {
  const [quizData, setQuizData] = useState([])
  const [isQuizRunning, setIsQuizRunning] = useState(false)
  const [isQuizWon, setIsQuizWon] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [failedToFetchData, setFailedToFetchData] = useState(false)
  const [checkedAnswers, setCheckedAnswers] = useState([])
  const correctAnswers = checkedAnswers.filter(answer => answer.nextElementSibling.classList.contains('correct'))

  const difficultyOptions = [
    { label: 'Easy', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'Hard', value: 3 },
  ]
  const categoryOptions = [
    { label: 'Any Category', value: 1 },
    { label: 'General Knowledge', value: 2 },
    { label: 'Entertainment: Books', value: 3 },
    { label: 'Entertainment: Film', value: 4 },
    { label: 'Entertainment: Music', value: 5 },
    { label: 'Entertainment: Musicals & Theatres', value: 6 },
    { label: 'Entertainment: Television', value: 7 },
    { label: 'Entertainment: Video Games', value: 8 },
    { label: 'Entertainment: Board Games', value: 9 },
    { label: 'Science & Nature', value: 10 },
    { label: 'Science: Computers', value: 11 },
    { label: 'Science: Mathematics', value: 12 },
    { label: 'Mythology', value: 13 },
    { label: 'Sports', value: 14 },
    { label: 'Geography', value: 15 },
    { label: 'History', value: 16 },
    { label: 'Politics', value: 17 },
    { label: 'Art', value: 18 },
    { label: 'Celebrities', value: 19 },
    { label: 'Animals', value: 20 },
    { label: 'Vehicles', value: 21 },
    { label: 'Entertainment: Comics', value: 22 },
    { label: 'Science: Gadgets', value: 23 },
    { label: 'Entertainment: Japanese Anime & Manga', value: 24 },
    { label: 'Entertainment: Cartoon & Animations', value: 25 }

  ]
  const [formData, setFormData] = useState({
    questionsNumber: '',
    type: '',
    difficultyValue: difficultyOptions[0],
    categoryValue: categoryOptions[0]
  })
  const { questionsNumber, type, difficultyValue, categoryValue } = formData;

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
  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }

  function handleSelectChange(value, option) {
    setFormData(prevValues => ({ ...prevValues, [value]: option }))
  }

  function checkAnswers() {
    setIsQuizRunning(false)
    quizData.forEach((item, i) => {
      if (item.correct_answer === checkedAnswers[i].value) {
        checkedAnswers[i].nextElementSibling.classList.add('correct')
      } else {
        checkedAnswers[i].nextElementSibling.classList.add('wrong')
      }
    })
    isEverythingAnsweredCorrectly() ?
      setIsQuizWon(true) :
      setIsQuizWon(false)
  }
  function playAgain() {
    setIsQuizWon(false)
    setIsQuizRunning(true)
    setQuizData([])
    setCheckedAnswers([])
    getQuizData(questionsNumber, type, difficultyValue.label.toLocaleLowerCase(), categoryValue.value + 7)
    checkedAnswers.forEach(answer => {
      answer.nextElementSibling.classList.remove('correct')
      answer.nextElementSibling.classList.remove('wrong')
    })
  }

  function isEverythingAnsweredCorrectly() {
    return checkedAnswers.every(answer => answer.nextElementSibling.classList.contains('correct'))
  }
  function backToMenu() {
    setFailedToFetchData(false)
    setIsQuizWon(false)
    setIsQuizRunning(false)
    setQuizData([])
    setCheckedAnswers([])
  }
  const quiz = quizData
    .map((item, i) => {
      return <Question key={i}
        item={item}
        answers={item.incorrect_answers}
        questionName={`question${i + 1}`}
        answerId={i + 1}
        isQuizRunning={isQuizRunning}
        checkedAnswers={checkedAnswers}
        setCheckedAnswers={setCheckedAnswers}
      />
    })
  return (
    <main>
      {isQuizWon && <Confetti />}
      {isLoading && <Spinner />}
      {
        quizData.length === 0 ?
          failedToFetchData ?
            <Error backToMenu={backToMenu} /> :
            <StartScreen isQuizRunning={isQuizRunning}
              setIsQuizRunning={setIsQuizRunning}
              getQuizData={getQuizData}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              difficultyOptions={difficultyOptions}
              categoryOptions={categoryOptions}
            /> :
          <QuizScreen quiz={quiz} quizData={quizData}
            isQuizRunning={isQuizRunning}
            isQuizWon={isQuizWon}
            correctAnswers={correctAnswers}
            backToMenu={backToMenu}
            playAgain={playAgain}
            checkAnswers={checkAnswers}
          />
      }
    </main>
  )
}

export default App
