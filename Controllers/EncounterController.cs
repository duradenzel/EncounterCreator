using Microsoft.AspNetCore.Mvc;

namespace EncounterCreator.Controllers
{
    public class EncounterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
