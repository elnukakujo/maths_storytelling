import pandas as pd
import json
import os
from convert_answers_nl2grades import *

combinations = [
    [["bayes", "Human", "0"], ["gradient", "LLM", "0"]],
    [["bayes", "Human", "0"], ["gradient", "LLM", "1"]],
    [["bayes", "Human", "1"], ["gradient", "LLM", "0"]],
    [["bayes", "Human", "1"], ["gradient", "LLM", "1"]],
    [["gradient", "Human", "0"], ["bayes", "LLM", "0"]],
    [["gradient", "Human", "0"], ["bayes", "LLM", "1"]],
    [["gradient", "Human", "1"], ["bayes", "LLM", "0"]],
    [["gradient", "Human", "1"], ["bayes", "LLM", "1"]],
    [["gradient", "LLM", "0"], ["bayes", "Human", "0"]],
    [["gradient", "LLM", "1"], ["bayes", "Human", "0"]],
    [["gradient", "LLM", "0"], ["bayes", "Human", "1"]],
    [["gradient", "LLM", "1"], ["bayes", "Human", "1"]],
    [["bayes", "LLM", "0"], ["gradient", "Human", "0"]],
    [["bayes", "LLM", "1"], ["gradient", "Human", "0"]],
    [["bayes", "LLM", "0"], ["gradient", "Human", "1"]],
    [["bayes", "LLM", "1"], ["gradient", "Human", "1"]]
]

if not os.path.exists('exercise_results.json'):
    convert_answers_nl2grades()

with open('exercise_results.json', 'r') as f:
    participant_results = json.load(f)
    
with open('../website/backend/DataCollector/data/answers.json', 'r') as f:
    answers_json = json.load(f)
    likert1_results = [participant["Submissions"][0]["SurveyAnswers"] for participant in answers_json]
    likert2_results = [participant["Submissions"][0]["SurveyAnswers"] for participant in answers_json]

data = pd.DataFrame()
data["Participant"] = [idx for idx in range(1, len(participant_results)+1)]
data["StoryScenario1"] = [combination[0][0] for combination in combinations]
data["StoryAuthor1"] = [combination[0][1] for combination in combinations]

data["PreResults1"] = [result[0][0] for result in participant_results]
data["PostResults1"] = [result[0][1] for result in participant_results]

for key in likert1_results[0].keys():
    data["Survey_"+ key + "1"] = [result[key] for result in likert1_results]

data["StoryScenario2"] = [combination[1][0] for combination in combinations]
data["StoryAuthor2"] = [combination[1][1] for combination in combinations]

data["PreResults2"] = [result[1][0] for result in participant_results]
data["PostResults2"] = [result[1][1] for result in participant_results]

for key in likert2_results[0].keys():
    data["Survey_"+ key.replace(' ', '_') + "2"] = [result[key] for result in likert2_results]

data.to_csv('data.csv', index=False)