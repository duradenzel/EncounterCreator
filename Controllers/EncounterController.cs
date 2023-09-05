using EncounterCreator.ViewModels;
using EncounterInterfaces;
using EncounterModels;
using Microsoft.AspNetCore.Mvc;

namespace EncounterCreator.Controllers
{
    public class EncounterController : Controller
    {
        private readonly IEncounterService _encounterService;

        public EncounterController(IEncounterService encounterService)
        {
            _encounterService = encounterService;
        }

        public IActionResult Index() { return View("GenerateEncounter"); }

        [HttpPost]
        public async Task<IActionResult> GenerateEncounter(int partySize, int playerLevel, string difficulty = "easy")
        {                 
            var encounter = await _encounterService.GenerateEncounter(partySize, playerLevel, difficulty);
            
            return View("GenerateEncounter",encounter);

        }
    }
}
