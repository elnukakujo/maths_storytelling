import random

def grecoLatinSquare():
    combinations = [[0,0], [0,1], [1,0], [1,1]]
    concept= ["bayes", "gradient"]
    typeStory = ["LLM", "Human"]
    
    combination = random.choice(combinations)
    firstTask = [concept[combination[0]], typeStory[combination[1]]]
    secondTask = [concept[not combination[0]], typeStory[not combination[1]]]
    return (firstTask, secondTask)

def getStory(concept, storyType):
    storyId = random.randint(0,2)
    with (open(f"data/{concept}/stories/{storyType}/story{storyId}.txt", "r")) as f:
        return f.readlines()

def main():
    task1, task2 = grecoLatinSquare()
    return (getStory(task1[0], task1[1]), getStory(task2[0], task2[1]))

print(main())