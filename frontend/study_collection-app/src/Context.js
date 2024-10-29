import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const Context = createContext();

// Custom hook to use the LoadingContext
export const useGlobal = () => {
    return useContext(Context);
};

// Provider component
export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [stories, setStories] = useState([]);
    const [exercises, setExercises] = useState([]);
    // Reset all states
    const resetState = () => {
        setIsLoading(false);
        setStories([]);
        setExercises([]);
    };

    return (
        <Context.Provider value={{ isLoading, setIsLoading, stories, setStories, exercises, setExercises, resetState }}>
            {children}
        </Context.Provider>
    );
};