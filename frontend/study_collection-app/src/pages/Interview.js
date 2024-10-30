import React, { useState } from "react";

import "../assets/css/pages/Interview.css";
import { interviewQuestions } from "../constants";

import GoNextButton from "../reusable/GoNextButton.js";

function Intro({ setIsIntro }) {
    return (
        <div className="intro">
            <p>
                Thanks a lot for taking the time to read the stories and answer those questions. We appreciate a lot your efforts.
            </p>
            <p>
                We will now have a short interview of 3 to 5 minutes to get a better understanding of your experience with the stories.
            </p>
            <GoNextButton onClick={() => setIsIntro(false)} text={"Start the questions"}/>
        </div>
    );
}

function Questions(){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    return (
        <div className="interview-question">
            <p>{interviewQuestions[currentQuestionIndex]}</p>
            {currentQuestionIndex !== 0 && (
                <GoNextButton 
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} 
                    text={"Previous question"}
                />
            )}
            {currentQuestionIndex < interviewQuestions.length - 1 && (
                <GoNextButton 
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} 
                    text={"Next question"}
                />
            )}
        </div>
    );
}

export default function Interview() {
    const [isIntro, setIsIntro] = React.useState(true);
    return (
        <div className="interview">
            <h1>Interview</h1>
            {isIntro ? <Intro setIsIntro={setIsIntro} /> : <Questions />}
        </div>
    );
}