export const fetchData = async () => {
    return await {
        stories: ['Once upon a time...', 'Another story...'],
        exercises: [
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
        ],
        surveyQuestions: [
            'How much did you enjoy the task?',
            'How much did you learn from the task?',
            'How much did you like the story?',
            'How much did you like the exercises?'
        ]
    };
}