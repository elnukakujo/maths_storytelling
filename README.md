# LLM_maths_storytelling
Empirical Study on Teaching Math through Storytelling between LLMs and Humans on a student population

## Maths Concepts
- We are using Bayes Probability and Gradient Descent for this comparison. Each have stories from different sources, carrying the name of the LLM creators (0: ChatGPT, 1: Gemini or 2: Copilote) or anonymized humans.
- Additionally they also have an exercise.txt with questions to test the student understanding of the concepts after reading the story.
- Each concept have a folder of its own located in data/.

## TODOS
- [ ] Read the LLMs better than NLP article to hide better true purpose of study
- [x] Use graeco latine square to better define randomization of stories
- [ ] Create docusign fo consent form
- [ ] Choose which story when multiple in one .txt
- [ ] Verify exercises
- [ ] Likert Scale survey
- [ ] Interview questions

## Poetry

### Poetry installation on local environment
See [https://python-poetry.org/docs/](https://python-poetry.org/docs/)

### Executing python files with Poetry
To run the program using the virtual environment of poetry:
1. Start by locating the paths to the venv `poetry env info --path`
2. Then if on Linux enter `source <path-here>/bin/activate`
3. You can then execute any python program easily by entering `python <program>.py`

### Installing dependances with Poetry
`poetry add <package>`
