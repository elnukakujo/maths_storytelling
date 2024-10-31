using System.Text.Json.Nodes;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace DataCollector.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly DataService _dataService;
        private readonly string filePath = Path.Combine(Directory.GetCurrentDirectory(), "data", "answers.json");

        public DataController(DataService dataService)
        {
            _dataService = dataService;
        }
        // GET: api/GetData
        [HttpGet("GetData")]
        public async Task<IActionResult> Get()
        {
            var combination = _dataService.Combinations[_dataService.combinationIdx];
            var combinationList = new List<(string concept, string writerType, string id)> { combination.Item1, combination.Item2 };

            var stories = new JsonArray();
            var exercises = new JsonArray();
            foreach (var task in combinationList)
            {
                var concept = task.concept;
                var writerType = task.writerType;
                var id = task.id;

                var storyPath = Path.Combine("data", concept, "stories", writerType, $"story{id}.txt");
                string story = (string)await _dataService.GetData(storyPath);
                stories.Add(story);

                var exercisePath = Path.Combine("data", concept, "exercise.json");
                string exerciseJson = (string)await _dataService.GetData(exercisePath);
                JsonArray? exercise = JsonNode.Parse(exerciseJson)?.AsArray();
                if (exercise != null)
                {
                    exercises.Add(exercise);
                }
            }
            JsonObject data = new JsonObject
            {
                ["stories"] = stories,
                ["exercises"] = exercises
            };
            _dataService.IncrementCombinationIdx();
            return Ok(data);
        }
        [HttpGet("SetIdx")]
        public IActionResult SetIdx([FromHeader] int idx)
        {
            _dataService.SetCombinationIdx(idx);
            return Ok(_dataService.combinationIdx);
        }
        [HttpGet("ResetIdx")]
        public IActionResult ResetIdx()
        {
            _dataService.ResetCombinationIdx();
            return Ok(_dataService.combinationIdx);
        }
        [HttpPost("answers")]
        public async Task<IActionResult> PostAnswers([FromBody] List<Submission> submissions)
        {
            if (submissions == null)
            {
                return BadRequest("Data cannot be null.");
            }
            try 
            {
                // Serialize the updated list to JSON
                var jsonData = JsonSerializer.Serialize(submissions, new JsonSerializerOptions { WriteIndented = true });

                // Save JSON data to the file
                await System.IO.File.WriteAllTextAsync(filePath, jsonData);

                return Ok("Submission saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
