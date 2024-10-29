import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './assets/css/index.css';

import Home from './pages/Home.js';
import Consent from './pages/Consent.js';
import Task from './pages/Task.js';
import Interview from './pages/Interview.js';
import { ContextProvider } from './Context.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/consent" element={<Consent />}/>
                <Route path="/task" element={<Task />}/>
                <Route path="/interview" element={<Interview />}/>
            </Routes>
        </Router>
    </ContextProvider>
);