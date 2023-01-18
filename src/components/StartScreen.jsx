import Select from "./Select"
import { useContext } from 'react'
import { Context } from "../Context"
import { categoryOptions, difficultyOptions } from '../utils'

export default function StartScreen() {
    const { getQuizData, startQuiz, formData, handleInputChange, handleSelectChange } = useContext(Context)
    const { questionsNumber, type, difficultyValue, categoryValue } = formData

    function handleSubmit(e) {
        e.preventDefault()
        const inputs = [...document.querySelectorAll('input')]
        if (inputs.every(input => input.checkValidity())) {
            startQuiz()
            getQuizData(questionsNumber, type, difficultyValue.label.toLocaleLowerCase(), categoryValue.value + 7)
        }
    }
    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Test your knowledge!</p>
            <form onSubmit={(e) => handleSubmit(e)} className="form-container">
                <div className="inputs-container">
                    <div className="radios-container">
                        <div className="type-container">
                            <input required className="type-radio" onChange={handleInputChange} checked={type === 'multiple'} type="radio" value="multiple" id="multiple" name="type" />
                            <label htmlFor="multiple">Multiple choice</label>
                        </div>
                        <div className="type-container">
                            <input required className="type-radio" onChange={handleInputChange} checked={type === 'boolean'} type="radio" value="boolean" id="boolean" name="type" />
                            <label htmlFor="boolean">True/False</label>
                        </div>
                    </div>
                    <input required onChange={handleInputChange} max={50} min={1} placeholder="Number of questions" type="number" value={questionsNumber} name="questionsNumber" />
                </div>
                <div className="selects-container">
                    <Select onChange={option => handleSelectChange('difficultyValue', option)} options={difficultyOptions} value={difficultyValue} className={"select select-difficulty"} />
                    <Select onChange={option => handleSelectChange('categoryValue', option)} options={categoryOptions} value={categoryValue} className={"select select-category"} />
                </div>
                <button className='btn btn-start'>Start quiz</button>
            </form>
        </div>
    )
}