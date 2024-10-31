import React, {useState} from 'react';

import '../assets/css/reusable/MultiAnswerQuizz.css';

export default function MultiAnswerQuizz({question, answers, handleUserAnswer}) {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleSelection = (event) => {
        setSelectedAnswer(event.target.value);
        handleUserAnswer(event.target.value);
    }

    return(
        <div className="multi-answer-quizz">
            <h3>{question}</h3>
            <div className="answers">
                {answers.map((answer, index) => (
                    <label key={index}>
                        <input 
                            key={index} 
                            type = "radio"
                            value = {answer}
                            checked={selectedAnswer === answer}
                            onChange={handleSelection}
                        />
                        {answer}
                    </label>
                ))}
            </div>
        </div>
    );
}