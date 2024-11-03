import React from "react";
import "../assets/css/reusable/LikertQuestion.css";

export default function LikertQuestion({ question, handleUserAnswer }) {
    const [selectedAnswer, setSelectedAnswer] = React.useState('');

    const handleSelection = (event) => {
        setSelectedAnswer(event.target.value);
        handleUserAnswer(event.target.value);
    };

    return (
        <div className="likert-question">
            <h3>{question}</h3>
            <div className="answers">
                <p>Strongly Disagree</p>
                {Array.from({ length: 7 }, (_, i) => i + 1).map((value) => (
                    <label key={value} className="likert-answer">
                        {value}
                        <input 
                            type="radio"
                            value={value}
                            checked={selectedAnswer === value.toString()}
                            onChange={handleSelection}
                        />
                    </label>
                ))}
                <p>Strongly Agree</p>
            </div>
        </div>
    );
}

