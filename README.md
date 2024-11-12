# LLM_maths_storytelling
Empirical Study on Teaching Math through Storytelling between LLMs and Humans on a Student Population

## Maths Concepts
- We are using Bayes Probability and Gradient Descent for this comparison. Each has stories from different sources, bearing the name of the LLM creators (0: ChatGPT, 1: LLama3.2-3B-Instruct) or anonymized humans.
- Additionally, they have an exercise.json with questions to test the students' understanding of the concepts after reading the story.
- Each concept has a folder of its own located in data/.

## TODOS
- [x] Add Likert scale and interview questions to constants.js
- [ ] Finish the study protocol and the rapport

## Execution
Keep in mind that both the backend and the frontend must be running for the app to work.
After finishing both tasks, the answers to the pre/post exercises and survey answers are saved in backend/DataCollector/data/answers.json .

### Frontend
In the terminal, go to frontend/study_collection-app and enter `npm start`

### Backend
In the terminal, go to backend/DataController and enter `dotnet run`

## Experiment
- If it is not the first participant, you need to run the backend, go to `http://127.0.0.1:5288/swagger/index.html` (Remember to change the port for your Dotnet app configuration), and set the combinationIdx by executing the SetIdx to define which combinations we are at.
- Also, keep in mind that every GetData call to the api (in the frontend, done right when exiting the Consent.js page) will add +1 to the combinationIdx.
- If the combinationIdx reaches the maximum length of Combinations list, the api will return an error.

## Current index: 11
