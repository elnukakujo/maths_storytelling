using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json.Nodes;

namespace DataCollector
{
    public class DataService
    {
        public readonly List<((string concept, string writerType, string Id),(string concept, string writerType, string Id))> Combinations = new List<((string concept, string writerType, string Id),(string concept, string writerType, string Id))>
        {
            (("gradient", "LLM", "1"), ("bayes", "Human", "0")),
            (("gradient", "Human", "1"), ("bayes", "LLM", "0")),
            (("bayes", "LLM", "0"), ("gradient", "Human", "0")),
            (("gradient", "Human", "2"), ("bayes", "LLM", "1")),
            (("bayes", "Human", "0"), ("gradient", "LLM", "0")),
            (("bayes", "LLM", "2"), ("gradient", "Human", "2")),
            (("bayes", "Human", "2"), ("gradient", "LLM", "1")),
            (("gradient", "Human", "0"), ("bayes", "LLM", "0")),
            (("bayes", "LLM", "0"), ("gradient", "Human", "1")),
            (("gradient", "LLM", "0"), ("bayes", "Human", "1")),
            (("gradient", "LLM", "1"), ("bayes", "Human", "1")),
            (("bayes", "Human", "2"), ("gradient", "LLM", "2")),
            (("bayes", "Human", "1"), ("gradient", "LLM", "1")),
            (("gradient", "LLM", "2"), ("bayes", "Human", "1")),
            (("bayes", "Human", "1"), ("gradient", "LLM", "2")),
            (("gradient", "Human", "0"), ("bayes", "LLM", "2")),
            (("bayes", "LLM", "2"), ("gradient", "Human", "0")),
            (("gradient", "LLM", "2"), ("bayes", "Human", "0")),
            (("gradient", "Human", "0"), ("bayes", "LLM", "1")),
            (("bayes", "LLM", "1"), ("gradient", "Human", "2")),
            (("gradient", "Human", "1"), ("bayes", "LLM", "1")),
            (("bayes", "LLM", "1"), ("gradient", "Human", "0")),
            (("gradient", "Human", "1"), ("bayes", "LLM", "2")),
            (("bayes", "Human", "0"), ("gradient", "LLM", "2")),
            (("bayes", "LLM", "2"), ("gradient", "Human", "1")),
            (("bayes", "LLM", "0"), ("gradient", "Human", "2")),
            (("bayes", "Human", "1"), ("gradient", "LLM", "0")),
            (("bayes", "Human", "0"), ("gradient", "LLM", "1")),
            (("gradient", "LLM", "0"), ("bayes", "Human", "2")),
            (("gradient", "Human", "1"), ("bayes", "LLM", "2")),
            (("gradient", "LLM", "0"), ("bayes", "Human", "0")),
            (("bayes", "LLM", "1"), ("gradient", "Human", "2")),
            (("gradient", "LLM", "2"), ("bayes", "Human", "2")),
            (("gradient", "Human", "2"), ("bayes", "LLM", "0")),
            (("bayes", "LLM", "2"), ("gradient", "Human", "0")),
            (("bayes", "LLM", "0"), ("gradient", "Human", "2")),
            (("bayes", "Human", "2"), ("gradient", "LLM", "0"))
        };
        public int combinationIdx = 0;

        public void IncrementCombinationIdx() => combinationIdx++;
        public void SetCombinationIdx(int idx) => combinationIdx = idx;
        public void ResetCombinationIdx() => combinationIdx = 0;
        public async Task<object> GetData(string path)
        {
            // Check if the story file exists
            if (!System.IO.File.Exists(path))
            {
                throw new Exception($"Path does not exist: {path}");
            }
            var content = await System.IO.File.ReadAllTextAsync(path);
            return content;
        }
        
    }
}