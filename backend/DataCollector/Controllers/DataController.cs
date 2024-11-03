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
                try
                {
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
                catch (Exception ex)
                {
                    return StatusCode(404, $"Internal server error: {ex.Message}");
                }
            }
            JsonObject data = new JsonObject
            {
                ["stories"] = stories,
                ["exercises"] = exercises
            };
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
        [HttpPost("participant")]
        public async Task<IActionResult> PostParticipant([FromBody] List<Submission> submissions)
        {
            if (submissions == null)
            {
                return BadRequest("Data cannot be null.");
            }
            try
            {
                // Create a new Participant object
                var participant = new Participant
                {
                    Id = _dataService.combinationIdx,
                    Submissions = submissions
                };

                // Read existing participants from the file
                var existingData = await System.IO.File.ReadAllTextAsync(filePath);
                var participants = string.IsNullOrWhiteSpace(existingData) 
                    ? new List<Participant>() 
                    : JsonSerializer.Deserialize<List<Participant>>(existingData);

                // Add the new participant to the list
                participants.Add(participant);

                // Serialize the updated list to JSON
                var jsonData = JsonSerializer.Serialize(participants, new JsonSerializerOptions { WriteIndented = true });

                // Save JSON data to the file
                await System.IO.File.WriteAllTextAsync(filePath, jsonData);
                _dataService.IncrementCombinationIdx();

                return Ok("Participant saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("answers")]
        public async Task<IActionResult> GetAnswers()
        {
            try
            {
                var data = await System.IO.File.ReadAllTextAsync(filePath);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("resetAnswers")]
        public async Task<IActionResult> ResetAnswers()
        {
            try
            {
                // Reset the content of the file to an empty list
                var emptyList = new List<Participant>();
                var jsonData = JsonSerializer.Serialize(emptyList, new JsonSerializerOptions { WriteIndented = true });

                // Save the empty JSON data to the file
                await System.IO.File.WriteAllTextAsync(filePath, jsonData);

                return Ok("Answers reset successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
