using System.Web.Mvc;

namespace Demo.Controllers
{
    /// <summary>
    /// Controller for plugins demonstration.
    /// </summary>
    public class PluginsController : Controller
    {
        /// <summary>
        /// Displays the list of plugins.
        /// </summary>
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// Demonstration of using! plugin.
        /// </summary>
        /// <returns></returns>
        public ActionResult Using(bool? isDebug)
        {
            ViewBag.IsDebug = isDebug ?? true;

            return View();
        }
	}
}