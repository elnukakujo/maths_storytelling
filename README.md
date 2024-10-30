# LLM_maths_storytelling
Empirical Study on Teaching Math through Storytelling between LLMs and Humans on a student population

## Maths Concepts
- We are using Bayes Probability and Gradient Descent for this comparison. Each have stories from different sources, carrying the name of the LLM creators (0: ChatGPT, 1: Gemini or 2: Copilote) or anonymized humans.
- Additionally they also have an exercise.txt with questions to test the student understanding of the concepts after reading the story.
- Each concept have a folder of its own located in data/.

## TODOS
- [ ] Choose which story when multiple in one .txt
- [ ] Add likert scale and interview questions to constants.js
- [ ] Choose questions doable from the stories and adapt them in multiple choice quizzes
- [ ] Make backend, update fetchData.js to receive it, and post results to database
- [ ] Make css style
- [ ] Add the docsign consent after making it

## Execution
Keep in mind than both the backend and the frontend must be running for the app to work

### Frontend
In the terminal, go to frontend/study_collection-app and enter `npm start`

### Backend
In the terminal, go to backend/DataController and enter `dotnet run`