import { useState, useEffect } from 'react';

// New MultipleChoiceForm component
export const MultipleChoiceForm = ({ onSubmit }) => {
    const [choices, setChoices] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        onSubmit({
            choices: choices.filter((choice) => choice.trim() !== ''),
            correctAnswer,
        });
    }, [choices, correctAnswer, onSubmit]);

    const handleAddChoice = () => {
        setChoices((prevChoices) => [...prevChoices, '']);
    };

    const handleRemoveChoice = (index) => {
        setChoices((prevChoices) => prevChoices.filter((_, i) => i !== index));
    };

    const handleChoiceChange = (index, value) => {
        setChoices((prevChoices) => {
            const newChoices = [...prevChoices];
            newChoices[index] = value;
            return newChoices;
        });
    };

    const handleCorrectAnswerChange = (index) => {
        setCorrectAnswer(choices[index]);
    };

    return (
        <>
            {choices.map((choice, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                    <div className="flex items-start gap-2">
                        <input
                            type="text"
                            placeholder={`Enter option ${index + 1}`}
                            value={choice}
                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                            className="w-[350px] bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveChoice(index)}
                            className="text-white bg-red-500 rounded-full px-2 py-1"
                        >
                            x
                        </button>
                        <label htmlFor={`correctAnswer${index}`} className="text-white bg-orange-500 rounded-full px-2 py-1">
                            <input
                                type="radio"
                                id={`correctAnswer${index}`}
                                name="correctAnswer"
                                checked={choice === correctAnswer}
                                onChange={() => handleCorrectAnswerChange(index)}
                                className='checked:bg-orange-400 checked:hover:bg-orange-400 checked:active:bg-orange-400 checked:focus:bg-orange-400'
                            />
                        </label>
                    </div>
                </div>
            ))}
            <span className="flex items-center">
                <button
                    type="button"
                    onClick={handleAddChoice}
                    className="text-white bg-orange-500 rounded-full px-4 py-2 mt-2"
                >
                    Add Choice
                </button>
            </span>
        </>
    );
};
