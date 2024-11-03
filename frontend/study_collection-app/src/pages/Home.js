import React from 'react';
import '../assets/css/pages/Home.css';
import RouteButton from '../reusable/RouteButton';
import udemLogo from './photos/UdeM-logo.png';






function Welcome() {
    return (
        <div className="start">
            <h1>Can stories teach maths to university students?</h1>
            <p>We are three University of Montreal students conducting a study on how stories can teach maths to a university population.</p>
        </div>
    );
}

function Introduction() {
    return (
        <div className="introduction">
            <h2>About this study</h2>
            <div className="objectives">
                <h3>Objectives</h3>
                <p>
                    The goal of this project is to explore how storytelling can enhance the learning and understanding of mathematical concepts. 
                    To achieve this, I will engage with university students like you, to gain insights from your experiences.
                </p>
            </div>
            <div className="participants-role">
                <h3>Your role</h3>
                <p>
                    You’ll be invited to read two short stories, each centered on a mathematical concept. 
                    Before and after each story, you’ll complete a brief exercise (5 minutes without support + 4 minutes to read the story 
                    + 5 minutes with the story). Following each exercise, you’ll answer a quick questionnaire (about 2 minutes). 
                    At the end of the session, we’ll have a short interview (2–5 minutes) to hear your thoughts and reflections on the experience.
                </p>
                <p>
                    With your consent, I may record the audio of the interview to ensure accurate recall of your feedback. 
                    Recordings will be anonymous, accessible only to the research team, and deleted after the study report is finalized. 
                    If you’d prefer not to be recorded, I will take notes instead.
                </p>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div>
            <div className="logo-container">
                <img src={udemLogo} alt="Université de Montréal Logo" className="udem-logo" />
            </div>
            <Welcome/>
            <Introduction/>
            <RouteButton path="/consent" text="Start" className="start-button"/>
        </div>
    );
}