import json
import os

def convert_answers_nl2grades():
    data_path = '../website/backend/DataCollector/data'
    combinations = [
        ['bayes', 'gradient'],
        ['bayes', 'gradient'],
        ['bayes', 'gradient'],
        ['bayes', 'gradient'],
        ['gradient', 'bayes'],
        ['gradient', 'bayes'],
        ['gradient', 'bayes'],
        ['gradient', 'bayes'],
        ['gradient', 'bayes'],
        ['gradient', 'bayes'],
        ['gradient', 'bayes'],
        ['gradient', 'bayes'],
        ['bayes', 'gradient'],
        ['bayes', 'gradient'],
        ['bayes', 'gradient'],
        ['bayes', 'gradient']
    ]

    with open(os.path.join(data_path, 'answers.json'), 'r') as f:
        participant_answers = json.load(f)

    correct_answers = {}
    with open(os.path.join(data_path, 'bayes/exercise.json'), 'r') as f:
        bayes_questions = json.load(f)    
        correct_answers["bayes"] = [question['answer'] for question in bayes_questions]
        
    with open(os.path.join(data_path, 'gradient/exercise.json'), 'r') as f:
        gradient_questions = json.load(f)   
        correct_answers["gradient"] = [question['answer'] for question in gradient_questions]

    results_json = []

    for participant_answer in participant_answers:
        combination = combinations[participant_answer["Id"]]
        participant_results = []
        for task_idx in range(0, len(participant_answer["Submissions"])):
            corresponding_answers = correct_answers[combination[task_idx]]
            pre_results = 0
            for preanswers in participant_answer["Submissions"][task_idx]['ExerciseAnswers']['PreAnswers'].values():
                if preanswers in corresponding_answers:
                    pre_results += 1
            
            post_results = 0
            for postanswers in participant_answer["Submissions"][task_idx]['ExerciseAnswers']['PostAnswers'].values():
                if postanswers in corresponding_answers:
                    post_results += 1
                    
            participant_results.append([pre_results, post_results])
        results_json.append(participant_results)
        
    with open('exercise_results.json', 'w') as f:
        json.dump(results_json, f, indent=4)