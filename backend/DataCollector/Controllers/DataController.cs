using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;

namespace DataCollector.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly DataService _dataService;

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
    }
}
