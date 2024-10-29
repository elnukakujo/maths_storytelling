import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/css/pages/Task.css';

import MultiAnswerQuizz from '../reusable/MultiAnswerQuizz.js';
import GoNextButton from '../reusable/GoNextButton.js';
import LikertQuestion from '../reusable/LikertQuestion.js';

function Story({ story, displayExercise }) {
    const [button, setButton] = useState(true);
    const handleGoNext = () => {
        displayExercise();
        setButton(false);
    };
    return (
        <div className='story'>
            <h2>Story</h2>
            <p>{story}</p>
            {button && (
                <GoNextButton onClick={handleGoNext} text={"See the exercises"}/>
            )}
        </div>
    );
}

function Exercise({ exercise, submit }) {
    const [userAnswers, setUserAnswers] = useState({});
    const handleUserAnswers = (question, answer) => {
        if (userAnswers[question] === answer) return;
        setUserAnswers(prevAnswers => ({ ...prevAnswers, [question]: answer }));
    };

    return (
        <div className='exercises'>
            <h2>Exercise</h2>
            {exercise.map(({ question, answers }, index) => (
                <MultiAnswerQuizz key={index}
                    question={question}
                    answers={answers}
                    handleUserAnswer={(answer) => handleUserAnswers(question, answer)}
                />
            ))}
            <GoNextButton onClick={submit} text={"Submit your answers"}/>
        </div>
    );
}

function Survey({surveyQuestions, onClick}) {
    return (
        <div className='survey'>
            <h2>Survey</h2>
            {surveyQuestions.map((question, index) => (
                <LikertQuestion key={index} question={question} />
            ))}
            <GoNextButton onClick={onClick} text={"Finish Task"}/>
        </div>
    );
}

export default function Task() {
    const [stories, setStories] = useState([]);
    const [story, setStory] = useState('');
    const [exercises, setExercises] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [surveyQuestions, setSurveyQuestions] = useState([]);
    const [displayExercise, setDisplayExercise] = useState(true);
    const [displayStory, setDisplayStory] = useState(false);
    const [displaySurvey, setDisplaySurvey] = useState(false);
    const [taskNumber, setTaskNumber] = useState(0); // Initialize as 0
    const navigate = useNavigate();

    const fetchQuestionsExercises = () => {
        return new Promise((resolve) => {
            setStories(['Once upon a time...', 'Another story...']);
            setExercises([
                [
                    { question: 'What is the capital of France?', answers: ['Paris', 'London', 'Berlin', 'Madrid'] },
                    { question: 'What is the capital of Germany?', answers: ['Paris', 'London', 'Berlin', 'Madrid'] },
                    { question: 'What is the capital of Spain?', answers: ['Paris', 'London', 'Berlin', 'Madrid'] }
                ],
                [
                    { question: 'What is the capital of UK?', answers: ['Lisboa', 'London', 'Berlin', 'Varsovia'] },
                    { question: 'What is the capital of Poland?', answers: ['Lisboa', 'London', 'Berlin', 'Varsovia'] },
                    { question: 'What is the capital of Portugal?', answers: ['Lisboa', 'London', 'Berlin', 'Varsovia'] }
                ]
            ]);
            setSurveyQuestions([
                'How much did you enjoy the task?',
                'How much did you learn from the task?',
                'How much did you like the story?',
                'How much did you like the exercises?'
            ]);
    
            // Wait for the state updates to complete in the next event loop cycle
            setTimeout(resolve, 0);
        });
    };

    const handlePostSubmit = () => {
        setDisplayExercise(false);
        setDisplayStory(true);
    };
    const handlePastSubmit = () => {
        setDisplayExercise(false);
        setDisplayStory(false);
        setDisplaySurvey(true);
    };

    const resetPage = () => {
        if (taskNumber >= stories.length - 1) {
            navigate('/interview');
            return;
        };
        // Restart the cycle and increment the task number
        setDisplayStory(false);
        setDisplaySurvey(false);
        setDisplayExercise(true);
        setTaskNumber(taskNumber+1);
    };

    const chooseStoryAndExercise = () => {
        // Ensure the task number is valid before setting state
        setStory(stories[taskNumber]);
        setExercise(exercises[taskNumber]);
    };

    useEffect(() => {
        fetchQuestionsExercises(); // Wait for stories and exercises to be set
    }, []);

    useEffect(() => {
        // Only call chooseStoryAndExercise if the stories and exercises have been set or when the task number changes
        chooseStoryAndExercise();
    }, [stories, exercises, taskNumber]);

    return (
        <div>
            <h1>Task {taskNumber + 1}</h1>
            {displayExercise && !displayStory && ( // Pre test without the story
                <Exercise exercise={exercise ? exercise : []} submit={handlePostSubmit}/>
            )}
            {displayStory && (
                <Story story={story} displayExercise={() => setDisplayExercise(true)} />
            )}
            {displayExercise && displayStory && ( //Post test with the story
                <Exercise exercise={exercise} submit={handlePastSubmit}/>
            )}
            {displaySurvey && (
                <Survey surveyQuestions={surveyQuestions} onClick={resetPage} />  
            )}
        </div>
    );
}