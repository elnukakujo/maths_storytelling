import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../Context.js';

import '../assets/css/pages/Task.css';

import MultiAnswerQuizz from '../reusable/MultiAnswerQuizz.js';

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
                <div className="go-next" onClick={handleGoNext}>
                    <span>Display the exercise</span>
                </div>
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
            <div className="go-next" onClick={submit}>
                <span>Submit your answers</span>
            </div>
        </div>
    );
}

export default function Task() {
    const [story, setStory] = useState('');
    const [exercise, setExercise] = useState([]);
    const [displayExercise, setDisplayExercise] = useState(true);
    const [displayStory, setDisplayStory] = useState(false);
    const [taskNumber, setTaskNumber] = useState(0); // Initialize as 0
    const navigate = useNavigate();
    const { stories, setStories, exercises, setExercises } = useGlobal();

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
    
            // Wait for the state updates to complete in the next event loop cycle
            setTimeout(resolve, 0);
        });
    };

    const handlePostSubmit = () => {
        setDisplayExercise(false);
        setDisplayStory(true);
    };

    const resetPage = () => {
        if (taskNumber >= stories.length - 1) {
            navigate('/interview');
            return;
        };
        setDisplayStory(false);
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
        // Only call chooseStoryAndExercise if the arrays are populated
        chooseStoryAndExercise();
    }, [stories, exercises, taskNumber]);

    return (
        <div>
            <h1>Task {taskNumber + 1}</h1>
            {displayExercise && !displayStory && (
                <Exercise exercise={exercise ? exercise : []} submit={handlePostSubmit} />
            )}
            {displayStory && (
                <Story story={story} displayExercise={() => setDisplayExercise(true)} />
            )}
            {displayExercise && displayStory && (
                <Exercise exercise={exercise} submit={resetPage} />
            )}
        </div>
    );
}