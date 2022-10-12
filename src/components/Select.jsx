import { useEffect } from "react"
import { useState } from "react"

export default function Select({ value, onChange, options, className }) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(null)

    const handleKeyboardNavigation = e => {
        switch (e.code) {
            case "Enter":
            case "Space":
                setIsOpen(prev => !prev)
                if (isOpen) selectOption(options[highlightedIndex])
                break
            case "ArrowUp":
            case "ArrowDown": {
                if (!isOpen) {
                    setIsOpen(true)
                    break
                }
                const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                if (newValue >= 0 && newValue < options.length) {
                    setHighlightedIndex(newValue)
                }
                break
            }

            case "Escape":
                setIsOpen(false)
                break
        }
    }

    function selectOption(option) {
        option.label !== value.label && onChange(option)
    }
    function isOptionSelected(option) {
        return option.label === value.label
    }
    return (
        <div onKeyDown={handleKeyboardNavigation}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prevState => !prevState)}
            tabIndex={0}
            className={className}>
            <div className="value">{value.label}</div>
            <button aria-expanded={isOpen} className="caret"><span className="sr-only">Toggle Select</span></button>
            <ul className="options" data-visible={isOpen}>
                {options.map((option, i) => (
                    <li onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }}
                        key={option.value}
                        className={`option ${i === highlightedIndex && 'highlighted'}`}
                        aria-selected={isOptionSelected(option)}>{option.label}</li>
                ))}
            </ul>
        </div>
    )
}